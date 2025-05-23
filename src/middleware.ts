// C:\Users\user\Documents\saas\middleware.ts (or src\middleware.ts)
import { NextRequest, NextResponse } from 'next/server';

// --- (Keep ENV CONFIG, SETTINGS constants, HELPERS as before) ---
const NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT = process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || 'mysuper-saas.com';
let SERVER_ROOT_DOMAIN: string;
if (process.env.APP_ENV === 'production' || process.env.NODE_ENV === 'production') {
    SERVER_ROOT_DOMAIN = NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT;
} else {
    SERVER_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
}
const PUBLIC_FILE_EXTENSIONS = /\.(.*)$/;
const PUBLIC_PATHS = ['/about-us', '/pricing', '/terms', '/privacy', '/favicon.ico'];
const TENANT_SELECTION_PATH = '/select-tenant';
const AUTH_API_PREFIX = '/api/auth';
const LOGIN_PATH = '/login';
const VALID_TENANT_SUBDOMAINS = ['client', 'supplier', 'customer'];
const RESERVED_SUBDOMAINS = ['www', 'app', 'api', 'mail', 'blog', 'dev', 'status', 'docs', 'assets', 'static', 'internal', '_next'];
const getHostnameWithoutPort = (hostHeaderOrDomain: string) => {
  try {
    const url = new URL(hostHeaderOrDomain.startsWith('http') ? hostHeaderOrDomain : `http://${hostHeaderOrDomain}`);
    return url.hostname.toLowerCase();
  } catch (e) {
    return hostHeaderOrDomain.split(':')[0].toLowerCase();
  }
};
// --- END OF PREAMBLE ---

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|.*\\..*).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const hostHeader = request.headers.get('host') || SERVER_ROOT_DOMAIN;

  console.log(`\n--- [MW RUN] Request: ${request.method} ${hostHeader}${pathname} ---`);

  // 1. Early bypass for truly public static assets and Next.js internals
  //    These should never have tenant context.
  if (
    pathname.startsWith('/_next/') ||
    PUBLIC_FILE_EXTENSIONS.test(pathname) || // All files with extensions
    PUBLIC_PATHS.includes(pathname)          // Explicitly defined public HTML pages
  ) {
    console.log(`[MW BYPASS - STATIC/PUBLIC] Path: ${pathname}`);
    return NextResponse.next();
  }

  // 2. Host parsing and subdomain identification
  const currentHostname = getHostnameWithoutPort(hostHeader);
  const serverRootHostname = getHostnameWithoutPort(SERVER_ROOT_DOMAIN);
  let identifiedSubdomain: string | null = null;
  let isRootAccess = false;

  console.log(`[MW PARSE] currentHostname: ${currentHostname}, serverRootHostname: ${serverRootHostname}`);

  if (currentHostname === serverRootHostname || currentHostname === `www.${serverRootHostname}`) {
    isRootAccess = true;
    console.log(`[MW DETECT] Root access on: ${currentHostname}`);
  } else if (currentHostname.endsWith(`.${serverRootHostname}`)) {
    const potentialSubdomain = currentHostname.substring(0, currentHostname.length - serverRootHostname.length - 1);
    if (potentialSubdomain && !RESERVED_SUBDOMAINS.includes(potentialSubdomain)) {
      identifiedSubdomain = potentialSubdomain;
      console.log(`[MW DETECT] Identified subdomain: ${identifiedSubdomain}`);
    } else {
      isRootAccess = true;
      console.log(`[MW DETECT] Reserved subdomain or www, treating as root: ${currentHostname}`);
    }
  } else {
    console.warn(`[MW UNRECOGNIZED HOST] Host: ${currentHostname}. Redirecting to selection.`);
    return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'unrecognized_host', currentHostname);
  }

  // 3. Routing Logic
  if (identifiedSubdomain) {
    // --- SUBDOMAIN ACCESS ---
    console.log(`[MW SUBDOMAIN] Subdomain: "${identifiedSubdomain}", Path: "${pathname}"`);
    if (VALID_TENANT_SUBDOMAINS.includes(identifiedSubdomain)) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-tenant-id', identifiedSubdomain);
      console.log(`[MW SUBDOMAIN] Valid tenant. Set x-tenant-id: "${identifiedSubdomain}"`);

      // If it's an auth API call on a subdomain, let it pass with the header.
      if (pathname.startsWith(AUTH_API_PREFIX)) {
        console.log(`[MW SUBDOMAIN] Allowing AUTH API path "${pathname}" with header.`);
        return NextResponse.next({ request: { headers: requestHeaders } });
      }

      // For pages on the subdomain:
      if (pathname === '/') { // Root of subdomain
        const loginUrl = new URL(LOGIN_PATH, url);
        console.log(`[MW SUBDOMAIN] Root of subdomain. Redirecting to login: ${loginUrl.href}`);
        return NextResponse.redirect(loginUrl, { headers: requestHeaders });
      }

      // Allow other page requests on this subdomain to proceed with the header
      console.log(`[MW SUBDOMAIN] Allowing page path "${pathname}" with header.`);
      return NextResponse.next({ request: { headers: requestHeaders } });
    } else {
      // Invalid tenant subdomain
      console.warn(`[MW SUBDOMAIN] Unknown tenant subdomain: "${identifiedSubdomain}". Redirecting to selection.`);
      return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'unknown_tenant', identifiedSubdomain);
    }
  } else if (isRootAccess) {
    // --- ROOT DOMAIN ACCESS ---
    console.log(`[MW ROOT] Root domain access. Path: "${pathname}"`);

    // Allow AUTH API calls on the root domain if needed (e.g., for a global "forgot password" or super-admin)
    // If all auth actions MUST be tenant-specific, you might remove this or make it more specific.
    if (pathname.startsWith(AUTH_API_PREFIX)) {
        console.log(`[MW ROOT] Allowing AUTH API path "${pathname}" on root domain (no tenant header).`);
        return NextResponse.next(); // No tenant header for root domain API calls
    }

    // For any other path on the root domain that isn't the tenant selection page, redirect.
    if (pathname !== TENANT_SELECTION_PATH) {
        console.log(`[MW ROOT] Path "${pathname}" is not select-tenant. Redirecting to select-tenant.`);
        return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'root_access_needs_selection', pathname);
    }

    // Allow access to the tenant selection page itself on the root domain
    console.log(`[MW ROOT] Allowing path "${TENANT_SELECTION_PATH}" on root domain.`);
    return NextResponse.next();
  }

  // Fallback (should ideally not be reached)
  console.warn(`[MW FALLBACK] Unhandled case. Host: "${currentHostname}", Path: "${pathname}". Redirecting to selection.`);
  return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'middleware_unhandled', currentHostname);
}

// --- REDIRECT HELPER to TENANT_SELECTION_PATH on ROOT_DOMAIN ---
// (redirectToSelectionPage function remains the same as the last version)
function redirectToSelectionPage(
    request: NextRequest,
    serverRootDomainForRedirect: string,
    errorReason: string,
    attemptedValue?: string
) {
  const selectionUrl = new URL(request.nextUrl.origin);
  selectionUrl.hostname = getHostnameWithoutPort(serverRootDomainForRedirect);
  const rootDomainPort = serverRootDomainForRedirect.split(':')[1];
  if (rootDomainPort) selectionUrl.port = rootDomainPort; else selectionUrl.port = '';
  selectionUrl.pathname = TENANT_SELECTION_PATH;
  selectionUrl.searchParams.set('error', errorReason);
  if (attemptedValue) selectionUrl.searchParams.set('attempted', attemptedValue);
  const fromParam = request.nextUrl.searchParams.get('from');
  if (fromParam && errorReason !== 'root_access_needs_selection') {
      selectionUrl.searchParams.set('from', fromParam);
  }
  console.log(`[MW REDIRECT HELPER] Redirecting to: ${selectionUrl.href} (Reason: ${errorReason})`);
  return NextResponse.redirect(selectionUrl);
}