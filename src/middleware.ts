// C:\Users\user\Documents\saas\src\middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// --- Configuration Constants ---
const NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT = process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || 'mysuper-saas.com';
let SERVER_ROOT_DOMAIN: string;

if (process.env.APP_ENV === 'production' || process.env.NODE_ENV === 'production') {
    SERVER_ROOT_DOMAIN = NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT;
} else {
    SERVER_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
}

const PUBLIC_FILE_EXTENSIONS = /\.(.*)$/;
const PUBLIC_PATHS = ['/about-us', '/pricing', '/terms', '/privacy', '/favicon.ico', '/robots.txt', '/sitemap.xml'];
const TENANT_SELECTION_PATH = '/select-tenant';
const AUTH_API_PREFIX = '/api/auth';
const LOGIN_PATH = '/login';

const VALID_TENANT_SUBDOMAINS = ['client', 'supplier', 'customer'];

const RESERVED_SUBDOMAINS = [
    'www', 'app', 'api', 'mail', 'blog', 'dev', 'status', 'docs', 'assets',
    'static', 'internal', '_next', 'admin', 'support', 'billing', 'shop', 'test' // Added 'test' just in case
];

// --- Helper Functions ---
const getHostnameWithoutPort = (hostHeaderOrDomain: string): string => {
  try {
    const fullUrl = hostHeaderOrDomain.startsWith('http') ? hostHeaderOrDomain : `http://${hostHeaderOrDomain}`;
    const url = new URL(fullUrl);
    return url.hostname.toLowerCase();
  } catch (e) {
    return hostHeaderOrDomain.split(':')[0].toLowerCase();
  }
};

// --- Middleware Configuration ---
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|images/|icons/|assets/).*)',
  ],
};

// --- Middleware Logic ---
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const originalPathname = request.nextUrl.pathname; // Use this for checks against original request
  const hostHeader = request.headers.get('host') || SERVER_ROOT_DOMAIN;

  console.log(`\n--- [MW RUN] Request: ${request.method} ${hostHeader}${originalPathname} ---`);

  if (
    originalPathname.startsWith('/_next/') ||
    PUBLIC_FILE_EXTENSIONS.test(originalPathname) ||
    PUBLIC_PATHS.includes(originalPathname)
  ) {
    console.log(`[MW BYPASS - STATIC/PUBLIC] Path: "${originalPathname}"`);
    return NextResponse.next();
  }

  const currentHostname = getHostnameWithoutPort(hostHeader);
  const serverRootHostname = getHostnameWithoutPort(SERVER_ROOT_DOMAIN);
  let identifiedSubdomain: string | null = null;
  let isRootAccess = false;

  console.log(`[MW PARSE] currentHostname: "${currentHostname}", serverRootHostname: "${serverRootHostname}"`);

  if (currentHostname === serverRootHostname || currentHostname === `www.${serverRootHostname}`) {
    isRootAccess = true;
    console.log(`[MW DETECT] Root domain access on: "${currentHostname}"`);
  } else if (currentHostname.endsWith(`.${serverRootHostname}`)) {
    const potentialSubdomain = currentHostname.substring(0, currentHostname.length - serverRootHostname.length - 1);
    if (potentialSubdomain && !RESERVED_SUBDOMAINS.includes(potentialSubdomain.toLowerCase())) {
      identifiedSubdomain = potentialSubdomain.toLowerCase();
      console.log(`[MW DETECT] Identified subdomain: "${identifiedSubdomain}"`);
    } else {
      isRootAccess = true;
      console.log(`[MW DETECT] Reserved or empty subdomain, treating as root: "${currentHostname}"`);
    }
  } else {
    console.warn(`[MW UNRECOGNIZED HOST] Host: "${currentHostname}". Redirecting to selection page on root domain.`);
    return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'unrecognized_host_format', currentHostname);
  }

  const responseHeaders = new Headers(request.headers);

  if (identifiedSubdomain) {
    console.log(`[MW SUBDOMAIN] Access for subdomain: "${identifiedSubdomain}", Original Path: "${originalPathname}"`);
    responseHeaders.set('x-tenant-id', identifiedSubdomain);

    if (VALID_TENANT_SUBDOMAINS.includes(identifiedSubdomain)) {
      console.log(`[MW SUBDOMAIN] Valid tenant subdomain. x-tenant-id: "${identifiedSubdomain}" set.`);

      if (originalPathname.startsWith('/api/')) {
        console.log(`[MW SUBDOMAIN] API route "${originalPathname}". Passing through with tenant header (no rewrite).`);
        return NextResponse.next({ request: { headers: responseHeaders } });
      }

            // --- FIXED PATH HANDLING ---
      const tenantBasePath = `/${identifiedSubdomain}`; // e.g., /supplier
      let newInternalPath: string;

      if (originalPathname.startsWith(tenantBasePath)) {
        // Path already includes the subdomain prefix (e.g., /supplier/login was directly requested)
        newInternalPath = originalPathname;
        console.log(`[MW SUBDOMAIN] Path "${originalPathname}" already tenant-prefixed. Using as internal path: "${newInternalPath}"`);
      } else {
        // Path does not include subdomain prefix (e.g., /dashboard was requested on supplier.domain.com), so prepend it
        newInternalPath = `${tenantBasePath}${originalPathname === '/' ? '' : originalPathname}`;
        console.log(`[MW SUBDOMAIN] Path "${originalPathname}" not tenant-prefixed. Prepending to: "${newInternalPath}"`);
      }
      
      // Update the cloned URL with the correctly determined internal path
      url.pathname = newInternalPath;

      // If the original request (from the browser) was for the root of the subdomain (e.g., supplier.localhost:3000/),
      // then redirect the BROWSER to the tenant-specific login page.
      if (originalPathname === '/') {
        const tenantLoginPath = `${tenantBasePath}${LOGIN_PATH}`; // e.g., /supplier/login
        url.pathname = tenantLoginPath; // Ensure the redirect URL target is correct
        console.log(`[MW SUBDOMAIN] Original path was root ("/"). Redirecting BROWSER to tenant login: "${url.pathname}"`);
        return NextResponse.redirect(url, { headers: responseHeaders });
      }

      // For all other page requests on this valid tenant subdomain (e.g., /supplier/login after redirect, or /supplier/dashboard),
      // rewrite the path internally. The browser URL does not change.
      // Next.js will serve content from /app/<subdomain_directory>/<path_segment>
      console.log(`[MW SUBDOMAIN] Rewriting for original path "${originalPathname}" to internal path: "${url.pathname}"`);
      return NextResponse.rewrite(url, { headers: responseHeaders });
      // --- END FIXED PATH HANDLING ---

    } else {
      console.warn(`[MW SUBDOMAIN] Unknown or invalid tenant subdomain: "${identifiedSubdomain}". Redirecting to selection.`);
      return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'unknown_tenant_subdomain', identifiedSubdomain);
    }
  } else if (isRootAccess) {
    console.log(`[MW ROOT] Root domain access. Path: "${originalPathname}"`);
    responseHeaders.delete('x-tenant-id');

    if (originalPathname.startsWith('/api/')) { // Keep AUTH_API_PREFIX if you want it more specific
        console.log(`[MW ROOT] API route "${originalPathname}" on root. Passing through.`);
        return NextResponse.next({ request: { headers: responseHeaders } });
    }

    if (originalPathname === TENANT_SELECTION_PATH || originalPathname === LOGIN_PATH) {
        console.log(`[MW ROOT] Allowing access to "${originalPathname}" on root domain.`);
        return NextResponse.next({ request: { headers: responseHeaders } });
    }
    console.log(`[MW ROOT] Path "${originalPathname}" requires tenant selection. Redirecting.`);
    return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'root_needs_selection', originalPathname);
  }

  console.warn(`[MW FALLBACK] Unhandled routing case. Host: "${currentHostname}", Path: "${originalPathname}". Redirecting to selection.`);
  return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'middleware_unhandled_case', currentHostname);
}

function redirectToSelectionPage(
    request: NextRequest,
    rootDomainForRedirect: string,
    errorReason: string,
    attemptedValue?: string
): NextResponse {
  const selectionUrl = new URL(request.nextUrl.origin);
  selectionUrl.hostname = getHostnameWithoutPort(rootDomainForRedirect);

  const rootDomainParts = rootDomainForRedirect.split(':');
  if (rootDomainParts.length > 1 && rootDomainParts[1]) {
    selectionUrl.port = rootDomainParts[1];
  } else {
    selectionUrl.port = '';
  }

  selectionUrl.pathname = TENANT_SELECTION_PATH;
  selectionUrl.searchParams.set('error', errorReason);
  if (attemptedValue) {
    selectionUrl.searchParams.set('attempted', attemptedValue);
  }
  const fromParam = request.nextUrl.searchParams.get('from');
  if (fromParam && errorReason !== 'root_needs_selection') {
      selectionUrl.searchParams.set('from', fromParam);
  }

  console.log(`[MW REDIRECT HELPER] Redirecting to: "${selectionUrl.href}" (Reason: ${errorReason})`);
  return NextResponse.redirect(selectionUrl);
}