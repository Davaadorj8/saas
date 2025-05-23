(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__de110ef0._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// C:\Users\user\Documents\saas\middleware.ts (or src\middleware.ts depending on your setup)
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
// --- ENV CONFIG ---
const NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT = ("TURBOPACK compile-time value", "mysuper-saas.com") || 'mysuper-saas.com';
let SERVER_ROOT_DOMAIN;
if (process.env.APP_ENV === 'production' || ("TURBOPACK compile-time value", "development") === 'production') {
    SERVER_ROOT_DOMAIN = NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT;
    console.log(`[Middleware Env] Production mode. SERVER_ROOT_DOMAIN: ${SERVER_ROOT_DOMAIN}`);
} else {
    SERVER_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
    console.log(`[Middleware Env] Development mode. SERVER_ROOT_DOMAIN: ${SERVER_ROOT_DOMAIN}`);
}
// --- SETTINGS ---
const PUBLIC_FILE_EXTENSIONS = /\.(.*)$/; // Matches all file extensions
const PUBLIC_PATHS = [
    '/about-us',
    '/pricing',
    '/terms',
    '/privacy',
    '/favicon.ico'
]; // Add favicon and other root public files
const TENANT_SELECTION_PATH = '/select-tenant';
const AUTH_API_PREFIX = '/api/auth'; // For authentication API calls
const LOGIN_PATH = '/login'; // The path to your login page on a subdomain
const REGISTER_PATH = '/register'; // The path to your register page on a subdomain
// These are the *literal* subdomains users are expected to select.
const VALID_TENANT_SUBDOMAINS = [
    'client',
    'supplier',
    'customer'
];
const RESERVED_SUBDOMAINS = [
    'www',
    'app',
    'api',
    'mail',
    'blog',
    'dev',
    'status',
    'docs',
    'assets',
    'static',
    'internal',
    '_next'
];
// --- HELPERS ---
const getHostnameWithoutPort = (hostHeaderOrDomain)=>{
    try {
        // Ensure it's a full URL structure for robust parsing, otherwise split
        const url = new URL(hostHeaderOrDomain.startsWith('http') ? hostHeaderOrDomain : `http://${hostHeaderOrDomain}`);
        return url.hostname.toLowerCase();
    } catch (e) {
        // Fallback for simple host:port or host strings
        return hostHeaderOrDomain.split(':')[0].toLowerCase();
    }
};
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file) - explicitly handled if needed, or can be in PUBLIC_PATHS
     * - Anything with a file extension (e.g., .png, .jpg, .svg, .js, .css)
     */ '/((?!_next/static|_next/image|.*\\..*).*)'
    ]
};
async function middleware(request) {
    const url = request.nextUrl.clone(); // Clone to modify
    const { pathname } = url;
    const hostHeader = request.headers.get('host') || SERVER_ROOT_DOMAIN;
    console.log(`[Middleware] Incoming Request: ${request.method} ${hostHeader}${pathname}`);
    // 1. Bypass for Next.js internals, explicitly public files/paths, and auth API routes
    if (pathname.startsWith('/_next/') || // Next.js internal assets
    pathname.startsWith(AUTH_API_PREFIX) || // Authentication API calls (e.g., /api/auth/login, /api/auth/register)
    PUBLIC_PATHS.includes(pathname) || // Defined public HTML pages
    PUBLIC_FILE_EXTENSIONS.test(pathname) // Any file with an extension (images, css, js assets in /public)
    ) {
        console.log(`[Middleware] Bypassing for static/internal/public/auth-api path: ${pathname}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // 2. Host parsing and subdomain identification
    const currentHostname = getHostnameWithoutPort(hostHeader);
    const serverRootHostname = getHostnameWithoutPort(SERVER_ROOT_DOMAIN);
    let identifiedSubdomain = null;
    let isRootAccess = false;
    console.log(`[Middleware] Current Hostname: ${currentHostname}, Server Root Hostname: ${serverRootHostname}`);
    if (currentHostname === serverRootHostname || currentHostname === `www.${serverRootHostname}`) {
        isRootAccess = true;
        console.log(`[Middleware] Detected root access on: ${currentHostname}`);
    } else if (currentHostname.endsWith(`.${serverRootHostname}`)) {
        const potentialSubdomain = currentHostname.substring(0, currentHostname.length - serverRootHostname.length - 1);
        if (potentialSubdomain && !RESERVED_SUBDOMAINS.includes(potentialSubdomain)) {
            identifiedSubdomain = potentialSubdomain;
            console.log(`[Middleware] Identified potential subdomain: ${identifiedSubdomain}`);
        } else {
            isRootAccess = true; // e.g., www.localhost or a reserved subdomain, treat as root for redirection
            console.log(`[Middleware] Detected reserved subdomain or www, treating as root access: ${currentHostname}`);
        }
    } else {
        // Completely unrecognized host (neither root nor a subdomain of root)
        console.warn(`[Middleware] Unrecognized host: ${currentHostname}. Expected subdomain of ${serverRootHostname} or root access. Redirecting to tenant selection on root domain.`);
        return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'unrecognized_host', currentHostname);
    }
    // 3. Routing Logic
    if (identifiedSubdomain) {
        // A potential subdomain was identified
        if (VALID_TENANT_SUBDOMAINS.includes(identifiedSubdomain)) {
            console.log(`[Middleware] Valid tenant subdomain: ${identifiedSubdomain}`);
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-tenant-id', identifiedSubdomain); // Use the subdomain itself as tenant ID
            // If the user is at the root of the tenant's subdomain (e.g., supplier.localhost:3000/)
            // redirect them to the login page for that tenant.
            if (pathname === '/') {
                const loginUrl = new URL(LOGIN_PATH, url); // Constructs e.g. supplier.localhost:3000/login
                console.log(`[Middleware] Subdomain root access on "${identifiedSubdomain}", redirecting to login: ${loginUrl.href}`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl, {
                    headers: requestHeaders
                });
            }
            // For all other paths on this valid tenant subdomain (including /login, /register, /dashboard after login, API routes etc.),
            // allow the request to proceed with the x-tenant-id header.
            console.log(`[Middleware] Allowing path "${pathname}" on subdomain "${identifiedSubdomain}" with x-tenant-id header.`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                request: {
                    headers: requestHeaders
                }
            });
        } else {
            // The subdomain part exists but is not 'client', 'supplier', or 'customer'.
            console.warn(`[Middleware] Unknown tenant subdomain attempt: ${identifiedSubdomain}. Redirecting to selection.`);
            return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'unknown_tenant', identifiedSubdomain);
        }
    }
    // No subdomain, implies root access (isRootAccess must be true here)
    if (isRootAccess) {
        console.log(`[Middleware] Processing root access for path: ${pathname}`);
        if (pathname !== TENANT_SELECTION_PATH) {
            console.log(`[Middleware] Root domain access to "${pathname}" (not select-tenant), redirecting to tenant selection.`);
            return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'root_access_needs_selection', pathname);
        }
        console.log(`[Middleware] Allowing access to "${TENANT_SELECTION_PATH}" on root domain.`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Fallback (should ideally not be reached if logic above is comprehensive)
    console.warn(`[Middleware] Fallback for host: ${currentHostname}, path: ${pathname}. Redirecting to selection.`);
    return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'middleware_unhandled', currentHostname);
}
// --- REDIRECT HELPER to TENANT_SELECTION_PATH on ROOT_DOMAIN ---
function redirectToSelectionPage(request, serverRootDomainForRedirect, errorReason, attemptedValue// This can be a subdomain string or a pathname
) {
    const selectionUrl = new URL(request.nextUrl.origin); // Base the redirect on the current request's origin initially
    // Explicitly set hostname and port to the server's root domain values
    selectionUrl.hostname = getHostnameWithoutPort(serverRootDomainForRedirect);
    const rootDomainPort = serverRootDomainForRedirect.split(':')[1]; // Check if SERVER_ROOT_DOMAIN has a port
    if (rootDomainPort) {
        selectionUrl.port = rootDomainPort;
    } else {
        selectionUrl.port = ''; // Clear port if SERVER_ROOT_DOMAIN is like 'mysuper-saas.com' (no port)
    }
    selectionUrl.pathname = TENANT_SELECTION_PATH; // Target path for tenant selection
    selectionUrl.searchParams.set('error', errorReason);
    if (attemptedValue) {
        selectionUrl.searchParams.set('attempted', attemptedValue);
    }
    // Preserve 'from' query param if it exists from original request to selection page
    const fromParam = request.nextUrl.searchParams.get('from');
    if (fromParam && errorReason !== 'root_access_needs_selection') {
        selectionUrl.searchParams.set('from', fromParam);
    }
    console.log(`[Middleware] Redirecting to selection page: ${selectionUrl.href} (Reason: ${errorReason})`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(selectionUrl);
}
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__de110ef0._.js.map