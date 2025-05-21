// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// --- Configuration ---
// Use SERVER_ prefixed env var for clarity if you also have NEXT_PUBLIC_ ones for client
const SERVER_PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || 'saaspro.com'; // Fallback, ensure set in Vercel
const DEV_ROOT_DOMAIN = 'localhost:3000';

// For now, these are hardcoded. Long-term, consider validating against DB if feasible from middleware,
// or let pages do the ultimate validation.
const KNOWN_TENANT_SUBDOMAINS: string[] = ['client', 'supplier', 'customer'];
const RESERVED_SUBDOMAINS: string[] = ['www', 'app', 'api', 'mail', 'blog', 'dev', 'status', 'docs', 'assets', 'static']; // Added common asset paths
const PUBLIC_PATHS: string[] = ['/about-us', '/pricing', '/terms', '/privacy']; // Add other public static pages
const TENANT_SELECTION_PATH = '/select-tenant';
const AUTH_API_PATH_PREFIX = '/api/auth'; // For NextAuth.js or similar

// Determine the effective root domain based on the environment
function getEffectiveRootDomain(): string {
    return process.env.NODE_ENV === 'production' ? SERVER_PRODUCTION_DOMAIN : DEV_ROOT_DOMAIN;
}

const EFFECTIVE_ROOT_DOMAIN = getEffectiveRootDomain();
// This initial log runs once per middleware instance/worker initialization
console.log(`[MW_INIT] Middleware Initialized. NODE_ENV: ${process.env.NODE_ENV}, Effective Root Domain: ${EFFECTIVE_ROOT_DOMAIN}`);

export async function middleware(request: NextRequest) {
    const { pathname, search, origin } = request.nextUrl; // origin includes protocol and host
    const host = request.headers.get('host'); // e.g., "client.localhost:3000", "saas-sandy-one.vercel.app"

    // Initial log for every request handled by the middleware
    console.log(`\n--- [MW_START ${new Date().toISOString()}] Host: ${host}, Path: ${pathname}${search} ---`);

    // 1. Bypass for Next.js internals, common static assets, and auth API calls
    // This helps performance and avoids unnecessary processing.
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') || // If you have a /static folder
        pathname.startsWith('/assets/') || // Common assets folder
        pathname.startsWith('/images/') || // Common images folder
        pathname.startsWith(AUTH_API_PATH_PREFIX) ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|js|css|webmanifest|txt|xml)$/i) // More robust file extension check
    ) {
        console.log(`[MW_BYPASS_ASSET] Path (${pathname}) is internal, asset, or auth API. Passing through.`);
        return NextResponse.next();
    }

    // 2. Handle requests to defined public paths directly
    if (PUBLIC_PATHS.includes(pathname)) {
        console.log(`[MW_BYPASS_PUBLIC] Path (${pathname}) is a public path. Passing through.`);
        return NextResponse.next();
    }

    // 3. Handle the tenant selection page itself to prevent redirect loops
    if (pathname === TENANT_SELECTION_PATH) {
        console.log(`[MW_BYPASS_SELECT_TENANT] Path (${pathname}) is the tenant selection page. Passing through.`);
        return NextResponse.next();
    }

    // --- Host and Subdomain Logic ---
    if (!host) {
        console.error('[MW_ERROR] No host header found. This is highly unusual for HTTP/1.1+ requests.');
        // Redirect to a generic error or tenant selection. Using request.nextUrl.clone() preserves current protocol/host.
        const errorRedirectUrl = request.nextUrl.clone();
        errorRedirectUrl.pathname = TENANT_SELECTION_PATH;
        errorRedirectUrl.searchParams.set('error', 'missing_host');
        console.log(`[MW_REDIRECT] Missing host. Redirecting to: ${errorRedirectUrl.toString()}`);
        return NextResponse.redirect(errorRedirectUrl);
    }

    // Prepare the root domain for comparison (remove port for production if present, keep for dev)
    const rootDomainForComparison = EFFECTIVE_ROOT_DOMAIN.includes(':') // True for localhost:3000
        ? EFFECTIVE_ROOT_DOMAIN
        : EFFECTIVE_ROOT_DOMAIN.split(':')[0]; // Removes port if any, e.g. for "saaspro.com:443" (unlikely)

    let tenantSubdomain: string | null = null;
    let isEffectiveRootDomainAccess = false;

    // Check if the request is for the effective root domain (or www version of it)
    if (host === rootDomainForComparison || host === `www.${rootDomainForComparison.split(':')[0]}`) {
        console.log(`[MW_HOST_TYPE] Detected EFFECTIVE ROOT domain request: ${host}`);
        isEffectiveRootDomainAccess = true;
    }
    // Check if it's a subdomain of the effective root domain
    else if (host.endsWith(`.${rootDomainForComparison.split(':')[0]}`)) { // Compare against root domain without port
        const potentialSubdomain = host.substring(0, host.indexOf('.')); // Get part before first dot
        console.log(`[MW_HOST_TYPE] Detected SUBDOMAIN of effective root. Potential: ${potentialSubdomain}`);
        if (!RESERVED_SUBDOMAINS.includes(potentialSubdomain.toLowerCase())) {
            tenantSubdomain = potentialSubdomain;
            console.log(`[MW_SUBDOMAIN_PARSE] Parsed tenantSubdomain: ${tenantSubdomain}`);
        } else {
            console.log(`[MW_BYPASS_RESERVED_SUBDOMAIN] Subdomain (${potentialSubdomain}) is reserved. Treating as root access.`);
            // For reserved subdomains (like 'www' or 'api' if not handled earlier), redirect to tenant selection or main marketing page.
            isEffectiveRootDomainAccess = true; // Treat as root access for redirection logic below
        }
    }
    // Check if it's a subdomain of localhost (for dev, where EFFECTIVE_ROOT_DOMAIN is localhost:3000)
    else if (process.env.NODE_ENV !== 'production' && host.endsWith('.localhost:3000')) {
        const potentialSubdomain = host.substring(0, host.indexOf('.localhost:3000'));
        console.log(`[MW_HOST_TYPE] Detected DEV SUBDOMAIN of localhost. Potential: ${potentialSubdomain}`);
        if (!RESERVED_SUBDOMAINS.includes(potentialSubdomain.toLowerCase())) {
            tenantSubdomain = potentialSubdomain;
            console.log(`[MW_SUBDOMAIN_PARSE] Parsed DEV tenantSubdomain: ${tenantSubdomain}`);
        } else {
             console.log(`[MW_BYPASS_RESERVED_SUBDOMAIN] Dev subdomain (${potentialSubdomain}) is reserved. Treating as root localhost access.`);
             isEffectiveRootDomainAccess = true;
        }
    }
    else {
        console.warn(`[MW_WARN] Unrecognized host format: ${host}. Expected subdomain of '${rootDomainForComparison.split(':')[0]}' or matching '${EFFECTIVE_ROOT_DOMAIN}'.`);
        const unrecognizedHostRedirectUrl = request.nextUrl.clone();
        unrecognizedHostRedirectUrl.pathname = TENANT_SELECTION_PATH;
        unrecognizedHostRedirectUrl.searchParams.set('error', 'unrecognized_host');
        console.log(`[MW_REDIRECT] Unrecognized host. Redirecting to: ${unrecognizedHostRedirectUrl.toString()}`);
        return NextResponse.redirect(unrecognizedHostRedirectUrl);
    }

    // --- Action based on parsed host ---
    const requestHeaders = new Headers(request.headers); // Clone headers to modify

    if (tenantSubdomain) {
        console.log(`[MW_TENANT_CHECK] Checking tenantSubdomain: '${tenantSubdomain}' against KNOWN: [${KNOWN_TENANT_SUBDOMAINS.join(', ')}]`);
        if (KNOWN_TENANT_SUBDOMAINS.includes(tenantSubdomain.toLowerCase())) {
            requestHeaders.set('x-tenant-id', tenantSubdomain);
            console.log(`[MW_ACTION_ALLOW] Valid tenant '${tenantSubdomain}' identified. Setting 'x-tenant-id'. Allowing request to '${pathname}'.`);
            return NextResponse.next({ request: { headers: requestHeaders } });
        } else {
            console.log(`[MW_ACTION_UNKNOWN_TENANT] Unknown tenant subdomain '${tenantSubdomain}'.`);
            const unknownTenantRedirectUrl = request.nextUrl.clone();
            unknownTenantRedirectUrl.pathname = TENANT_SELECTION_PATH;
            unknownTenantRedirectUrl.searchParams.set('error', 'unknown_tenant');
            unknownTenantRedirectUrl.searchParams.set('attempted', tenantSubdomain);
            console.log(`[MW_REDIRECT] Unknown tenant. Redirecting to: ${unknownTenantRedirectUrl.toString()}`);
            return NextResponse.redirect(unknownTenantRedirectUrl);
        }
    } else if (isEffectiveRootDomainAccess) {
        // Any access to the root domain (that wasn't a public path or selection page itself)
        // should go to the tenant selection page.
        console.log(`[MW_ACTION_ROOT_ACCESS] Root domain access for non-public/non-selection path (${pathname}).`);
        const rootRedirectUrl = request.nextUrl.clone();
        rootRedirectUrl.pathname = TENANT_SELECTION_PATH;
        // Clear any error params if it's just a root access redirect without a prior error
        rootRedirectUrl.search = ''; // Or specific query like ?from=root
        rootRedirectUrl.searchParams.set('from', 'root_domain_access');
        console.log(`[MW_REDIRECT] Root domain access. Redirecting to: ${rootRedirectUrl.toString()}`);
        return NextResponse.redirect(rootRedirectUrl);
    }

    // Fallback: This should ideally not be reached if the logic above is exhaustive for all valid host patterns.
    // It might catch truly malformed hosts or unhandled edge cases.
    console.warn(`[MW_FALLBACK] Unhandled case. Host: ${host}, Path: ${pathname}. This indicates a logic gap.`);
    const fallbackRedirectUrl = request.nextUrl.clone();
    fallbackRedirectUrl.pathname = TENANT_SELECTION_PATH;
    fallbackRedirectUrl.searchParams.set('error', 'middleware_unhandled_case');
    console.log(`[MW_REDIRECT] Fallback. Redirecting to: ${fallbackRedirectUrl.toString()}`);
    return NextResponse.redirect(fallbackRedirectUrl);
}

export const config = {
    matcher: [
        // Match all paths except for Next.js internals and common static assets.
        '/((?!_next/static|_next/image|favicon.ico|images/|assets/|robots.txt|sitemap.xml|manifest.webmanifest).*)',
    ],
};

// Log once when config is set
console.log(`[MW_CONFIG] Middleware matcher configured: ${config.matcher.join(', ')}`);