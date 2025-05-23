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
// middleware.ts (rewritten)
// -------------------------
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
// --- ENV CONFIG ---
const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || 'saaspro.com';
const DEV_DOMAIN = 'localhost:3000';
const ROOT_DOMAIN = ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : DEV_DOMAIN;
// --- SETTINGS ---
const PUBLIC_PATHS = [
    '/about-us',
    '/pricing',
    '/terms',
    '/privacy'
];
const TENANT_SELECTION = '/select-tenant';
const AUTH_PREFIX = '/api/auth';
const VALID_SUBDOMAINS = [
    'client',
    'supplier',
    'customer'
];
const RESERVED = [
    'www',
    'app',
    'api',
    'mail',
    'blog',
    'dev',
    'status',
    'docs',
    'assets',
    'static'
];
// --- HELPERS ---
const isAsset = (path)=>/\.(ico|png|jpg|jpeg|svg|js|css|webmanifest|txt|xml)$/i.test(path);
const config = {
    matcher: [
        '/:path*'
    ]
};
async function middleware(request) {
    const url = request.nextUrl.clone();
    const { pathname } = url;
    const host = request.headers.get('host') || '';
    // 1. Bypass static, assets, auth, and public
    if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.startsWith('/assets/') || pathname.startsWith('/images/') || pathname.startsWith(AUTH_PREFIX) || isAsset(pathname) || PUBLIC_PATHS.includes(pathname)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // 2. Host parsing
    const root = ROOT_DOMAIN.split(':')[0];
    let sub = null;
    let isRootAccess = false;
    if (host === root || host === `www.${root}`) {
        isRootAccess = true;
    } else if (host.endsWith(`.${root}`)) {
        const part = host.split('.')[0];
        if (!RESERVED.includes(part.toLowerCase())) sub = part;
        else isRootAccess = true;
    } else {
        return redirectToSelection(request, 'unrecognized_host');
    }
    // 3. Routing
    if (sub) {
        if (VALID_SUBDOMAINS.includes(sub.toLowerCase())) {
            // Create new Headers instance and set tenant ID
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-tenant-id', sub);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                request: {
                    headers: requestHeaders
                }
            });
        }
        return redirectToSelection(request, 'unknown_tenant', sub);
    }
    if (isRootAccess) {
        return redirectToSelection(request, 'root_access');
    }
    // Fallback
    return redirectToSelection(request, 'middleware_unhandled');
}
// --- REDIRECT HELPER ---
function redirectToSelection(request, error, attempted) {
    const url = request.nextUrl.clone();
    url.pathname = TENANT_SELECTION;
    url.searchParams.set('error', error);
    if (attempted) url.searchParams.set('attempted', attempted);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
}
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__de110ef0._.js.map