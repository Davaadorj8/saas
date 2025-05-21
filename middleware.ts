// middleware.ts (at the root of your project)
import { NextRequest, NextResponse } from 'next/server';

// --- Configuration ---
const SERVER_PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || 'saaspro.com'; // <<-- REPLACE & SET IN VERCEL ENV
const DEV_ROOT_DOMAIN = 'localhost:3000';

// For now, these are hardcoded. Long-term, they should align with Tenant.subdomain in DB
const KNOWN_TENANT_SUBDOMAINS: string[] = ['client', 'supplier', 'customer']; // <<-- ENSURE THESE MATCH DB
const RESERVED_SUBDOMAINS: string[] = ['www', 'app', 'api', 'mail', 'blog', 'dev', 'status', 'docs'];
const PUBLIC_PATHS: string[] = ['/about-us', '/pricing']; // Add any other truly public pages
const TENANT_SELECTION_PATH = '/select-tenant'; // The page users are sent to choose/find their tenant
const AUTH_API_PATH_PREFIX = '/api/auth'; // For NextAuth.js or similar

function getRootDomain(): string {
    return process.env.NODE_ENV === 'production' ? SERVER_PRODUCTION_DOMAIN : DEV_ROOT_DOMAIN;
}
const ROOT_DOMAIN_VAL = getRootDomain(); // Initialize once
console.log(`[MW_INIT] Middleware initialized. NODE_ENV: ${process.env.NODE_ENV}, ROOT_DOMAIN_VAL: ${ROOT_DOMAIN_VAL}`);


export async function middleware(request: NextRequest) {
    console.log(`\n--- [MIDDLEWARE START ${new Date().toISOString()}] ---`);
    const { pathname, search } = request.nextUrl;
    const host = request.headers.get('host');
    console.log(`[MW_INFO] Request -- Host: ${host}, Pathname: ${pathname}, Search: ${search}`);

    // 1. Bypass for Next.js internals, static assets, and auth API calls
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') || // If you have a /static folder served
        pathname.startsWith(AUTH_API_PATH_PREFIX) ||
        pathname.includes('.') // Basic check for files (e.g., favicon.ico, image.png)
    ) {
        console.log(`[MW_BYPASS] Path (${pathname}) is internal, static, or auth API. Passing through.`);
        return NextResponse.next();
    }

    // 2. Handle requests to defined public paths directly
    if (PUBLIC_PATHS.includes(pathname)) {
        console.log(`[MW_BYPASS] Path (${pathname}) is a public path. Passing through.`);
        return NextResponse.next();
    }

    // 3. Handle the tenant selection page itself to prevent redirect loops
    if (pathname === TENANT_SELECTION_PATH) {
        console.log(`[MW_BYPASS] Path (${pathname}) is the tenant selection page. Passing through.`);
        return NextResponse.next();
    }

    // --- Host and Subdomain Logic ---
    if (!host) {
        console.error('[MW_ERROR] No host header found. This is highly unusual.');
        // Potentially redirect to a generic error page or a simpler version of tenant selection
        const errorRedirectUrl = request.nextUrl.clone();
        errorRedirectUrl.pathname = TENANT_SELECTION_PATH; // Or a dedicated error page
        errorRedirectUrl.searchParams.set('error', 'missing_host');
        return NextResponse.redirect(errorRedirectUrl);
    }

    const MappedRootDomainForCompare = ROOT_DOMAIN_VAL.split(':')[0]; // e.g., "saaspro.com" or "localhost"
    let tenantSubdomain: string | null = null;
    let isRootDomainAccess = false;

    if (host === ROOT_DOMAIN_VAL || host.startsWith(`www.${MappedRootDomainForCompare}`)) {
        console.log(`[MW_HOST_TYPE] Detected ROOT domain request: ${host}`);
        isRootDomainAccess = true;
    } else if (host.endsWith(`.${MappedRootDomainForCompare}`)) {
        const potentialSubdomain = host.split('.')[0];
        console.log(`[MW_HOST_TYPE] Detected SUBDOMAIN request. Potential subdomain: ${potentialSubdomain}`);
        if (!RESERVED_SUBDOMAINS.includes(potentialSubdomain)) {
            tenantSubdomain = potentialSubdomain;
            console.log(`[MW_SUBDOMAIN_PARSE] Parsed tenantSubdomain: ${tenantSubdomain}`);
        } else {
            console.log(`[MW_BYPASS] Subdomain (${potentialSubdomain}) is reserved. Treating as root/public access.`);
            // Decide if reserved subdomains should also go to tenant selection or a specific page
            const reservedRedirectUrl = request.nextUrl.clone();
            reservedRedirectUrl.pathname = TENANT_SELECTION_PATH; // Or a marketing page
            return NextResponse.redirect(reservedRedirectUrl);
        }
    } else {
        // This case might happen with CNAMEs pointing to Vercel that aren't subdomains of your root
        // or completely unexpected host headers.
        console.warn(`[MW_WARN] Unrecognized host format: ${host}. Expected to end with '.${MappedRootDomainForCompare}' or be '${ROOT_DOMAIN_VAL}'.`);
        const unrecognizedHostRedirectUrl = request.nextUrl.clone();
        unrecognizedHostRedirectUrl.pathname = TENANT_SELECTION_PATH;
        unrecognizedHostRedirectUrl.searchParams.set('error', 'unrecognized_host');
        return NextResponse.redirect(unrecognizedHostRedirectUrl);
    }

    // --- Action based on parsed host ---
    const requestHeaders = new Headers(request.headers);

    if (tenantSubdomain) {
        console.log(`[MW_TENANT_CHECK] Checking tenantSubdomain: '${tenantSubdomain}' against KNOWN: [${KNOWN_TENANT_SUBDOMAINS.join(', ')}]`);
        if (KNOWN_TENANT_SUBDOMAINS.includes(tenantSubdomain)) {
            requestHeaders.set('x-tenant-id', tenantSubdomain); // Using tenantSubdomain as the identifier
            console.log(`[MW_ACTION] Valid tenant '${tenantSubdomain}' identified. Setting 'x-tenant-id' header. Allowing request to '${pathname}'.`);
            return NextResponse.next({ request: { headers: requestHeaders } });
        } else {
            console.log(`[MW_ACTION] Unknown tenant subdomain '${tenantSubdomain}'. Redirecting to ${TENANT_SELECTION_PATH}.`);
            const unknownTenantRedirectUrl = request.nextUrl.clone();
            unknownTenantRedirectUrl.pathname = TENANT_SELECTION_PATH;
            unknownTenantRedirectUrl.searchParams.set('error', 'unknown_tenant');
            unknownTenantRedirectUrl.searchParams.set('attempted', tenantSubdomain);
            return NextResponse.redirect(unknownTenantRedirectUrl);
        }
    } else if (isRootDomainAccess) {
        // All root domain access (if not a public path handled earlier) goes to tenant selection
        console.log(`[MW_ACTION] Root domain request for non-public path (${pathname}). Redirecting to ${TENANT_SELECTION_PATH}.`);
        const rootRedirectUrl = request.nextUrl.clone();
        rootRedirectUrl.pathname = TENANT_SELECTION_PATH;
        return NextResponse.redirect(rootRedirectUrl);
    }

    // Fallback: Should ideally not be reached if logic above is complete, but as a safety net.
    console.log(`[MW_FALLBACK] Fallback condition met for host: ${host}, path: ${pathname}. This indicates an unhandled case. Redirecting to ${TENANT_SELECTION_PATH}.`);
    const fallbackRedirectUrl = request.nextUrl.clone();
    fallbackRedirectUrl.pathname = TENANT_SELECTION_PATH;
    fallbackRedirectUrl.searchParams.set('error', 'middleware_fallback');
    return NextResponse.redirect(fallbackRedirectUrl);
}

export const config = {
    matcher: [
        // Match all paths except for Next.js internals and common static assets.
        // This ensures the middleware runs for pages and most API routes.
        // Specific bypasses for some API routes (like /api/auth) are handled inside the middleware.
        '/((?!_next/static|_next/image|favicon.ico|images/|assets/|robots.txt|sitemap.xml).*)',
    ],
};