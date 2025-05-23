(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/auth/SelectTenantForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/auth/SelectTenantForm.tsx
__turbopack_context__.s({
    "default": (()=>SelectTenantForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)"); // useRouter not strictly used here but fine
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SelectTenantForm() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])(); // For reading error query params
    const [subdomain, setSubdomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelectTenantForm.useEffect": ()=>{
            const error = searchParams.get('error');
            const attempted = searchParams.get('attempted');
            let msg = null;
            switch(error){
                case 'unknown_tenant':
                    msg = `The organization '${attempted || 'address'}' was not found. Please check the name or contact support.`;
                    break;
                case 'missing_host':
                    msg = 'There was an issue determining your organization. Please try entering its address.';
                    break;
                case 'unrecognized_host':
                    msg = 'The web address you used is not recognized. Please enter your organization\'s address.';
                    break;
                case 'tenant_required_for_client_dashboard':
                case 'tenant_required_for_customer_dashboard':
                case 'tenant_required_for_supplier_dashboard':
                    msg = 'Access to that dashboard requires an organization address. Please enter it below.';
                    break;
                case 'tenant_db_not_found':
                case 'tenant_on_root_not_found':
                case 'tenant_not_found_client_dashboard':
                case 'tenant_not_found_customer_dashboard':
                case 'tenant_not_found_supplier_dashboard':
                    msg = `We couldn't find an organization with the address '${attempted || 'provided'}'. Please check and try again.`;
                    break;
                case 'incorrect_tenant_type_for_client_dashboard':
                case 'incorrect_tenant_type_for_customer_dashboard':
                case 'incorrect_tenant_type_for_supplier_dashboard':
                    msg = `The organization '${attempted || 'address'}' is not the correct type for that dashboard.`;
                    break;
                case 'db_error':
                case 'db_error_client_dashboard':
                case 'db_error_customer_dashboard':
                case 'db_error_supplier_dashboard':
                    msg = 'We encountered a problem looking up your organization. Please try again shortly.';
                    break;
                case 'middleware_fallback':
                case 'root_page_direct_access':
                case 'root_page_unhandled':
                    msg = 'Please select or enter your organization address.';
                    break;
                default:
                    if (error) {
                        msg = 'An unexpected issue occurred. Please try entering your organization address.';
                    }
            }
            setErrorMessage(msg);
        }
    }["SelectTenantForm.useEffect"], [
        searchParams
    ]);
    // src/components/auth/SelectTenantForm.tsx - handleSubmit
    const handleSubmit = (e)=>{
        e.preventDefault();
        const trimmedSubdomain = subdomain.trim().toLowerCase();
        if (trimmedSubdomain) {
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            let targetHost;
            let protocol = 'http:'; // Default to HTTP for local/dev
            // Check if the main access point is localhost via port forwarding
            // This condition might need adjustment based on how you access your Cloud Workstation's forwarded port
            const isEffectivelyLocalhost = window.location.hostname === 'localhost' || window.location.port === '3000' || // Or whatever port you forward to locally
            window.location.hostname.startsWith('127.0.0.1');
            if (isEffectivelyLocalhost) {
                targetHost = `${trimmedSubdomain}.localhost:3000`;
                protocol = 'http:';
            } else if (window.location.hostname.includes('cloudworkstations.dev')) {
                // If HSTS is blocking HTTP on cloudworkstations.dev subdomains, this path is problematic.
                // We are trying to force HTTP, but HSTS might prevent it.
                // For Cloud Workstations with HSTS, direct subdomain testing becomes very hard without a proxy.
                // Reverting to using the main Cloud Workstation URL + path-based tenancy for dev on Cloud Workstations might be easier.
                console.warn("Attempting HTTP redirect on Cloud Workstation for subdomain, HSTS might interfere.");
                targetHost = `${trimmedSubdomain}.${window.location.host}`;
                protocol = 'http:';
            } else {
                // Production logic
                const productionDomainEnv = ("TURBOPACK compile-time value", "mysuper-saas.com");
                if (productionDomainEnv && window.location.hostname.endsWith(productionDomainEnv)) {
                    targetHost = `${trimmedSubdomain}.${productionDomainEnv}`;
                } else {
                    // Fallback for other production scenarios or if NEXT_PUBLIC_PRODUCTION_DOMAIN isn't set
                    // This might still try to use the full Vercel URL etc.
                    targetHost = `${trimmedSubdomain}.${window.location.host}`;
                }
                protocol = 'https:'; // Production should be HTTPS
            }
            console.log(`Redirecting to: ${protocol}//${targetHost}`);
            window.location.href = `${protocol}//${targetHost}`;
        } else {
            setErrorMessage("Please enter your organization's address (e.g., 'acme').");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "mx-auto h-12 w-auto",
                src: "https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" // Replace with your actual logo
                ,
                alt: "SAASPro Logo"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold text-gray-800 mt-4",
                children: "Welcome to SAASPro"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this),
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600",
                children: "Please enter your organization's unique address to continue."
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 117,
                columnNumber: 13
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 122,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-4 pt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "subdomain",
                                className: "sr-only",
                                children: "Organization Address"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                                lineNumber: 127,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "subdomain",
                                        name: "subdomain",
                                        type: "text",
                                        required: true,
                                        className: "appearance-none rounded-l-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                                        placeholder: "your-organization",
                                        value: subdomain,
                                        onChange: (e)=>setSubdomain(e.target.value),
                                        autoCapitalize: "none",
                                        spellCheck: "false"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                                        lineNumber: 131,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center h-[46px] px-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md",
                                        children: [
                                            ".",
                                            "object" !== 'undefined' && window.location.hostname === 'localhost' ? 'localhost:3000' : (("TURBOPACK compile-time value", "mysuper-saas.com") || 'saaspro.com').split(':')[0]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                                        lineNumber: 143,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                                lineNumber: 130,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 126,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                        children: "Access My Organization"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 154,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 125,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 pt-2",
                children: [
                    "Example: If your address is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "bg-gray-200 p-1 rounded",
                        children: "acme.saaspro.com"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 162,
                        columnNumber: 45
                    }, this),
                    ", enter ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "bg-gray-200 p-1 rounded",
                        children: "acme"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 162,
                        columnNumber: 118
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
        lineNumber: 110,
        columnNumber: 9
    }, this);
}
_s(SelectTenantForm, "YgkDOidfJzwadtUGcfj2caQYOTE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = SelectTenantForm;
var _c;
__turbopack_context__.k.register(_c, "SelectTenantForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/auth/SelectTenantForm.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/auth/SelectTenantForm.tsx [app-client] (ecmascript)"));
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_9678a1d9._.js.map