module.exports = {

"[project]/src/app/(dashboard)/layout.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/(dashboard)/layout.tsx
__turbopack_context__.s({
    "default": (()=>DashboardLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
async function DashboardLayout({ children }) {
    // You could potentially fetch data here that needs to be available to
    // ALL dashboard pages and their respective client layouts, perhaps via a Context provider.
    // For example, fetching tenant information here if it wasn't already done by middleware
    // and you didn't want each page to re-fetch it.
    // However, your current pages (dashboard/page.tsx, supplier/dashboard/page.tsx)
    // already fetch tenant data.
    // If DashboardLayoutClient/Supplier take up the full screen,
    // this layout essentially just passes the children through.
    // It ensures that these children are rendered within the context of the
    // root layout (src/app/layout.tsx).
    // The mock sidebar and navbar you had here would conflict with the
    // sidebars and navbars within DashboardLayoutClient/Supplier.tsx.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}}),

};

//# sourceMappingURL=src_app_%28dashboard%29_layout_tsx_d525eec8._.js.map