// src/components/dashboard/BaseDashboardLayout.tsx
'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Maximize2,
  Minimize2,
  X,
  Menu as MenuIcon, // Renamed to avoid conflict with Menu HTML element
  ChevronLeft,
  ChevronRight,
  Bell,
  Pin,
  Layers,
  // UserCircle, SlidersHorizontal, LifeBuoy, Home, Package, PlusCircle // These will be passed in navItems
} from 'lucide-react';
import type { Tenant } from '@prisma/client'; // Assuming Tenant type is globally available or adjust path

// --- Type Definitions ---
export interface NavItem {
  icon: ReactNode;
  title: string;
  // Optional: action to take, or identifier for content rendering
  // If not provided, setActiveSection(item.title) is default
}

export interface DashboardCard {
  id: string | number;
  title: string;
  color?: string; // Optional, for styling card background
  // Optional: Custom render functions for specific card content, if not handled by renderMainContent
  // renderSummary?: (card: DashboardCard) => ReactNode;
  // renderMaximizedDetails?: (card: DashboardCard) => ReactNode;
}

export interface Notification {
  id: string | number;
  text: string;
  read: boolean;
  timestamp?: string; // Optional
  link?: string; // Optional
}

export interface RenderMainContentParams {
  activeSection: string;
  tenant: Tenant;
  dashboardCards?: DashboardCard[];
  minimizedCards: Array<string | number>;
  maximizedCard: string | number | null;
  pinnedCards: Array<string | number>;
  toggleMinimizeCard: (cardId: string | number) => void;
  toggleMaximizeCard: (cardId: string | number) => void;
  togglePinCard: (cardId: string | number) => void;
  showCustomModal: (content: ReactNode, title?: string) => void;
  setActiveSection: (sectionTitle: string) => void; // Allow main content to change section
}

export interface BaseDashboardLayoutProps {
  tenant: Tenant;
  tenantType: string; // e.g., "customer", "client", "supplier" for localStorage keys
  navItems: NavItem[];
  dashboardCards?: DashboardCard[];
  initialActiveSection?: string;
  initialNotifications?: Notification[];
  renderMainContent: (params: RenderMainContentParams) => ReactNode;
  headerRightContent?: ReactNode; // Optional: For custom content next to notifications/menu
  sidebarFooterContent?: ReactNode; // Optional: For custom content at the bottom of the sidebar
}

// --- Component ---
export default function BaseDashboardLayout({
  tenant,
  tenantType,
  navItems,
  dashboardCards = [], // Default to empty array if not provided
  initialActiveSection,
  initialNotifications = [],
  renderMainContent,
  headerRightContent,
  sidebarFooterContent,
}: BaseDashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState(
    initialActiveSection || (navItems[0]?.title) || 'Dashboard'
  );

  const LSK_MINIMIZED_CARDS = `minimizedCards_${tenantType}_${tenant.id}`;
  const LSK_PINNED_CARDS = `pinnedCards_${tenantType}_${tenant.id}`;
  const LSK_NOTIFICATIONS = `notifications_${tenantType}_${tenant.id}`;

  const [minimizedCards, setMinimizedCards] = useState<Array<string | number>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LSK_MINIMIZED_CARDS);
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error(`Error parsing ${LSK_MINIMIZED_CARDS} from localStorage`, e); return []; }
    }
    return [];
  });

  const [maximizedCard, setMaximizedCard] = useState<string | number | null>(null);
  
  const [pinnedCards, setPinnedCards] = useState<Array<string | number>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LSK_PINNED_CARDS);
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error(`Error parsing ${LSK_PINNED_CARDS} from localStorage`, e); return []; }
    }
    return [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LSK_NOTIFICATIONS);
      try {
        return stored ? JSON.parse(stored) : initialNotifications;
      } catch (e) {
        console.error(`Error parsing ${LSK_NOTIFICATIONS} from localStorage`, e);
        return initialNotifications;
      }
    }
    return initialNotifications;
  });
  
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("Details");


  // --- Effects for localStorage ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LSK_MINIMIZED_CARDS, JSON.stringify(minimizedCards));
    }
  }, [minimizedCards, LSK_MINIMIZED_CARDS]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LSK_PINNED_CARDS, JSON.stringify(pinnedCards));
    }
  }, [pinnedCards, LSK_PINNED_CARDS]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LSK_NOTIFICATIONS, JSON.stringify(notifications));
    }
  }, [notifications, LSK_NOTIFICATIONS]);

  // --- Helper Functions ---
  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const toggleMinimizeCard = useCallback((cardId: string | number) => {
    setMinimizedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
    if (maximizedCard === cardId) setMaximizedCard(null); // Unmaximize if minimizing the maximized card
  }, [maximizedCard]);

  const toggleMaximizeCard = useCallback((cardId: string | number) => {
    setMaximizedCard(prev => prev === cardId ? null : cardId);
    // If maximizing, ensure it's not minimized
    setMinimizedCards(prev => prev.filter(id => id !== cardId));
  }, []);

  const restoreCardFromMinimized = useCallback((cardId: string | number) => {
    setMinimizedCards(prev => prev.filter(id => id !== cardId));
    // Optionally, you could also unmaximize other cards or set this as active,
    // but for now, just removing from minimized list.
  }, []);

  const togglePinCard = useCallback((cardId: string | number) => {
    setPinnedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
  }, []);

  const toggleNotifications = () => {
    setShowNotificationsDropdown(!showNotificationsDropdown);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications => prevNotifications.map(n => ({ ...n, read: true })));
  };

  const showCustomModal = useCallback((content: ReactNode, title: string = "Details") => {
    setModalContent(content);
    setModalTitle(title);
    setIsModalOpen(true);
  }, []);

  const hideCustomModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleNavClick = (title: string) => {
    setActiveSection(title);
    setMaximizedCard(null); // Reset maximized card when changing sections
  }

  const getCardById = (cardId: string | number) => dashboardCards.find(c => c.id === cardId);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className={`bg-sidebar text-sidebar-foreground flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
          {sidebarExpanded && <span className="font-semibold text-lg truncate" title={tenant.name}>{tenant.name}</span>}
          <button onClick={toggleSidebar} className="p-1 rounded hover:bg-sidebar-hover text-sidebar-foreground">
            {sidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => (
            <button
              key={item.title}
              title={item.title}
              className={`flex items-center w-full p-3 text-sm transition-colors ${
                activeSection === item.title
                  ? 'bg-sidebar-active text-white' // Ensure this class provides sufficient contrast and visual cue
                  : 'hover:bg-sidebar-hover hover:text-sidebar-foreground-hover'
              }`}
              onClick={() => handleNavClick(item.title)}
            >
              {item.icon}
              {sidebarExpanded && <span className="ml-3 truncate">{item.title}</span>}
            </button>
          ))}
        </nav>

        {/* Minimized Cards Tray */}
        {dashboardCards.length > 0 && minimizedCards.length > 0 && (
          <div className="border-t border-sidebar-border p-2">
            {sidebarExpanded && <h4 className="text-xs font-medium text-sidebar-muted-foreground mb-1 px-1">Minimized</h4>}
            <div className={`flex ${sidebarExpanded ? 'flex-wrap gap-1' : 'flex-col items-center gap-1'}`}>
              {minimizedCards.map(cardId => {
                const card = getCardById(cardId);
                return card ? (
                  <button
                    key={cardId}
                    onClick={() => restoreCardFromMinimized(cardId)}
                    title={`Restore ${card.title}`}
                    className="bg-gray-700 text-xs p-1.5 rounded flex items-center text-white hover:bg-gray-600 w-full sm:w-auto justify-center truncate"
                  >
                    {sidebarExpanded ? card.title : card.title.charAt(0).toUpperCase()}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
         {sidebarFooterContent && <div className="border-t border-sidebar-border">{sidebarFooterContent}</div>}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-white border-b flex flex-col shadow-sm">
          <div className="p-4 flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-700">{activeSection}</h1>
            <div className="flex items-center gap-3 sm:gap-4">
              {headerRightContent}
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600"
                  onClick={toggleNotifications}
                  title="Notifications"
                >
                  <Bell size={20} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500" />
                  )}
                </button>
                {showNotificationsDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border">
                    <div className="p-3 border-b flex justify-between items-center">
                      <h3 className="font-medium text-sm">Notifications</h3>
                      {notifications.some(n => !n.read) && (
                        <button onClick={markAllNotificationsAsRead} className="text-xs text-indigo-600 hover:underline">
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 text-sm ${notification.read ? 'text-gray-600' : 'bg-indigo-50 font-medium text-gray-800'}`}
                          >
                            <p>{notification.text}</p>
                            {/* Optional: display timestamp or link */}
                          </div>
                        ))
                      )}
                    </div>
                     {notifications.length > 0 && (
                        <div className="p-2 text-center border-t">
                            <button onClick={() => { handleNavClick("Notifications"); setShowNotificationsDropdown(false);}} className="text-xs text-indigo-600 hover:underline">View all notifications</button>
                        </div>
                    )}
                  </div>
                )}
              </div>
              {/* User Menu (Placeholder) */}
              <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600" title="User Menu">
                <MenuIcon size={20} />
              </button>
            </div>
          </div>

          {/* Pinned Cards Bar */}
          {dashboardCards.length > 0 && pinnedCards.length > 0 && (
            <div className="bg-gray-50 px-4 py-2 flex gap-3 overflow-x-auto border-b items-center">
               <Pin size={14} className="text-indigo-500 mr-1 flex-shrink-0" />
              {pinnedCards.map(cardId => {
                const card = getCardById(cardId);
                return card ? (
                  <div key={cardId} className="flex-shrink-0 items-center px-3 py-1.5 bg-white rounded-md shadow-sm border text-sm">
                    <span className="font-medium text-gray-700">{card.title}</span>
                    <button
                      onClick={() => togglePinCard(cardId)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                      title={`Unpin ${card.title}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </header>

        {/* Main scrollable content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-50">
          {renderMainContent({
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
            setActiveSection: handleNavClick,
          })}
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b">
              <h2 className="text-lg font-semibold text-gray-700">{modalTitle}</h2>
              <button onClick={hideCustomModal} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 sm:p-6 min-h-[150px] max-h-[70vh] overflow-y-auto">
              {modalContent || <p>Modal content goes here.</p>}
            </div>
            {/* Modal footer can be part of modalContent if specific actions are needed */}
            {/* Or add a generic footer here if desired */}
             <div className="p-4 sm:p-5 border-t flex justify-end gap-3">
              <button onClick={hideCustomModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Close</button>
              {/* <button onClick={() => { console.log("Modal action confirmed"); hideCustomModal(); }} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Confirm Action</button> */}
            </div>
          </div>
        </div>
      )}

      {/* Global Styles (e.g., for custom switch) */}
      <style jsx global>{`
        /* Basic Styles for Sidebar (customize these in your global CSS or Tailwind config) */
        .bg-sidebar { background-color: #1f2937; /* Example: gray-800 */ }
        .text-sidebar-foreground { color: #e5e7eb; /* Example: gray-200 */ }
        .border-sidebar-border { border-color: #374151; /* Example: gray-700 */ }
        .hover\\:bg-sidebar-hover:hover { background-color: #374151; /* Example: gray-700 */ }
        .hover\\:text-sidebar-foreground-hover:hover { color: #ffffff; }
        .bg-sidebar-active { background-color: #4f46e5; /* Example: indigo-600 */ }
        .text-sidebar-muted-foreground { color: #9ca3af; /* Example: gray-400 */ }


        /* Toggle Switch (if used by child components via renderMainContent) */
        .switch { position: relative; display: inline-block; width: 34px; height: 20px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
        input:checked + .slider { background-color: #4f46e5; } /* indigo-600 */
        input:checked + .slider:before { transform: translateX(14px); }
        .slider.round { border-radius: 20px; }
        .slider.round:before { border-radius: 50%; }
      `}</style>
    </div>
  );
}