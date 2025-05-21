// middleware.ts (at the root of your project)
import { NextRequest, NextResponse } from 'next/server';

// --- Configuration ---
const PRODUCTION_DOMAIN = process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN || 'saaspro.com'; // <<-- REPLACE with your actual production domain when known
const DEV_ROOT_DOMAIN = 'localhost:3000';

const KNOWN_TENANT_SUBDOMAINS: string[] = ['client', 'supplier', 'customer']; // <<-- MAKE SURE THESE ARE YOUR ACTUAL SUBDOMAINS
const RESERVED_SUBDOMAINS: string[] = ['www', 'app', 'api', 'mail', 'blog', 'dev'];
const PUBLIC_PATHS: string[] = ['/about-us'];
const TENANT_SELECTION_PATH = '/select-tenant';

function getRootDomain() {
    const nodeEnv = process.env.NODE_ENV;
    console.log(`[MW_CONFIG] NODE_ENV: ${nodeEnv}`);
    const domain = nodeEnv === 'production' ? PRODUCTION_DOMAIN : DEV_ROOT_DOMAIN;
    console.log(`[MW_CONFIG] Determined ROOT_DOMAIN_VAL: ${domain}`);
    return domain;
}

export async function middleware(request: NextRequest) {
    console.log(`\n--- [MIDDLEWARE START] ---`);
    const { pathname, origin, search } = request.nextUrl;
    const host = request.headers.get('host');
    console.log(`[MW_INFO] Request -- Host: ${host}, Pathname: ${pathname}, Origin: ${origin}, Search: ${search}`);

    const ROOT_DOMAIN_VAL = getRootDomain();

    // 1. Bypass for Next.js internals and static assets
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // Basic check for files (e.g., favicon.ico, image.png)
    ) {
        console.log(`[MW_BYPASS] Path (${pathname}) is an internal or static asset. Passing through.`);
        return NextResponse.next();
    }

    // 2. Handle requests to public paths directly
    if (PUBLIC_PATHS.includes(pathname)) {
        console.log(`[MW_BYPASS] Path (${pathname}) is a public path. Passing through.`);
        return NextResponse.next();
    }

    // 3. Handle the tenant selection page itself (so it doesn't redirect itself)
    if (pathname === TENANT_SELECTION_PATH) {
        console.log(`[MW_BYPASS] Path (${pathname}) is the tenant selection page. Passing through.`);
        return NextResponse.next();
    }

    // --- Logic for Host and Subdomain ---
    if (!host) {
        console.error('[MW_ERROR] No host header found. This is unusual. Redirecting to tenant selection.');
        const redirectUrl = new URL(TENANT_SELECTION_PATH, origin || `http://${ROOT_DOMAIN_VAL}`);
        return NextResponse.redirect(redirectUrl);
    }
    console.log(`[MW_HOST_CHECK] Host: ${host}, ROOT_DOMAIN_VAL: ${ROOT_DOMAIN_VAL}`);

    const MappedRootDomainForCompare = ROOT_DOMAIN_VAL.split(':')[0];
    console.log(`[MW_HOST_CHECK] MappedRootDomainForCompare: ${MappedRootDomainForCompare}`);
    let tenantSubdomain: string | null = null;
    let isRootDomainRequest = false;

    if (host === ROOT_DOMAIN_VAL || host.startsWith(`www.${MappedRootDomainForCompare}`)) {
        console.log(`[MW_HOST_TYPE] Detected ROOT domain request.`);
        isRootDomainRequest = true;
    } else if (host.endsWith(`.${MappedRootDomainForCompare}`)) {
        const potentialSubdomain = host.split('.')[0];
        console.log(`[MW_HOST_TYPE] Detected SUBDOMAIN request. Potential subdomain: ${potentialSubdomain}`);
        if (!RESERVED_SUBDOMAINS.includes(potentialSubdomain)) {
            tenantSubdomain = potentialSubdomain;
            console.log(`[MW_SUBDOMAIN_PARSE] Parsed tenantSubdomain: ${tenantSubdomain}`);
        } else {
            console.log(`[MW_BYPASS] Subdomain (${potentialSubdomain}) is a reserved subdomain. Passing through.`);
            return NextResponse.next();
        }
    } else {
        console.warn(`[MW_WARN] Unrecognized host format: ${host}. Redirecting to tenant selection.`);
        const redirectUrl = new URL(TENANT_SELECTION_PATH, `http://${ROOT_DOMAIN_VAL}`);
        return NextResponse.redirect(redirectUrl);
    }

    const requestHeaders = new Headers(request.headers);

    if (isRootDomainRequest) {
        console.log(`[MW_ACTION] Root domain request for path (${pathname}). Redirecting to ${TENANT_SELECTION_PATH}.`);
        const redirectUrl = new URL(TENANT_SELECTION_PATH, `http://${ROOT_DOMAIN_VAL}`);
        return NextResponse.redirect(redirectUrl);
    }

    if (tenantSubdomain) {
        console.log(`[MW_TENANT_CHECK] Checking tenantSubdomain: ${tenantSubdomain} against KNOWN: ${KNOWN_TENANT_SUBDOMAINS.join(', ')}`);
        if (KNOWN_TENANT_SUBDOMAINS.includes(tenantSubdomain)) {
            requestHeaders.set('x-tenant-id', tenantSubdomain);
            console.log(`[MW_ACTION] Valid tenant '${tenantSubdomain}' identified. Setting x-tenant-id header. Allowing request.`);
            return NextResponse.next({ request: { headers: requestHeaders } });
        } else {
            console.log(`[MW_ACTION] Unknown tenant subdomain '${tenantSubdomain}'. Redirecting to ${TENANT_SELECTION_PATH}.`);
            const selectionUrl = new URL(TENANT_SELECTION_PATH, `http://${ROOT_DOMAIN_VAL}`);
            return NextResponse.redirect(selectionUrl);
        }
    }

    console.log(`[MW_FALLBACK] Fallback: No specific tenant identified, not root. Host: ${host}. Redirecting to ${TENANT_SELECTION_PATH}.`);
    const fallbackRedirectUrl = new URL(TENANT_SELECTION_PATH, `http://${ROOT_DOMAIN_VAL}`);
    return NextResponse.redirect(fallbackRedirectUrl);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
    ],
};
console.log('[MW_CONFIG] Middleware config loaded. Matcher:', config.matcher); // Log matcher once