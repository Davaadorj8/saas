(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/auth/SelectTenantForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// C:\Users\user\Documents\saas\src\components\auth\SelectTenantForm.tsx
__turbopack_context__.s({
    "default": (()=>SelectTenantForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// These should match the values in your .env or .env.local for client-side use
const CLIENT_SIDE_PRODUCTION_ROOT_DOMAIN = ("TURBOPACK compile-time value", "mysuper-saas.com") || 'mysuper-saas.com';
const CLIENT_SIDE_DEV_ROOT_DOMAIN = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
const NEXT_PUBLIC_APP_NAME = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_APP_NAME || 'MySuperSaaS';
function SelectTenantForm() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [subdomainInput, setSubdomainInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentHostHint, setCurrentHostHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Added loading state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelectTenantForm.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const winHostname = window.location.hostname.toLowerCase();
                if (winHostname === 'localhost' || winHostname.startsWith('127.0.0.1')) {
                    setCurrentHostHint(CLIENT_SIDE_DEV_ROOT_DOMAIN.replace(/^http(s?):\/\//, ''));
                } else {
                    setCurrentHostHint(CLIENT_SIDE_PRODUCTION_ROOT_DOMAIN);
                }
            }
            const error = searchParams.get('error');
            const attempted = searchParams.get('attempted');
            let msg = null;
            switch(error){
                case 'unknown_tenant':
                    msg = `The organization '${attempted || 'address'}' was not found. Please check the name or contact support.`;
                    break;
                case 'unrecognized_host':
                    msg = 'The web address you used is not recognized. Please enter your organization\'s address below.';
                    break;
                case 'root_access_needs_selection':
                    msg = 'Please enter your organization\'s address to continue.';
                    break;
                case 'missing_host':
                    msg = 'There was an issue determining your organization. Please try entering its address.';
                    break;
                case 'middleware_unhandled':
                    msg = 'An unexpected error occurred. Please try entering your organization\'s address or contact support.';
                    break;
                default:
                    if (error) {
                        msg = `An issue occurred (${error}). Please try entering your organization address.`;
                    }
            }
            setErrorMessage(msg);
        }
    }["SelectTenantForm.useEffect"], [
        searchParams
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsLoading(true); // Set loading true
        const trimmedSubdomain = subdomainInput.trim().toLowerCase();
        if (!trimmedSubdomain) {
            setErrorMessage("Please enter your organization's address (e.g., 'acme', 'supplier').");
            setIsLoading(false);
            return;
        }
        if (trimmedSubdomain.includes('.') || trimmedSubdomain.includes('/')) {
            setErrorMessage("Organization address should only contain letters, numbers, or hyphens (e.g., 'acme-inc').");
            setIsLoading(false);
            return;
        }
        setErrorMessage(null);
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        let targetHostWithSubdomain;
        let protocol;
        const currentWindowLocation = window.location;
        const winHostname = currentWindowLocation.hostname.toLowerCase();
        const isLocalDevelopment = winHostname === 'localhost' || winHostname.startsWith('127.0.0.1');
        if (isLocalDevelopment) {
            const devRootHostAndPort = CLIENT_SIDE_DEV_ROOT_DOMAIN.replace(/^http(s?):\/\//, '');
            targetHostWithSubdomain = `${trimmedSubdomain}.${devRootHostAndPort}`;
            protocol = currentWindowLocation.protocol;
        } else {
            targetHostWithSubdomain = `${trimmedSubdomain}.${CLIENT_SIDE_PRODUCTION_ROOT_DOMAIN}`;
            protocol = 'https:';
        }
        const redirectUrl = `${protocol}//${targetHostWithSubdomain}/`;
        console.log(`SelectTenantForm: Attempting to redirect to: ${redirectUrl}`);
        window.location.href = redirectUrl;
    // setIsLoading(false); // No need to set false if navigating away, but good if there was an API call here that could fail
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "mx-auto h-12 w-auto",
                src: "/logo.svg",
                alt: `${NEXT_PUBLIC_APP_NAME} Logo`
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold text-gray-800 mt-4",
                children: [
                    "Welcome to ",
                    NEXT_PUBLIC_APP_NAME
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600",
                children: "Please enter your organization's address to continue."
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 109,
                columnNumber: 13
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "alert",
                className: "text-sm text-red-700 bg-red-100 p-3 my-4 rounded-md border border-red-300",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 114,
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
                                lineNumber: 121,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "subdomain",
                                        name: "subdomain",
                                        type: "text",
                                        autoComplete: "off",
                                        required: true,
                                        disabled: isLoading,
                                        className: "appearance-none rounded-l-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100",
                                        placeholder: "e.g., acme, supplier",
                                        value: subdomainInput,
                                        onChange: (e)=>setSubdomainInput(e.target.value),
                                        autoCapitalize: "none",
                                        spellCheck: "false",
                                        "aria-describedby": "subdomain-hint"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                                        lineNumber: 125,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        id: "subdomain-hint",
                                        className: "inline-flex items-center h-[46px] px-3 border-y border-r border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md whitespace-nowrap",
                                        children: [
                                            ".",
                                            currentHostHint
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                                        lineNumber: 140,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                                lineNumber: 124,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed",
                        children: isLoading ? 'Processing...' : 'Access My Organization'
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 149,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 119,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 pt-2",
                children: [
                    "Example: If your address is ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "bg-gray-200 p-1 rounded text-xs",
                        children: [
                            "acme.",
                            currentHostHint.split(':')[0]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 158,
                        columnNumber: 45
                    }, this),
                    ", enter ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        className: "bg-gray-200 p-1 rounded text-xs",
                        children: "acme"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                        lineNumber: 158,
                        columnNumber: 146
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
                lineNumber: 157,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/SelectTenantForm.tsx",
        lineNumber: 102,
        columnNumber: 9
    }, this);
}
_s(SelectTenantForm, "A/BHp9Jg1V1H6NhlU2ZGkAgaA1k=", false, function() {
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