(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/dashboard/layout/PinnedCardsBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/dashboard/layout/PinnedCardsBar.tsx
__turbopack_context__.s({
    "default": (()=>PinnedCardsBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pin.js [app-client] (ecmascript) <export default as Pin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
;
function PinnedCardsBar({ pinnedCards, dashboardCards, onTogglePin }) {
    if (pinnedCards.length === 0) return null;
    const getCardById = (cardId)=>dashboardCards.find((c)=>c.id === cardId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-50 px-4 py-2 flex gap-3 overflow-x-auto border-b items-center custom-scrollbar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                size: 14,
                className: "text-indigo-500 mr-1 flex-shrink-0"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/layout/PinnedCardsBar.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            pinnedCards.map((cardId)=>{
                const card = getCardById(cardId);
                return card ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0 items-center px-3 py-1.5 bg-white rounded-md shadow-sm border text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium text-gray-700",
                            children: card.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/layout/PinnedCardsBar.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onTogglePin(cardId),
                            className: "ml-2 text-gray-400 hover:text-red-500",
                            title: `Unpin ${card.title}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/layout/PinnedCardsBar.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/layout/PinnedCardsBar.tsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this)
                    ]
                }, cardId, true, {
                    fileName: "[project]/src/components/dashboard/layout/PinnedCardsBar.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this) : null;
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/layout/PinnedCardsBar.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = PinnedCardsBar;
var _c;
__turbopack_context__.k.register(_c, "PinnedCardsBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/layout/Header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/dashboard/layout/Header.tsx
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
(()=>{
    const e = new Error("Cannot find module './NotificationsDropdown'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './UserMenuDropdown'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$layout$2f$PinnedCardsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/layout/PinnedCardsBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function Header({ tenant, activeSection, notifications, onMarkAllNotificationsRead, onViewAllNotifications, userMenuItems, onUserMenuItemClick, headerRightContent, pinnedCards, dashboardCards, onTogglePinCard, isLeftSidebarExpanded }) {
    _s();
    const [showNotificationsDropdown, setShowNotificationsDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUserMenuDropdown, setShowUserMenuDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const userMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const notificationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Click-outside handler
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const handleClickOutside = {
                "Header.useEffect.handleClickOutside": (event)=>{
                    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                        setShowUserMenuDropdown(false);
                    }
                    if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                        setShowNotificationsDropdown(false);
                    }
                }
            }["Header.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "Header.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-white border-b flex flex-col shadow-sm z-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex justify-between items-center h-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold text-gray-700",
                        children: activeSection
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 sm:gap-4",
                        children: [
                            headerRightContent,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: notificationsRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-2 rounded-full hover:bg-gray-100 relative text-gray-600",
                                        onClick: ()=>setShowNotificationsDropdown(!showNotificationsDropdown),
                                        title: "Notifications",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this),
                                            notifications.some((n)=>!n.read) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    showNotificationsDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationsDropdown, {
                                        notifications: notifications,
                                        onMarkAllRead: ()=>{
                                            onMarkAllNotificationsRead();
                                        // setShowNotificationsDropdown(false); // Optional: close on mark all
                                        },
                                        onViewAll: ()=>{
                                            onViewAllNotifications();
                                            setShowNotificationsDropdown(false);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative user-menu",
                                ref: userMenuRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "p-1.5 rounded-full hover:bg-gray-100 text-gray-600 flex items-center gap-2",
                                        onClick: ()=>setShowUserMenuDropdown(!showUserMenuDropdown),
                                        title: "User Menu",
                                        "aria-expanded": showUserMenuDropdown,
                                        "aria-label": "User menu",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium",
                                                children: tenant.name.charAt(0).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                                lineNumber: 100,
                                                columnNumber: 15
                                            }, this),
                                            isLeftSidebarExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium",
                                                children: tenant.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                                lineNumber: 103,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this),
                                    showUserMenuDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UserMenuDropdown, {
                                        tenant: tenant,
                                        userMenuItems: userMenuItems,
                                        onItemClick: (action)=>{
                                            action();
                                            setShowUserMenuDropdown(false);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$layout$2f$PinnedCardsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                pinnedCards: pinnedCards,
                dashboardCards: dashboardCards,
                onTogglePin: onTogglePinCard
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/layout/Header.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/layout/Header.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(Header, "IObWmonFgLth7y7L1JRgUySUFNI=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/BaseDashboardLayout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/dashboard/BaseDashboardLayout.tsx
__turbopack_context__.s({
    "default": (()=>BaseDashboardLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>"); // For right sidebar toggle
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
(()=>{
    const e = new Error("Cannot find module './layout/LeftSidebar'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/layout/Header.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './layout/RightCommunicationSidebar'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './layout/CustomModal'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './layout/TextMessengerPopup'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function BaseDashboardLayout({ tenant, tenantType, navItems, dashboardCards = [], initialActiveSection, initialNotifications = [], renderMainContent, headerRightContent, sidebarFooterContent }) {
    _s();
    const [sidebarExpanded, setSidebarExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialActiveSection || navItems[0]?.title || 'Dashboard');
    const LSK_MINIMIZED_CARDS = `minimizedCards_${tenantType}_${tenant.id}`;
    const LSK_PINNED_CARDS = `pinnedCards_${tenantType}_${tenant.id}`;
    const LSK_NOTIFICATIONS = `notifications_${tenantType}_${tenant.id}`;
    const [minimizedCards, setMinimizedCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BaseDashboardLayout.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const stored = localStorage.getItem(LSK_MINIMIZED_CARDS);
                try {
                    return stored ? JSON.parse(stored) : [];
                } catch (e) {
                    console.error(`Error parsing ${LSK_MINIMIZED_CARDS} from localStorage`, e);
                    return [];
                }
            }
            return [];
        }
    }["BaseDashboardLayout.useState"]);
    const [maximizedCard, setMaximizedCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pinnedCards, setPinnedCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BaseDashboardLayout.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const stored = localStorage.getItem(LSK_PINNED_CARDS);
                try {
                    return stored ? JSON.parse(stored) : [];
                } catch (e) {
                    console.error(`Error parsing ${LSK_PINNED_CARDS} from localStorage`, e);
                    return [];
                }
            }
            return [];
        }
    }["BaseDashboardLayout.useState"]);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BaseDashboardLayout.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const stored = localStorage.getItem(LSK_NOTIFICATIONS);
                try {
                    return stored ? JSON.parse(stored) : initialNotifications;
                } catch (e) {
                    console.error(`Error parsing ${LSK_NOTIFICATIONS} from localStorage`, e);
                    return initialNotifications;
                }
            }
            return initialNotifications;
        }
    }["BaseDashboardLayout.useState"]);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalContent, setModalContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalTitle, setModalTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Details");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // State for Right Communication Sidebar & Chat Popup
    const [rightSidebarExpanded, setRightSidebarExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeChatUser, setActiveChatUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isChatPopupOpen, setIsChatPopupOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const userMenuItems = [
        {
            title: "Profile",
            action: ()=>router.push('/profile')
        },
        {
            title: "Settings",
            action: ()=>router.push('/settings')
        },
        {
            title: "Logout",
            action: ()=>router.push('/logout')
        }
    ];
    // --- Effects for localStorage ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseDashboardLayout.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) localStorage.setItem(LSK_MINIMIZED_CARDS, JSON.stringify(minimizedCards));
        }
    }["BaseDashboardLayout.useEffect"], [
        minimizedCards,
        LSK_MINIMIZED_CARDS
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseDashboardLayout.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) localStorage.setItem(LSK_PINNED_CARDS, JSON.stringify(pinnedCards));
        }
    }["BaseDashboardLayout.useEffect"], [
        pinnedCards,
        LSK_PINNED_CARDS
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseDashboardLayout.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) localStorage.setItem(LSK_NOTIFICATIONS, JSON.stringify(notifications));
        }
    }["BaseDashboardLayout.useEffect"], [
        notifications,
        LSK_NOTIFICATIONS
    ]);
    // --- Helper Functions ---
    const toggleSidebar = ()=>setSidebarExpanded(!sidebarExpanded);
    const toggleMinimizeCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseDashboardLayout.useCallback[toggleMinimizeCard]": (cardId)=>{
            setMinimizedCards({
                "BaseDashboardLayout.useCallback[toggleMinimizeCard]": (prev)=>prev.includes(cardId) ? prev.filter({
                        "BaseDashboardLayout.useCallback[toggleMinimizeCard]": (id)=>id !== cardId
                    }["BaseDashboardLayout.useCallback[toggleMinimizeCard]"]) : [
                        ...prev,
                        cardId
                    ]
            }["BaseDashboardLayout.useCallback[toggleMinimizeCard]"]);
            if (maximizedCard === cardId) setMaximizedCard(null);
        }
    }["BaseDashboardLayout.useCallback[toggleMinimizeCard]"], [
        maximizedCard
    ]);
    const toggleMaximizeCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseDashboardLayout.useCallback[toggleMaximizeCard]": (cardId)=>{
            setMaximizedCard({
                "BaseDashboardLayout.useCallback[toggleMaximizeCard]": (prev)=>prev === cardId ? null : cardId
            }["BaseDashboardLayout.useCallback[toggleMaximizeCard]"]);
            setMinimizedCards({
                "BaseDashboardLayout.useCallback[toggleMaximizeCard]": (prev)=>prev.filter({
                        "BaseDashboardLayout.useCallback[toggleMaximizeCard]": (id)=>id !== cardId
                    }["BaseDashboardLayout.useCallback[toggleMaximizeCard]"])
            }["BaseDashboardLayout.useCallback[toggleMaximizeCard]"]);
        }
    }["BaseDashboardLayout.useCallback[toggleMaximizeCard]"], []);
    const restoreCardFromMinimized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseDashboardLayout.useCallback[restoreCardFromMinimized]": (cardId)=>{
            setMinimizedCards({
                "BaseDashboardLayout.useCallback[restoreCardFromMinimized]": (prev)=>prev.filter({
                        "BaseDashboardLayout.useCallback[restoreCardFromMinimized]": (id)=>id !== cardId
                    }["BaseDashboardLayout.useCallback[restoreCardFromMinimized]"])
            }["BaseDashboardLayout.useCallback[restoreCardFromMinimized]"]);
        }
    }["BaseDashboardLayout.useCallback[restoreCardFromMinimized]"], []);
    const togglePinCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseDashboardLayout.useCallback[togglePinCard]": (cardId)=>{
            setPinnedCards({
                "BaseDashboardLayout.useCallback[togglePinCard]": (prev)=>prev.includes(cardId) ? prev.filter({
                        "BaseDashboardLayout.useCallback[togglePinCard]": (id)=>id !== cardId
                    }["BaseDashboardLayout.useCallback[togglePinCard]"]) : [
                        ...prev,
                        cardId
                    ]
            }["BaseDashboardLayout.useCallback[togglePinCard]"]);
        }
    }["BaseDashboardLayout.useCallback[togglePinCard]"], []);
    const markAllNotificationsAsRead = ()=>setNotifications((prev)=>prev.map((n)=>({
                    ...n,
                    read: true
                })));
    const showCustomModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseDashboardLayout.useCallback[showCustomModal]": (content, title = "Details")=>{
            setModalContent(content);
            setModalTitle(title);
            setIsModalOpen(true);
        }
    }["BaseDashboardLayout.useCallback[showCustomModal]"], []);
    const hideCustomModal = ()=>{
        setIsModalOpen(false);
        setModalContent(null);
    };
    const handleNavClick = (title)=>{
        setActiveSection(title);
        setMaximizedCard(null);
    };
    const handleViewAllNotifications = ()=>{
        handleNavClick("Notifications"); // Assuming "Notifications" is a valid navItem title
    };
    // --- Communication Action Handlers ---
    const handleStartWebRTCCall = (user)=>{
        alert(`Starting WebRTC call with ${user.name} (Placeholder)`);
        console.log("Initiate WebRTC call with:", user);
    };
    const handleOpenTextMessenger = (user)=>{
        setActiveChatUser(user);
        setIsChatPopupOpen(true);
        console.log("Open text messenger with:", user);
    };
    const handleInitiateBusinessCall = (user)=>{
        alert(`Initiating business call with ${user.name} (Custom Logic Placeholder)`);
        console.log("Initiate Business Call (custom logic) with:", user);
    };
    const closeChatPopup = ()=>{
        setIsChatPopupOpen(false);
        setActiveChatUser(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-87a79dc27c256c5f" + " " + "flex h-screen bg-gray-100 text-gray-800 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeftSidebar, {
                tenant: tenant,
                isExpanded: sidebarExpanded,
                onToggle: toggleSidebar,
                navItems: navItems,
                activeSection: activeSection,
                onNavClick: handleNavClick,
                minimizedCards: minimizedCards,
                dashboardCards: dashboardCards,
                onRestoreCard: restoreCardFromMinimized,
                footerContent: sidebarFooterContent
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-87a79dc27c256c5f" + " " + "flex-1 flex flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        tenant: tenant,
                        activeSection: activeSection,
                        notifications: notifications,
                        onMarkAllNotificationsRead: markAllNotificationsAsRead,
                        onViewAllNotifications: handleViewAllNotifications,
                        userMenuItems: userMenuItems,
                        onUserMenuItemClick: (action)=>action(),
                        headerRightContent: headerRightContent,
                        pinnedCards: pinnedCards,
                        dashboardCards: dashboardCards,
                        onTogglePinCard: togglePinCard,
                        isLeftSidebarExpanded: sidebarExpanded
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "jsx-87a79dc27c256c5f" + " " + "flex-1 p-4 sm:p-6 overflow-auto bg-gray-50 custom-scrollbar",
                        children: renderMainContent({
                            activeSection,
                            tenant,
                            dashboardCards,
                            minimizedCards,
                            maximizedCard,
                            pinnedCards,
                            toggleMinimizeCard,
                            toggleMaximizeCard,
                            togglePinCard,
                            showCustomModal,
                            setActiveSection: handleNavClick
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-87a79dc27c256c5f" + " " + `border-l border-gray-200 shadow-lg flex flex-col transition-all duration-300 ease-in-out z-30
                    ${rightSidebarExpanded ? 'w-72' : 'w-0 opacity-0 pointer-events-none'}`,
                children: rightSidebarExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RightCommunicationSidebar, {
                    onStartWebRTCCall: handleStartWebRTCCall,
                    onOpenTextMessenger: handleOpenTextMessenger,
                    onInitiateBusinessCall: handleInitiateBusinessCall
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setRightSidebarExpanded(!rightSidebarExpanded),
                style: {
                    right: rightSidebarExpanded ? '288px' : '0px',
                    width: '28px',
                    height: '44px'
                },
                title: rightSidebarExpanded ? "Hide Messenger" : "Show Messenger",
                className: "jsx-87a79dc27c256c5f" + " " + "fixed top-16 bg-indigo-600 text-white p-0 rounded-l-md shadow-lg hover:bg-indigo-700 z-40 transition-all duration-300 ease-in-out flex items-center justify-center",
                children: rightSidebarExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                    lineNumber: 236,
                    columnNumber: 33
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                    lineNumber: 236,
                    columnNumber: 62
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomModal, {
                isOpen: isModalOpen,
                onClose: hideCustomModal,
                title: modalTitle,
                content: modalContent
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextMessengerPopup, {
                isOpen: isChatPopupOpen,
                user: activeChatUser,
                onClose: closeChatPopup,
                isRightSidebarExpanded: rightSidebarExpanded
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "87a79dc27c256c5f",
                children: '.bg-sidebar{background-color:#1f2937}.text-sidebar-foreground{color:#e5e7eb}.border-sidebar-border{border-color:#374151}.hover\\\\:bg-sidebar-hover:hover{background-color:#374151}.hover\\\\:text-sidebar-foreground-hover:hover{color:#fff}.bg-sidebar-active{background-color:#4f46e5}.text-sidebar-muted-foreground{color:#9ca3af}.custom-scrollbar::-webkit-scrollbar{width:6px;height:6px}.custom-scrollbar::-webkit-scrollbar-track{background:0 0}.custom-scrollbar::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#9ca3af}.custom-scrollbar{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent}.switch{width:34px;height:20px;display:inline-block;position:relative}.switch input{opacity:0;width:0;height:0}.slider{cursor:pointer;background-color:#ccc;transition:all .4s;position:absolute;inset:0}.slider:before{content:"";background-color:#fff;width:12px;height:12px;transition:all .4s;position:absolute;bottom:4px;left:4px}input:checked+.slider{background-color:#4f46e5}input:checked+.slider:before{transform:translate(14px)}.slider.round{border-radius:20px}.slider.round:before{border-radius:50%}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
_s(BaseDashboardLayout, "ti33HgNX8pIL+oJebdC4r4ezdKU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BaseDashboardLayout;
var _c;
__turbopack_context__.k.register(_c, "BaseDashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/dashboard/quickboard/QuickBoardComponent.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
;
;
const QuickBoardComponent = ({ showCustomModal, plugins, userRoles })=>{
    const authorizedPlugins = plugins.filter((plugin)=>plugin.roles.some((role)=>userRoles.includes(role)));
    if (authorizedPlugins.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 text-center text-gray-500",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No Quick Board items available for your role."
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6 p-4 md:p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
            children: authorizedPlugins.map((plugin)=>{
                // Prepare props for the component
                const componentProps = {
                    showCustomModal,
                    ...plugin.props
                };
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b flex justify-between items-center bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-gray-700",
                                    children: plugin.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>showCustomModal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Content for ",
                                                            plugin.title,
                                                            " could be displayed here in a modal."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                                        lineNumber: 46,
                                                        columnNumber: 25
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "This could be a different view or settings for the plugin."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                                        lineNumber: 47,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                                lineNumber: 45,
                                                columnNumber: 23
                                            }, void 0), `Options for ${plugin.title}`),
                                        className: "p-1 rounded hover:bg-gray-200 text-gray-600",
                                        title: `More options for ${plugin.title}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                            lineNumber: 54,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                        lineNumber: 43,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                    lineNumber: 42,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                            lineNumber: 40,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(plugin.component, {
                                ...componentProps
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                lineNumber: 60,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this)
                    ]
                }, plugin.id, true, {
                    fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                    lineNumber: 39,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
};
_c = QuickBoardComponent;
const __TURBOPACK__default__export__ = QuickBoardComponent;
var _c;
__turbopack_context__.k.register(_c, "QuickBoardComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/modules/user/services.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchUserCount": (()=>fetchUserCount)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$index$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/client/index-browser.js [app-client] (ecmascript)");
;
const prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$index$2d$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrismaClient"]();
const fetchUserCount = async ()=>{
    console.log('Mock fetchUserCount called');
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const count = Math.floor(Math.random() * 1000) + 500;
            resolve(count);
        }, 700);
    });
}; // You can add other user-related service functions here
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// To make ManyChatControlQuickBoardPlugin runnable:
/// src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// The path below should be correct if your services file is at src/modules/user/services/services.ts
// PLEASE VERIFY THIS PATH MATCHES YOUR ACTUAL FILE STRUCTURE
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/user/services.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const UserCountQuickBoardPlugin = ({ showCustomModal })=>{
    _s();
    const [userCount, setUserCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleFetchClick = async ()=>{
        setIsLoading(true);
        setError(null);
        setUserCount(null);
        try {
            const count = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUserCount"])();
            setUserCount(count);
        } catch (err) {
            console.error('Error fetching user count:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch user count.');
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleFetchClick,
                disabled: isLoading,
                style: {
                    marginBottom: '10px'
                },
                children: isLoading ? 'Fetching...' : 'Fetch User Count'
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: 'red'
                },
                children: [
                    "Error: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx",
                lineNumber: 37,
                columnNumber: 17
            }, this),
            userCount !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "User Count: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: userCount
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx",
                        lineNumber: 38,
                        columnNumber: 45
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx",
                lineNumber: 38,
                columnNumber: 30
            }, this),
            !isLoading && userCount === null && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Click the button to fetch count."
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx",
                lineNumber: 39,
                columnNumber: 54
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
};
_s(UserCountQuickBoardPlugin, "C8kB92O1R1K1rtFJWk/MOIybDxs=");
_c = UserCountQuickBoardPlugin;
const __TURBOPACK__default__export__ = UserCountQuickBoardPlugin;
var _c;
__turbopack_context__.k.register(_c, "UserCountQuickBoardPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/modules/marketing/plugins/ManyChatControlPlugin.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/modules/marketing/plugins/ManyChatControlPlugin.ts
// Core Logic : This will contain the function(s) to interact with ManyChat.
/**
 * Placeholder class for ManyChat control functionality.
 * Replace with actual ManyChat API integration logic.
 */ __turbopack_context__.s({
    "ManyChatControlPlugin": (()=>ManyChatControlPlugin),
    "manyChatControl": (()=>manyChatControl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
class ManyChatControlPlugin {
    apiKey;
    constructor(apiKey){
        this.apiKey = apiKey;
        // For client-side, console.log of API key (even if masked) is generally not recommended.
        // Consider removing or logging only if a key is present, without revealing the key itself.
        console.log("ManyChatControlPlugin initialized:", apiKey ? "with API Key" : "without API Key");
    }
    /**
   * Placeholder function to send a message via ManyChat.
   * @param subscriberId The ManyChat subscriber ID.
   * @param message The message content.
   * @returns A promise resolving with the result of the operation.
   */ async sendMessage(subscriberId, message) {
        if (!this.apiKey) {
            console.warn("ManyChatControlPlugin: API Key not configured. Cannot send message.");
            return Promise.resolve({
                success: false,
                message: "API Key not configured."
            });
        }
        console.log(`Attempting to send message to subscriber ${subscriberId} with API Key (first 5 chars): ${this.apiKey.substring(0, 5)}...: "${message}"`);
        // TODO: Implement actual ManyChat API call here
        // Example:
        // const response = await fetch(`https://api.manychat.com/fb/sending/sendContent`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${this.apiKey}`
        //   },
        //   body: JSON.stringify({ subscriber_id: subscriberId, data: { version: "v2", content: { type: "text", text: message } } })
        // });
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(`ManyChat API Error: ${errorData.message || response.statusText}`);
        // }
        // return response.json();
        // Simulating API call
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        return Promise.resolve({
            success: true,
            message: `Message supposedly sent to ${subscriberId}.`
        });
    }
    /**
   * Placeholder function to tag a subscriber in ManyChat.
   * @param subscriberId The ManyChat subscriber ID.
   * @param tag The tag to apply.
   * @returns A promise resolving with the result of the operation.
   */ async tagSubscriber(subscriberId, tag) {
        if (!this.apiKey) {
            console.warn("ManyChatControlPlugin: API Key not configured. Cannot tag subscriber.");
            return Promise.resolve({
                success: false,
                message: "API Key not configured."
            });
        }
        console.log(`Attempting to tag subscriber ${subscriberId} with tag: "${tag}"`);
        // TODO: Implement actual ManyChat API call here
        // Example:
        // const response = await fetch(`https://api.manychat.com/fb/subscriber/addTagToSubscriber`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${this.apiKey}`
        //   },
        //   body: JSON.stringify({ subscriber_id: subscriberId, tag_name: tag }) // or tag_id if you have it
        // });
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(`ManyChat API Error: ${errorData.message || response.statusText}`);
        // }
        // return response.json();
        // Simulating API call
        await new Promise((resolve)=>setTimeout(resolve, 800));
        return Promise.resolve({
            success: true,
            message: `Subscriber ${subscriberId} supposedly tagged with "${tag}".`
        });
    }
}
// --- Singleton Instance ---
// IMPORTANT: Managing API keys on the client-side.
// process.env.MANYCHAT_API_KEY will likely NOT work directly in a standard client-side React app
// unless you use a build tool (like Vite or Create React App) that specifically
// handles environment variables (e.g., REACT_APP_MANYCHAT_API_KEY or VITE_MANYCHAT_API_KEY).
// For this example, we'll assume it's somehow made available or hardcode a placeholder.
// In a real app, this API key should ideally be used on a backend, and the frontend
// would call your backend, which then uses the key to talk to ManyChat.
// If you MUST use it client-side, ensure it's a key with limited permissions.
const manyChatApiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_MANYCHAT_API_KEY || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VITE_MANYCHAT_API_KEY || "YOUR_FALLBACK_MANYCHAT_API_KEY_HERE";
if (manyChatApiKey === "YOUR_FALLBACK_MANYCHAT_API_KEY_HERE") {
    console.warn("ManyChatControlPlugin: Using fallback API Key. Please configure a proper API key in your environment variables (e.g., VITE_MANYCHAT_API_KEY).");
}
const manyChatControl = new ManyChatControlPlugin(manyChatApiKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
//src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx
//QuickBoard UI Plugin - This React component will provide the button and call the core logic.
// src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$marketing$2f$plugins$2f$ManyChatControlPlugin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/marketing/plugins/ManyChatControlPlugin.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const ManyChatControlQuickBoardPlugin = ({ showCustomModal })=>{
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [responseMessage, setResponseMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subscriberId, setSubscriberId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('test_subscriber_123'); // Default for testing
    const [messageText, setMessageText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Hello from QuickBoard!'); // Default
    const [tagName, setTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('quickboard_test_tag'); // Default
    const handleSendMessage = async ()=>{
        if (!subscriberId || !messageText) {
            setError("Subscriber ID and Message Text are required.");
            return;
        }
        setIsLoading(true);
        setResponseMessage(null);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$marketing$2f$plugins$2f$ManyChatControlPlugin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["manyChatControl"].sendMessage(subscriberId, messageText);
            if (response.success) {
                setResponseMessage(response.message);
            // Optionally use showCustomModal for success
            // if (showCustomModal) showCustomModal(<p>{response.message}</p>, "Message Sent");
            } else {
                setError(response.message);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while sending message.';
            setError(errorMessage);
            if (showCustomModal) showCustomModal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: 'red'
                },
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                lineNumber: 41,
                columnNumber: 44
            }, this), "Send Error");
        } finally{
            setIsLoading(false);
        }
    };
    const handleTagSubscriber = async ()=>{
        if (!subscriberId || !tagName) {
            setError("Subscriber ID and Tag Name are required.");
            return;
        }
        setIsLoading(true);
        setResponseMessage(null);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$marketing$2f$plugins$2f$ManyChatControlPlugin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["manyChatControl"].tagSubscriber(subscriberId, tagName);
            if (response.success) {
                setResponseMessage(response.message);
            } else {
                setError(response.message);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while tagging subscriber.';
            setError(errorMessage);
            if (showCustomModal) showCustomModal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: 'red'
                },
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                lineNumber: 65,
                columnNumber: 44
            }, this), "Tagging Error");
        } finally{
            setIsLoading(false);
        }
    };
    const inputStyle = {
        marginRight: '10px',
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: 'calc(50% - 15px)'
    };
    const buttonStyle = {
        padding: '8px 15px',
        marginRight: '10px',
        cursor: 'pointer'
    };
    return(// The main title is handled by QuickBoardComponent
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '15px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "mc_subscriberId",
                        style: {
                            marginRight: '5px',
                            display: 'block',
                            marginBottom: '5px'
                        },
                        children: "Subscriber ID:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "mc_subscriberId",
                        type: "text",
                        value: subscriberId,
                        onChange: (e)=>setSubscriberId(e.target.value),
                        placeholder: "Enter Subscriber ID",
                        style: {
                            ...inputStyle,
                            width: 'calc(100% - 20px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid #eee',
                    paddingTop: '15px',
                    marginBottom: '15px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                        style: {
                            marginTop: 0,
                            marginBottom: '10px'
                        },
                        children: "Send Message"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: messageText,
                        onChange: (e)=>setMessageText(e.target.value),
                        placeholder: "Message text",
                        style: inputStyle
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSendMessage,
                        disabled: isLoading || !subscriberId || !messageText,
                        style: buttonStyle,
                        children: isLoading ? 'Sending...' : 'Send Message'
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: '1px solid #eee',
                    paddingTop: '15px',
                    marginBottom: '5px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                        style: {
                            marginTop: 0,
                            marginBottom: '10px'
                        },
                        children: "Tag Subscriber"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: tagName,
                        onChange: (e)=>setTagName(e.target.value),
                        placeholder: "Tag name",
                        style: inputStyle
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleTagSubscriber,
                        disabled: isLoading || !subscriberId || !tagName,
                        style: buttonStyle,
                        children: isLoading ? 'Tagging...' : 'Apply Tag'
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            responseMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: 'green',
                    marginTop: '10px'
                },
                children: responseMessage
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                lineNumber: 129,
                columnNumber: 27
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: 'red',
                    marginTop: '10px'
                },
                children: [
                    "Error: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
                lineNumber: 130,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this));
};
_s(ManyChatControlQuickBoardPlugin, "gKte5N+Hyet5oZhf/orRuQf/lC0=");
_c = ManyChatControlQuickBoardPlugin;
const __TURBOPACK__default__export__ = ManyChatControlQuickBoardPlugin;
var _c;
__turbopack_context__.k.register(_c, "ManyChatControlQuickBoardPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$ManyChatControlQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx [app-client] (ecmascript)"); // The full UI plugin
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>"); // Or any icon you prefer
;
;
;
const LaunchManyChatControlPlugin = ({ showCustomModal, buttonLabel = "Open ManyChat Controls", modalTitle = "ManyChat Control Panel" // Default modal title
 })=>{
    const handleOpenModal = ()=>{
        showCustomModal(// Pass showCustomModal again, in case the inner component needs it
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$ManyChatControlQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            showCustomModal: showCustomModal
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this), modalTitle);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            textAlign: 'center',
            padding: '10px 0'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleOpenModal,
            // Example Tailwind styling, adjust as needed
            className: "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm flex items-center justify-center gap-2 transition-colors duration-150 ease-in-out",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                buttonLabel
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
};
_c = LaunchManyChatControlPlugin;
const __TURBOPACK__default__export__ = LaunchManyChatControlPlugin;
var _c;
__turbopack_context__.k.register(_c, "LaunchManyChatControlPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/DashboardLayoutClient.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/dashboard/DashboardLayoutClient.tsx
__turbopack_context__.s({
    "default": (()=>DashboardLayoutClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-client] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$BaseDashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/BaseDashboardLayout.tsx [app-client] (ecmascript)");
// Import QuickBoard and its types/plugins
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$QuickBoardComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx [app-client] (ecmascript)");
// --- IMPORT YOUR EXISTING QUICKBOARD PLUGINS ---
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$UserCountQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$ManyChatControlQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$LaunchManyChatControlPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const appModules = [
    {
        id: 'sales',
        name: 'Sales',
        navTitle: '🏷️ Sales',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 55,
            columnNumber: 11
        }, this),
        purpose: 'Customer-facing processes like registration, booking, orders.',
        submodules: [
            {
                id: 'sales-registration',
                name: 'Registration Booking',
                purpose: 'Handle new client registrations and initial bookings.'
            },
            {
                id: 'sales-orders',
                name: 'Orders',
                purpose: 'Manage and track customer orders.'
            },
            {
                id: 'sales-client-history',
                name: 'Client History',
                purpose: 'View past interactions and purchases of clients.'
            },
            {
                id: 'sales-agent-management',
                name: 'Agent Management',
                purpose: 'Oversee sales agents and their performance.'
            }
        ]
    },
    {
        id: 'marketing',
        name: 'Marketing',
        navTitle: '📢 Marketing',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 68,
            columnNumber: 11
        }, this),
        purpose: 'Campaigns, outreach, CRM, integrations (ManyChat, email, FB).',
        submodules: [
            {
                id: 'marketing-social-campaigns',
                name: 'Social Campaigns (ManyChat)',
                purpose: 'Manage social media campaigns, e.g., via ManyChat.',
                pluginDefinition: 'manychatControlEmbedded'
            },
            {
                id: 'marketing-email-blasts',
                name: 'Email Blasts',
                purpose: 'Send out mass email communications.'
            },
            {
                id: 'marketing-meta-ads',
                name: 'Meta Ads',
                purpose: 'Manage advertising campaigns on Meta platforms.'
            },
            {
                id: 'marketing-campaign-performance',
                name: 'Campaign Performance',
                purpose: 'Track and analyze the effectiveness of marketing campaigns.'
            }
        ]
    },
    {
        id: 'accounting',
        name: 'Accounting',
        navTitle: '🧾 Accounting',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 81,
            columnNumber: 11
        }, this),
        purpose: 'Financial tracking: invoices, bank reconciliation, transactions.',
        submodules: [
            {
                id: 'accounting-bank-statements',
                name: 'Bank Statements',
                purpose: 'View and manage bank statements.'
            },
            {
                id: 'accounting-reconciliation',
                name: 'Reconciliation',
                purpose: 'Reconcile financial accounts.'
            },
            {
                id: 'accounting-payment-logs',
                name: 'Payment Logs',
                purpose: 'Track all payment transactions.'
            },
            {
                id: 'accounting-invoicing',
                name: 'Invoicing',
                purpose: 'Create and manage invoices.'
            }
        ]
    },
    {
        id: 'productBuilder',
        name: 'Product Builder',
        navTitle: '🛠️ Product Builder',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 94,
            columnNumber: 11
        }, this),
        purpose: 'Creation/assembly of travel products and experiences.',
        submodules: [
            {
                id: 'pb-create-trips',
                name: 'Create Trips',
                purpose: 'Design and define new travel itineraries.'
            },
            {
                id: 'pb-configure-packages',
                name: 'Configure Packages',
                purpose: 'Assemble services into sellable packages.'
            },
            {
                id: 'pb-define-services',
                name: 'Define Services',
                purpose: 'Manage individual services offered.'
            },
            {
                id: 'pb-price-management',
                name: 'Price Management',
                purpose: 'Set and adjust pricing for products and services.'
            }
        ]
    },
    {
        id: 'salesInventory',
        name: 'Sales Inventory',
        navTitle: '🛍️ Sales Inventory',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 107,
            columnNumber: 11
        }, this),
        purpose: 'Stock of ready-to-sell packages and configured services/products.',
        submodules: [
            {
                id: 'si-stock-overview',
                name: 'Stock Overview',
                purpose: 'View current levels of sellable items.'
            },
            {
                id: 'si-availability-calendar',
                name: 'Availability Calendar',
                purpose: 'Check availability of products/services over time.'
            },
            {
                id: 'si-seasonal-inventory',
                name: 'Seasonal Inventory',
                purpose: 'Manage inventory adjustments for different seasons.'
            },
            {
                id: 'si-status-updates',
                name: 'Status Updates',
                purpose: 'Track and update the status of inventory items.'
            }
        ]
    },
    {
        id: 'assets',
        name: 'Assets',
        navTitle: '📦 Assets',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 120,
            columnNumber: 11
        }, this),
        purpose: 'Physical warehouse materials (SIMs, gear, print items, etc.).',
        submodules: [
            {
                id: 'assets-physical-items',
                name: 'Physical Items',
                purpose: 'Track individual physical assets.'
            },
            {
                id: 'assets-serial-tracking',
                name: 'Serial Tracking',
                purpose: 'Manage items by serial number.'
            },
            {
                id: 'assets-restocking',
                name: 'Restocking',
                purpose: 'Handle the process of replenishing stock.'
            },
            {
                id: 'assets-usage-logs',
                name: 'Usage Logs',
                purpose: 'Log the usage of assets.'
            }
        ]
    },
    {
        id: 'suppliers',
        name: 'Suppliers',
        navTitle: '🚚 Suppliers',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this),
        purpose: 'Registered vendors providing services or materials.',
        submodules: [
            {
                id: 'sup-directory',
                name: 'Supplier Directory',
                purpose: 'View and manage supplier profiles.',
                pluginDefinition: 'supplierDirectory'
            },
            {
                id: 'sup-contracts',
                name: 'Contracts & Terms',
                purpose: 'Store agreements, rates, service scopes.',
                pluginDefinition: 'supplierContracts'
            },
            {
                id: 'sup-ratings',
                name: 'Performance Ratings',
                purpose: 'Rate/review suppliers based on service quality.',
                pluginDefinition: 'supplierRatings'
            },
            {
                id: 'sup-payment-setup',
                name: 'Payment Setup',
                purpose: 'Bank details, payment preferences, tax info.',
                pluginDefinition: 'supplierPaymentSetup'
            }
        ]
    },
    {
        id: 'customers',
        name: 'Customers',
        navTitle: '👥 Customers',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, this),
        purpose: 'Registered clients with booking/interactions and CRM history.',
        submodules: [
            {
                id: 'cust-directory',
                name: 'Customer Directory',
                purpose: 'View/edit client profiles.',
                pluginDefinition: 'customerDirectory'
            },
            {
                id: 'cust-notes',
                name: 'Notes & Tags',
                purpose: 'Add internal notes, tag clients.',
                pluginDefinition: 'customerNotes'
            },
            {
                id: 'cust-interaction-log',
                name: 'Interaction History',
                purpose: 'View logs of communications and activity.',
                pluginDefinition: 'customerInteractionLog'
            },
            {
                id: 'cust-preferences',
                name: 'Loyalty & Preferences',
                purpose: 'Store loyalty levels, preferences, special requests.',
                pluginDefinition: 'customerPreferences'
            }
        ]
    }
];
// --- END MODULE AND SUBMODULE DEFINITIONS ---
// --- PLACEHOLDER QUICKBOARD PLUGINS FOR SUBMODULES ---
const createPlaceholderPlugin = (pluginId, pluginName)=>{
    const PlaceholderComponent = ({ showCustomModal })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold",
                    children: [
                        "Placeholder: ",
                        pluginName
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 164,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-600",
                    children: [
                        "Plugin ID: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            children: pluginId
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 165,
                            columnNumber: 55
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 165,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2",
                    children: [
                        "This is a placeholder component for the ",
                        pluginName,
                        " plugin. Full functionality would be implemented here."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 166,
                    columnNumber: 7
                }, this),
                showCustomModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>showCustomModal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                "Detailed content for ",
                                pluginName,
                                " from placeholder."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 169,
                            columnNumber: 42
                        }, void 0), `${pluginName} - Detail View`),
                    className: "mt-3 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm",
                    children: "Show Detail Modal Example"
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
            lineNumber: 163,
            columnNumber: 5
        }, this);
    PlaceholderComponent.displayName = `PlaceholderPlugin(${pluginName.replace(/\s+/g, '')})`;
    return PlaceholderComponent;
};
// Supplier Module Plugins
const SupplierDirectoryQuickBoardPlugin = createPlaceholderPlugin('supplierDirectory', 'Supplier Directory');
const SupplierContractsQuickBoardPlugin = createPlaceholderPlugin('supplierContracts', 'Supplier Contracts & Terms');
const SupplierRatingsQuickBoardPlugin = createPlaceholderPlugin('supplierRatings', 'Supplier Performance Ratings');
const SupplierPaymentSetupQuickBoardPlugin = createPlaceholderPlugin('supplierPaymentSetup', 'Supplier Payment Setup');
// Customer Module Plugins
const CustomerDirectoryQuickBoardPlugin = createPlaceholderPlugin('customerDirectory', 'Customer Directory');
const CustomerNotesQuickBoardPlugin = createPlaceholderPlugin('customerNotes', 'Customer Notes & Tags');
const CustomerInteractionLogQuickBoardPlugin = createPlaceholderPlugin('customerInteractionLog', 'Customer Interaction History');
const CustomerPreferencesQuickBoardPlugin = createPlaceholderPlugin('customerPreferences', 'Customer Loyalty & Preferences');
function DashboardLayoutClient({ tenant, initialDashboardContent }) {
    const tenantType = 'client';
    // --- NAVIGATION ITEMS ---
    const moduleNavItems = appModules.map((module)=>({
            icon: module.icon,
            title: module.navTitle
        }));
    const staticTopNavItems = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 212,
                columnNumber: 13
            }, this),
            title: 'Overview'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 213,
                columnNumber: 13
            }, this),
            title: 'Quick Board'
        }
    ];
    const staticBottomNavItems = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 217,
                columnNumber: 13
            }, this),
            title: 'My Account'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 218,
                columnNumber: 13
            }, this),
            title: 'Notifications'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 219,
                columnNumber: 13
            }, this),
            title: 'Settings'
        }
    ];
    const navItems = [
        ...staticTopNavItems,
        ...moduleNavItems,
        // Consider how to best integrate bottom items if BaseDashboardLayout supports sections
        // For now, they are just appended. BaseDashboardLayout might render them all in one list.
        ...staticBottomNavItems
    ];
    const clientDashboardCards = [
        {
            id: 'client-card-1',
            title: 'Global Analytics',
            color: 'bg-blue-100'
        },
        {
            id: 'client-card-2',
            title: 'Team Tasks',
            color: 'bg-green-100'
        }
    ];
    const initialNotifications = [
        {
            id: 'client-notif-1',
            text: `Welcome to ${tenant.name}'s client dashboard!`,
            read: false,
            timestamp: new Date().toISOString()
        }
    ];
    const getCurrentUserRoles = ()=>{
        // In a real app, this would come from auth context or similar
        return [
            'admin',
            'marketing_user',
            'analyst_user',
            'procurement_user',
            'sales_user',
            'support_user'
        ];
    };
    const currentUserRoles = getCurrentUserRoles();
    // --- DEFINE AVAILABLE QUICKBOARD PLUGINS ---
    const availableQuickBoardPlugins = [
        {
            id: 'userCount',
            title: 'User Statistics',
            component: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$UserCountQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            roles: [
                'admin',
                'analyst_user'
            ]
        },
        {
            id: 'launchManyChatPanel',
            title: 'ManyChat Actions',
            component: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$LaunchManyChatControlPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            roles: [
                'admin',
                'marketing_user'
            ],
            props: {
                buttonLabel: "Open ManyChat Panel",
                modalTitle: "ManyChat Control Center"
            }
        },
        // This is the actual ManyChat control panel that can be embedded or launched by LaunchManyChatControlPlugin
        {
            id: 'manychatControlEmbedded',
            title: 'Embedded ManyChat Controls',
            component: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$ManyChatControlQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            roles: [
                'admin',
                'marketing_user'
            ]
        },
        // Supplier Module Plugins
        {
            id: 'supplierDirectory',
            title: 'Supplier Directory',
            component: SupplierDirectoryQuickBoardPlugin,
            roles: [
                'admin',
                'procurement_user'
            ]
        },
        {
            id: 'supplierContracts',
            title: 'Supplier Contracts',
            component: SupplierContractsQuickBoardPlugin,
            roles: [
                'admin',
                'procurement_user'
            ]
        },
        {
            id: 'supplierRatings',
            title: 'Supplier Ratings',
            component: SupplierRatingsQuickBoardPlugin,
            roles: [
                'admin',
                'procurement_user'
            ]
        },
        {
            id: 'supplierPaymentSetup',
            title: 'Supplier Payment Setup',
            component: SupplierPaymentSetupQuickBoardPlugin,
            roles: [
                'admin',
                'procurement_user'
            ]
        },
        // Customer Module Plugins
        {
            id: 'customerDirectory',
            title: 'Customer Directory',
            component: CustomerDirectoryQuickBoardPlugin,
            roles: [
                'admin',
                'sales_user',
                'support_user'
            ]
        },
        {
            id: 'customerNotes',
            title: 'Customer Notes & Tags',
            component: CustomerNotesQuickBoardPlugin,
            roles: [
                'admin',
                'sales_user',
                'support_user'
            ]
        },
        {
            id: 'customerInteractionLog',
            title: 'Customer Interaction Log',
            component: CustomerInteractionLogQuickBoardPlugin,
            roles: [
                'admin',
                'sales_user',
                'support_user'
            ]
        },
        {
            id: 'customerPreferences',
            title: 'Customer Preferences',
            component: CustomerPreferencesQuickBoardPlugin,
            roles: [
                'admin',
                'sales_user',
                'support_user'
            ]
        }
    ];
    const renderMainContent = ({ activeSection, // dashboardCards, // Not used if 'Main Board' is removed or handled differently
    // minimizedCards, maximizedCard, pinnedCards, // Related to 'Main Board'
    // toggleMinimizeCard, toggleMaximizeCard, togglePinCard, // Related to 'Main Board'
    showCustomModal })=>{
        const activeModule = appModules.find((module)=>module.navTitle === activeSection);
        if (activeModule) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 sm:p-6 rounded-lg shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl mr-2",
                                children: activeModule.icon
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-gray-800",
                                children: activeModule.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6 ml-10",
                        children: activeModule.purpose
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-gray-700 mb-4",
                        children: "Submodules"
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                        lineNumber: 304,
                        columnNumber: 11
                    }, this),
                    activeModule.submodules.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: activeModule.submodules.map((submodule)=>{
                            const qbPlugin = availableQuickBoardPlugins.find((p)=>p.id === submodule.pluginDefinition);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-lg font-medium text-gray-700 mb-1",
                                        children: submodule.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                        lineNumber: 311,
                                        columnNumber: 21
                                    }, this),
                                    submodule.purpose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mb-2",
                                        children: submodule.purpose
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                        lineNumber: 312,
                                        columnNumber: 43
                                    }, this),
                                    submodule.pluginDefinition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 mb-2",
                                        children: [
                                            "Plugin ID: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                children: submodule.pluginDefinition
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                                lineNumber: 315,
                                                columnNumber: 36
                                            }, this),
                                            qbPlugin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-600 ml-1 font-semibold",
                                                children: "(✓ Plugin Ready)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                                lineNumber: 316,
                                                columnNumber: 37
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-orange-500 ml-1",
                                                children: "(Plugin not registered)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                                lineNumber: 316,
                                                columnNumber: 115
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                        lineNumber: 314,
                                        columnNumber: 23
                                    }, this),
                                    qbPlugin && qbPlugin.component && showCustomModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>showCustomModal(// Ensure the plugin component receives necessary props
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(qbPlugin.component, {
                                                showCustomModal: showCustomModal,
                                                ...qbPlugin.props || {}
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                                lineNumber: 323,
                                                columnNumber: 28
                                            }, void 0), submodule.name // Modal title
                                            ),
                                        className: "mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors",
                                        children: [
                                            "Launch ",
                                            submodule.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                        lineNumber: 320,
                                        columnNumber: 24
                                    }, this),
                                    !qbPlugin && submodule.pluginDefinition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-red-500",
                                        children: "This submodule plugin is defined but not available for launch."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                        lineNumber: 335,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, submodule.id, true, {
                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                lineNumber: 310,
                                columnNumber: 19
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                        lineNumber: 306,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "No submodules defined for this module."
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                        lineNumber: 342,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 297,
                columnNumber: 9
            }, this);
        }
        // Handle static sections
        switch(activeSection){
            case 'Overview':
                return initialDashboardContent;
            case 'Quick Board':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$QuickBoardComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    showCustomModal: showCustomModal,
                    plugins: availableQuickBoardPlugins,
                    userRoles: currentUserRoles
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 355,
                    columnNumber: 11
                }, this);
            case 'My Account':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-lg shadow",
                    children: [
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "My Client Account"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 363,
                            columnNumber: 67
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Details about the client's account would go here."
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 363,
                            columnNumber: 133
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 363,
                    columnNumber: 18
                }, this);
            case 'Notifications':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-lg shadow",
                    children: [
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "All Client Notifications"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 365,
                            columnNumber: 67
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "A list or feed of notifications."
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 365,
                            columnNumber: 140
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 365,
                    columnNumber: 18
                }, this);
            case 'Settings':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-lg shadow",
                    children: [
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "Client Application Settings"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 367,
                            columnNumber: 67
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "User-configurable settings."
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 367,
                            columnNumber: 143
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 367,
                    columnNumber: 18
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-full text-lg text-gray-500",
                    children: [
                        " Content for '",
                        activeSection,
                        "' (Client) is not yet implemented. "
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 369,
                    columnNumber: 18
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$BaseDashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        tenant: tenant,
        tenantType: tenantType,
        navItems: navItems,
        dashboardCards: clientDashboardCards,
        initialNotifications: initialNotifications,
        renderMainContent: renderMainContent,
        initialActiveSection: "Overview" // Default to Overview or first module
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
        lineNumber: 374,
        columnNumber: 5
    }, this);
}
_c = DashboardLayoutClient;
var _c;
__turbopack_context__.k.register(_c, "DashboardLayoutClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_8c4b52fa._.js.map