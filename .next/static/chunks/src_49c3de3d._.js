(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/dashboard/BaseDashboardLayout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BaseDashboardLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pin.js [app-client] (ecmascript) <export default as Pin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    const [showNotificationsDropdown, setShowNotificationsDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUserMenuDropdown, setShowUserMenuDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalContent, setModalContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalTitle, setModalTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Details");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const userMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Ref for click-outside detection
    // User menu items with navigation
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
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem(LSK_MINIMIZED_CARDS, JSON.stringify(minimizedCards));
            }
        }
    }["BaseDashboardLayout.useEffect"], [
        minimizedCards,
        LSK_MINIMIZED_CARDS
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseDashboardLayout.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem(LSK_PINNED_CARDS, JSON.stringify(pinnedCards));
            }
        }
    }["BaseDashboardLayout.useEffect"], [
        pinnedCards,
        LSK_PINNED_CARDS
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseDashboardLayout.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem(LSK_NOTIFICATIONS, JSON.stringify(notifications));
            }
        }
    }["BaseDashboardLayout.useEffect"], [
        notifications,
        LSK_NOTIFICATIONS
    ]);
    // Click-outside handler for user menu dropdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BaseDashboardLayout.useEffect": ()=>{
            const handleClickOutside = {
                "BaseDashboardLayout.useEffect.handleClickOutside": (event)=>{
                    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                        setShowUserMenuDropdown(false);
                    }
                }
            }["BaseDashboardLayout.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "BaseDashboardLayout.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["BaseDashboardLayout.useEffect"];
        }
    }["BaseDashboardLayout.useEffect"], []);
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
            if (maximizedCard === cardId) setMaximizedCard(null); // Unmaximize if minimizing the maximized card
        }
    }["BaseDashboardLayout.useCallback[toggleMinimizeCard]"], [
        maximizedCard
    ]);
    const toggleMaximizeCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BaseDashboardLayout.useCallback[toggleMaximizeCard]": (cardId)=>{
            setMaximizedCard({
                "BaseDashboardLayout.useCallback[toggleMaximizeCard]": (prev)=>prev === cardId ? null : cardId
            }["BaseDashboardLayout.useCallback[toggleMaximizeCard]"]);
            // If maximizing, ensure it's not minimized
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
        // Optionally, you could also unmaximize other cards or set this as active,
        // but for now, just removing from minimized list.
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
    const toggleNotifications = ()=>{
        setShowNotificationsDropdown(!showNotificationsDropdown);
    };
    const markAllNotificationsAsRead = ()=>{
        setNotifications((prevNotifications)=>prevNotifications.map((n)=>({
                    ...n,
                    read: true
                })));
    };
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
        setMaximizedCard(null); // Reset maximized card when changing sections
    };
    const getCardById = (cardId)=>dashboardCards.find((c)=>c.id === cardId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-391b31fde8081700" + " " + "flex h-screen bg-gray-100 text-gray-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-391b31fde8081700" + " " + `bg-sidebar text-sidebar-foreground flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shadow-lg`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-391b31fde8081700" + " " + "flex items-center justify-between p-4 border-b border-sidebar-border h-16",
                        children: [
                            sidebarExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                title: tenant.name,
                                className: "jsx-391b31fde8081700" + " " + "font-semibold text-lg truncate",
                                children: tenant.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 232,
                                columnNumber: 31
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleSidebar,
                                className: "jsx-391b31fde8081700" + " " + "p-1 rounded hover:bg-sidebar-hover text-sidebar-foreground",
                                children: sidebarExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                    lineNumber: 234,
                                    columnNumber: 32
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                    lineNumber: 234,
                                    columnNumber: 60
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "jsx-391b31fde8081700" + " " + "flex-1 overflow-y-auto py-2",
                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                title: item.title,
                                onClick: ()=>handleNavClick(item.title),
                                className: "jsx-391b31fde8081700" + " " + `flex items-center w-full p-3 text-sm transition-colors ${activeSection === item.title ? 'bg-sidebar-active text-white' // Ensure this class provides sufficient contrast and visual cue
                                 : 'hover:bg-sidebar-hover hover:text-sidebar-foreground-hover'}`,
                                children: [
                                    item.icon,
                                    sidebarExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-391b31fde8081700" + " " + "ml-3 truncate",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                        lineNumber: 250,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, item.title, true, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    dashboardCards.length > 0 && minimizedCards.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-391b31fde8081700" + " " + "border-t border-sidebar-border p-2",
                        children: [
                            sidebarExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "jsx-391b31fde8081700" + " " + "text-xs font-medium text-sidebar-muted-foreground mb-1 px-1",
                                children: "Minimized"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 258,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-391b31fde8081700" + " " + `flex ${sidebarExpanded ? 'flex-wrap gap-1' : 'flex-col items-center gap-1'}`,
                                children: minimizedCards.map((cardId)=>{
                                    const card = getCardById(cardId);
                                    return card ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>restoreCardFromMinimized(cardId),
                                        title: `Restore ${card.title}`,
                                        className: "jsx-391b31fde8081700" + " " + "bg-gray-700 text-xs p-1.5 rounded flex items-center text-white hover:bg-gray-600 w-full sm:w-auto justify-center truncate",
                                        children: sidebarExpanded ? card.title : card.title.charAt(0).toUpperCase()
                                    }, cardId, false, {
                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                        lineNumber: 263,
                                        columnNumber: 19
                                    }, this) : null;
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this),
                    sidebarFooterContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-391b31fde8081700" + " " + "border-t border-sidebar-border",
                        children: sidebarFooterContent
                    }, void 0, false, {
                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                        lineNumber: 276,
                        columnNumber: 34
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-391b31fde8081700" + " " + "flex-1 overflow-hidden flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "jsx-391b31fde8081700" + " " + "bg-white border-b flex flex-col shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-391b31fde8081700" + " " + "p-4 flex justify-between items-center h-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "jsx-391b31fde8081700" + " " + "text-xl font-semibold text-gray-700",
                                        children: activeSection
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-391b31fde8081700" + " " + "flex items-center gap-3 sm:gap-4",
                                        children: [
                                            headerRightContent,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-391b31fde8081700" + " " + "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: toggleNotifications,
                                                        title: "Notifications",
                                                        className: "jsx-391b31fde8081700" + " " + "p-2 rounded-full hover:bg-gray-100 relative text-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 294,
                                                                columnNumber: 19
                                                            }, this),
                                                            notifications.some((n)=>!n.read) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-391b31fde8081700" + " " + "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                        lineNumber: 289,
                                                        columnNumber: 17
                                                    }, this),
                                                    showNotificationsDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-391b31fde8081700" + " " + "absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-391b31fde8081700" + " " + "p-3 border-b flex justify-between items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "jsx-391b31fde8081700" + " " + "font-medium text-sm",
                                                                        children: "Notifications"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                        lineNumber: 302,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    notifications.some((n)=>!n.read) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: markAllNotificationsAsRead,
                                                                        className: "jsx-391b31fde8081700" + " " + "text-xs text-indigo-600 hover:underline",
                                                                        children: "Mark all as read"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                        lineNumber: 304,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-391b31fde8081700" + " " + "max-h-80 overflow-y-auto",
                                                                children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-391b31fde8081700" + " " + "p-4 text-center text-sm text-gray-500",
                                                                    children: "No new notifications"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                    lineNumber: 311,
                                                                    columnNumber: 25
                                                                }, this) : notifications.map((notification)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-391b31fde8081700" + " " + `p-3 border-b border-gray-100 text-sm ${notification.read ? 'text-gray-600' : 'bg-indigo-50 font-medium text-gray-800'}`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "jsx-391b31fde8081700",
                                                                            children: notification.text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                            lineNumber: 318,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, notification.id, false, {
                                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                        lineNumber: 314,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 21
                                                            }, this),
                                                            notifications.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-391b31fde8081700" + " " + "p-2 text-center border-t",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        handleNavClick("Notifications");
                                                                        setShowNotificationsDropdown(false);
                                                                    },
                                                                    className: "jsx-391b31fde8081700" + " " + "text-xs text-indigo-600 hover:underline",
                                                                    children: "View all notifications"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                    lineNumber: 326,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                lineNumber: 288,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: userMenuRef,
                                                className: "jsx-391b31fde8081700" + " " + "relative user-menu",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowUserMenuDropdown(!showUserMenuDropdown),
                                                        title: "User Menu",
                                                        "aria-expanded": showUserMenuDropdown,
                                                        "aria-label": "User menu",
                                                        className: "jsx-391b31fde8081700" + " " + "p-1.5 rounded-full hover:bg-gray-100 text-gray-600 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-391b31fde8081700" + " " + "w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium",
                                                                children: tenant.name.charAt(0).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 19
                                                            }, this),
                                                            sidebarExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-391b31fde8081700" + " " + "text-sm font-medium",
                                                                children: tenant.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 39
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 17
                                                    }, this),
                                                    showUserMenuDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        role: "menu",
                                                        className: "jsx-391b31fde8081700" + " " + "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-391b31fde8081700" + " " + "p-3 border-b",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-391b31fde8081700" + " " + "text-sm font-medium text-gray-700",
                                                                        children: tenant.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                        lineNumber: 349,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-391b31fde8081700" + " " + "text-xs text-gray-500",
                                                                        children: "User Role"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                        lineNumber: 350,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-391b31fde8081700" + " " + "py-1",
                                                                children: userMenuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            item.action();
                                                                            setShowUserMenuDropdown(false);
                                                                        },
                                                                        role: "menuitem",
                                                                        className: "jsx-391b31fde8081700" + " " + "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600",
                                                                        children: item.title
                                                                    }, item.title, false, {
                                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                        lineNumber: 354,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                lineNumber: 333,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                            dashboardCards.length > 0 && pinnedCards.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-391b31fde8081700" + " " + "bg-gray-50 px-4 py-2 flex gap-3 overflow-x-auto border-b items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                                        size: 14,
                                        className: "text-indigo-500 mr-1 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                        lineNumber: 376,
                                        columnNumber: 15
                                    }, this),
                                    pinnedCards.map((cardId)=>{
                                        const card = getCardById(cardId);
                                        return card ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-391b31fde8081700" + " " + "flex-shrink-0 items-center px-3 py-1.5 bg-white rounded-md shadow-sm border text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-391b31fde8081700" + " " + "font-medium text-gray-700",
                                                    children: card.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>togglePinCard(cardId),
                                                    title: `Unpin ${card.title}`,
                                                    className: "jsx-391b31fde8081700" + " " + "ml-2 text-gray-400 hover:text-red-500",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, cardId, true, {
                                            fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                            lineNumber: 380,
                                            columnNumber: 19
                                        }, this) : null;
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 375,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "jsx-391b31fde8081700" + " " + "flex-1 p-4 sm:p-6 overflow-auto bg-gray-50",
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
                        lineNumber: 397,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-391b31fde8081700" + " " + "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-391b31fde8081700" + " " + "bg-white w-full max-w-2xl rounded-lg shadow-xl flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-391b31fde8081700" + " " + "flex justify-between items-center p-4 sm:p-5 border-b",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-391b31fde8081700" + " " + "text-lg font-semibold text-gray-700",
                                    children: modalTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                    lineNumber: 419,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: hideCustomModal,
                                    className: "jsx-391b31fde8081700" + " " + "p-1.5 rounded-full hover:bg-gray-100 text-gray-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                    lineNumber: 420,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                            lineNumber: 418,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-391b31fde8081700" + " " + "p-4 sm:p-6 min-h-[150px] max-h-[70vh] overflow-y-auto",
                            children: modalContent || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-391b31fde8081700",
                                children: "Modal content goes here."
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 425,
                                columnNumber: 32
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                            lineNumber: 424,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-391b31fde8081700" + " " + "p-4 sm:p-5 border-t flex justify-end gap-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: hideCustomModal,
                                className: "jsx-391b31fde8081700" + " " + "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                                lineNumber: 428,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                            lineNumber: 427,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                    lineNumber: 417,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
                lineNumber: 416,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "391b31fde8081700",
                children: '.bg-sidebar{background-color:#1f2937}.text-sidebar-foreground{color:#e5e7eb}.border-sidebar-border{border-color:#374151}.hover\\\\:bg-sidebar-hover:hover{background-color:#374151}.hover\\\\:text-sidebar-foreground-hover:hover{color:#fff}.bg-sidebar-active{background-color:#4f46e5}.text-sidebar-muted-foreground{color:#9ca3af}.switch{width:34px;height:20px;display:inline-block;position:relative}.switch input{opacity:0;width:0;height:0}.slider{cursor:pointer;background-color:#ccc;transition:all .4s;position:absolute;inset:0}.slider:before{content:"";background-color:#fff;width:12px;height:12px;transition:all .4s;position:absolute;bottom:4px;left:4px}input:checked+.slider{background-color:#4f46e5}input:checked+.slider:before{transform:translate(14px)}.slider.round{border-radius:20px}.slider.round:before{border-radius:50%}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/BaseDashboardLayout.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
_s(BaseDashboardLayout, "htwWqEhHYkO18Szf2mXqVA1JmQA=", false, function() {
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
// To make ManyChatControlQuickBoardPlugin runnable:
// Ensure QuickBoardComponent exists and functions as described
// src/components/dashboard/quickboard/QuickBoardComponent.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>"); // Maximize2, PlusCircle, ChevronRight not used here
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
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6 p-4 md:p-6",
        children: [
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                children: authorizedPlugins.map((plugin)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-md overflow-hidden",
                        children: [
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b flex justify-between items-center bg-gray-50",
                                children: [
                                    " ",
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
                                                            lineNumber: 48,
                                                            columnNumber: 25
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: "This could be a different view or settings for the plugin."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                                            lineNumber: 49,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 23
                                                }, void 0), `Options for ${plugin.title}`),
                                            className: "p-1 rounded hover:bg-gray-200 text-gray-600" // Adjusted hover
                                            ,
                                            title: `More options for ${plugin.title}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                                lineNumber: 56,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                            lineNumber: 45,
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
                                    showCustomModal: showCustomModal
                                }, void 0, false, {
                                    fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this)
                        ]
                    }, plugin.id, true, {
                        fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx",
        lineNumber: 32,
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
"[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
//src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx
//QuickBoard UI Plugin - This React component will provide the button and call the core logic.
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ManyChatControlQuickBoardPlugin = ()=>{
    const handleButtonClick = ()=>{
        console.log('ManyChat Control button clicked!');
    // Future: Add logic to interact with ManyChatControlPlugin.ts
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
            onClick: handleButtonClick,
            children: "Control ManyChat"
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = ManyChatControlQuickBoardPlugin;
const __TURBOPACK__default__export__ = ManyChatControlQuickBoardPlugin;
var _c;
__turbopack_context__.k.register(_c, "ManyChatControlQuickBoardPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/DashboardLayoutClient.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/components/dashboard/DashboardLayoutClient.tsx
// if make Register the Plugin : Make the QuickBoard aware of this new plugin.
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$BaseDashboardLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/BaseDashboardLayout.tsx [app-client] (ecmascript)");
// Import QuickBoard and its types/plugins
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$QuickBoardComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/QuickBoardComponent.tsx [app-client] (ecmascript)");
// --- IMPORT YOUR QUICKBOARD PLUGINS ---
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$UserCountQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$ManyChatControlQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
// import SupplierOverviewPlugin from './quickboard/plugins/SupplierOverviewPlugin'; // If you have this
// Placeholder for SupplierOverviewPlugin if not fully implemented yet
const SupplierOverviewPlugin = ({ showCustomModal })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            "Placeholder for Supplier Overview. ",
            showCustomModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>showCustomModal("Detail from Supplier", "Supplier Detail"),
                children: "Details"
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 30,
                columnNumber: 63
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
        lineNumber: 30,
        columnNumber: 3
    }, this);
_c = SupplierOverviewPlugin;
function DashboardLayoutClient({ tenant, initialDashboardContent }) {
    const tenantType = 'client';
    const navItems = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            title: 'Overview'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            title: 'Main Board'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this),
            title: 'Quick Board'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this),
            title: 'My Account'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            title: 'Notifications'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            title: 'Settings'
        }
    ];
    const clientDashboardCards = [
        // ... your cards
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
        // ... your notifications
        {
            id: 'client-notif-1',
            text: `Welcome to ${tenant.name}'s client dashboard!`,
            read: false,
            timestamp: new Date().toISOString()
        }
    ];
    // --- DEFINE USER ROLES (Replace with actual logic) ---
    const getCurrentUserRoles = ()=>{
        // In a real app, get this from auth context, user state, etc.
        // For testing, you can cycle roles or set them statically.
        // return ['admin', 'marketing_user'];
        // return ['viewer'];
        return [
            'admin',
            'marketing_user',
            'analyst_user'
        ]; // Example: User has these roles
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
            id: 'manychatControl',
            title: 'ManyChat Messenger Control',
            component: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$plugins$2f$ManyChatControlQuickBoardPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            roles: [
                'admin',
                'marketing_user'
            ]
        },
        {
            id: 'supplierOverview',
            title: 'Supplier Overview',
            component: SupplierOverviewPlugin,
            roles: [
                'admin',
                'procurement_user'
            ]
        }
    ];
    const renderMainContent = ({ activeSection, dashboardCards = clientDashboardCards, minimizedCards, maximizedCard, pinnedCards, toggleMinimizeCard, toggleMaximizeCard, togglePinCard, showCustomModal })=>{
        switch(activeSection){
            case 'Overview':
                return initialDashboardContent;
            case 'Main Board':
                // ... (your existing Main Board logic - seems fine)
                if (maximizedCard !== null && dashboardCards.some((c)=>c.id === maximizedCard)) {
                    const card = dashboardCards.find((c)=>c.id === maximizedCard);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-lg shadow-xl p-4 sm:p-6 h-full flex flex-col",
                        children: [
                            " ",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "Maximized: ",
                                    card?.title
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                                lineNumber: 117,
                                columnNumber: 136
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                        lineNumber: 117,
                        columnNumber: 22
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                    children: [
                        " ",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Main Board Cards Here"
                        }, void 0, false, {
                            fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                            lineNumber: 119,
                            columnNumber: 137
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 119,
                    columnNumber: 18
                }, this);
            case 'Quick Board':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$quickboard$2f$QuickBoardComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    showCustomModal: showCustomModal,
                    plugins: availableQuickBoardPlugins,
                    userRoles: currentUserRoles
                }, void 0, false, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 124,
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
                            lineNumber: 132,
                            columnNumber: 67
                        }, this),
                        " ",
                        " "
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 132,
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
                            lineNumber: 134,
                            columnNumber: 67
                        }, this),
                        " ",
                        " "
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 134,
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
                            lineNumber: 136,
                            columnNumber: 67
                        }, this),
                        " ",
                        " "
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
                    lineNumber: 136,
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
                    lineNumber: 138,
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
        initialActiveSection: "Quick Board" // Set to "Quick Board" to test it by default
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/DashboardLayoutClient.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c1 = DashboardLayoutClient;
var _c, _c1;
__turbopack_context__.k.register(_c, "SupplierOverviewPlugin");
__turbopack_context__.k.register(_c1, "DashboardLayoutClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_49c3de3d._.js.map