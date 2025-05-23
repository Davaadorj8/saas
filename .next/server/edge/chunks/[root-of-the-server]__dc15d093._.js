(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__dc15d093._.js", {

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
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// C:\Users\user\Documents\saas\middleware.ts (or src\middleware.ts)
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
// --- (Keep ENV CONFIG, SETTINGS constants, HELPERS as before) ---
const NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT = ("TURBOPACK compile-time value", "mysuper-saas.com") || 'mysuper-saas.com';
let SERVER_ROOT_DOMAIN;
if (process.env.APP_ENV === 'production' || ("TURBOPACK compile-time value", "development") === 'production') {
    SERVER_ROOT_DOMAIN = NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN_FOR_CLIENT;
} else {
    SERVER_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
}
const PUBLIC_FILE_EXTENSIONS = /\.(.*)$/;
const PUBLIC_PATHS = [
    '/about-us',
    '/pricing',
    '/terms',
    '/privacy',
    '/favicon.ico'
];
const TENANT_SELECTION_PATH = '/select-tenant';
const AUTH_API_PREFIX = '/api/auth';
const LOGIN_PATH = '/login';
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
const getHostnameWithoutPort = (hostHeaderOrDomain)=>{
    try {
        const url = new URL(hostHeaderOrDomain.startsWith('http') ? hostHeaderOrDomain : `http://${hostHeaderOrDomain}`);
        return url.hostname.toLowerCase();
    } catch (e) {
        return hostHeaderOrDomain.split(':')[0].toLowerCase();
    }
};
const config = {
    matcher: [
        '/((?!_next/static|_next/image|.*\\..*).*)'
    ]
};
async function middleware(request) {
    const url = request.nextUrl.clone();
    const { pathname } = url;
    const hostHeader = request.headers.get('host') || SERVER_ROOT_DOMAIN;
    console.log(`\n--- [MW RUN] Request: ${request.method} ${hostHeader}${pathname} ---`);
    // 1. Early bypass for truly public static assets and Next.js internals
    //    These should never have tenant context.
    if (pathname.startsWith('/_next/') || PUBLIC_FILE_EXTENSIONS.test(pathname) || // All files with extensions
    PUBLIC_PATHS.includes(pathname) // Explicitly defined public HTML pages
    ) {
        console.log(`[MW BYPASS - STATIC/PUBLIC] Path: ${pathname}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // 2. Host parsing and subdomain identification
    const currentHostname = getHostnameWithoutPort(hostHeader);
    const serverRootHostname = getHostnameWithoutPort(SERVER_ROOT_DOMAIN);
    let identifiedSubdomain = null;
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request: {
                        headers: requestHeaders
                    }
                });
            }
            // For pages on the subdomain:
            if (pathname === '/') {
                const loginUrl = new URL(LOGIN_PATH, url);
                console.log(`[MW SUBDOMAIN] Root of subdomain. Redirecting to login: ${loginUrl.href}`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl, {
                    headers: requestHeaders
                });
            }
            // Allow other page requests on this subdomain to proceed with the header
            console.log(`[MW SUBDOMAIN] Allowing page path "${pathname}" with header.`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                request: {
                    headers: requestHeaders
                }
            });
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next(); // No tenant header for root domain API calls
        }
        // For any other path on the root domain that isn't the tenant selection page, redirect.
        if (pathname !== TENANT_SELECTION_PATH) {
            console.log(`[MW ROOT] Path "${pathname}" is not select-tenant. Redirecting to select-tenant.`);
            return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'root_access_needs_selection', pathname);
        }
        // Allow access to the tenant selection page itself on the root domain
        console.log(`[MW ROOT] Allowing path "${TENANT_SELECTION_PATH}" on root domain.`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Fallback (should ideally not be reached)
    console.warn(`[MW FALLBACK] Unhandled case. Host: "${currentHostname}", Path: "${pathname}". Redirecting to selection.`);
    return redirectToSelectionPage(request, SERVER_ROOT_DOMAIN, 'middleware_unhandled', currentHostname);
}
// --- REDIRECT HELPER to TENANT_SELECTION_PATH on ROOT_DOMAIN ---
// (redirectToSelectionPage function remains the same as the last version)
function redirectToSelectionPage(request, serverRootDomainForRedirect, errorReason, attemptedValue) {
    const selectionUrl = new URL(request.nextUrl.origin);
    selectionUrl.hostname = getHostnameWithoutPort(serverRootDomainForRedirect);
    const rootDomainPort = serverRootDomainForRedirect.split(':')[1];
    if (rootDomainPort) selectionUrl.port = rootDomainPort;
    else selectionUrl.port = '';
    selectionUrl.pathname = TENANT_SELECTION_PATH;
    selectionUrl.searchParams.set('error', errorReason);
    if (attemptedValue) selectionUrl.searchParams.set('attempted', attemptedValue);
    const fromParam = request.nextUrl.searchParams.get('from');
    if (fromParam && errorReason !== 'root_access_needs_selection') {
        selectionUrl.searchParams.set('from', fromParam);
    }
    console.log(`[MW REDIRECT HELPER] Redirecting to: ${selectionUrl.href} (Reason: ${errorReason})`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(selectionUrl);
}
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__dc15d093._.js.map