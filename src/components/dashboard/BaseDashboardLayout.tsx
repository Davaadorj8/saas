// src/components/dashboard/BaseDashboardLayout.tsx
'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // For right sidebar toggle

import {
  BaseDashboardLayoutProps,
  DashboardCard,
  Notification,
  CommunicationUser,
} from './types'; // Adjusted path

// Import new layout components
import LeftSidebar from './layout/LeftSidebar';
import Header from './layout/Header';
import RightCommunicationSidebar from './layout/RightCommunicationSidebar';
import CustomModal from './layout/CustomModal';
import TextMessengerPopup from './layout/TextMessengerPopup';
import { UserMenuItem } from './layout/UserMenuDropdown'; // Import UserMenuItem

// Global styles and icons remain, or can be moved to a global CSS if preferred
// For simplicity, keeping them here for now, but ideally global styles are separate

export default function BaseDashboardLayout({
  tenant,
  tenantType,
  navItems,
  dashboardCards = [],
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
      try { return stored ? JSON.parse(stored) : []; }
      catch (e) { console.error(`Error parsing ${LSK_MINIMIZED_CARDS} from localStorage`, e); return []; }
    }
    return [];
  });

  const [maximizedCard, setMaximizedCard] = useState<string | number | null>(null);

  const [pinnedCards, setPinnedCards] = useState<Array<string | number>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LSK_PINNED_CARDS);
      try { return stored ? JSON.parse(stored) : []; }
      catch (e) { console.error(`Error parsing ${LSK_PINNED_CARDS} from localStorage`, e); return []; }
    }
    return [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LSK_NOTIFICATIONS);
      try { return stored ? JSON.parse(stored) : initialNotifications; }
      catch (e) { console.error(`Error parsing ${LSK_NOTIFICATIONS} from localStorage`, e); return initialNotifications; }
    }
    return initialNotifications;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("Details");
  const router = useRouter();

  // State for Right Communication Sidebar & Chat Popup
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<CommunicationUser | null>(null);
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);

  const userMenuItems: UserMenuItem[] = [
    { title: "Profile", action: () => router.push('/profile') },
    { title: "Settings", action: () => router.push('/settings') },
    { title: "Logout", action: () => router.push('/logout') },
  ];

  // --- Effects for localStorage ---
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(LSK_MINIMIZED_CARDS, JSON.stringify(minimizedCards));
  }, [minimizedCards, LSK_MINIMIZED_CARDS]);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(LSK_PINNED_CARDS, JSON.stringify(pinnedCards));
  }, [pinnedCards, LSK_PINNED_CARDS]);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(LSK_NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications, LSK_NOTIFICATIONS]);

  // --- Helper Functions ---
  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const toggleMinimizeCard = useCallback((cardId: string | number) => {
    setMinimizedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
    if (maximizedCard === cardId) setMaximizedCard(null);
  }, [maximizedCard]);

  const toggleMaximizeCard = useCallback((cardId: string | number) => {
    setMaximizedCard(prev => prev === cardId ? null : cardId);
    setMinimizedCards(prev => prev.filter(id => id !== cardId));
  }, []);

  const restoreCardFromMinimized = useCallback((cardId: string | number) => {
    setMinimizedCards(prev => prev.filter(id => id !== cardId));
  }, []);

  const togglePinCard = useCallback((cardId: string | number) => {
    setPinnedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
  }, []);

  const markAllNotificationsAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const showCustomModal = useCallback((content: ReactNode, title: string = "Details") => {
    setModalContent(content); setModalTitle(title); setIsModalOpen(true);
  }, []);
  const hideCustomModal = () => { setIsModalOpen(false); setModalContent(null); };

  const handleNavClick = (title: string) => {
    setActiveSection(title);
    setMaximizedCard(null);
  };

  const handleViewAllNotifications = () => {
    handleNavClick("Notifications"); // Assuming "Notifications" is a valid navItem title
  };

  // --- Communication Action Handlers ---
  const handleStartWebRTCCall = (user: CommunicationUser) => {
    alert(`Starting WebRTC call with ${user.name} (Placeholder)`);
    console.log("Initiate WebRTC call with:", user);
  };

  const handleOpenTextMessenger = (user: CommunicationUser) => {
    setActiveChatUser(user);
    setIsChatPopupOpen(true);
    console.log("Open text messenger with:", user);
  };

  const handleInitiateBusinessCall = (user: CommunicationUser) => {
    alert(`Initiating business call with ${user.name} (Custom Logic Placeholder)`);
    console.log("Initiate Business Call (custom logic) with:", user);
  };

  const closeChatPopup = () => {
    setIsChatPopupOpen(false);
    setActiveChatUser(null);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
      <LeftSidebar
        tenant={tenant}
        isExpanded={sidebarExpanded}
        onToggle={toggleSidebar}
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        minimizedCards={minimizedCards}
        dashboardCards={dashboardCards}
        onRestoreCard={restoreCardFromMinimized}
        footerContent={sidebarFooterContent}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          tenant={tenant}
          activeSection={activeSection}
          notifications={notifications}
          onMarkAllNotificationsRead={markAllNotificationsAsRead}
          onViewAllNotifications={handleViewAllNotifications}
          userMenuItems={userMenuItems}
          onUserMenuItemClick={(action: () => void) => action()} // Simple pass-through for now
          headerRightContent={headerRightContent}
          pinnedCards={pinnedCards}
          dashboardCards={dashboardCards}
          onTogglePinCard={togglePinCard}
          isLeftSidebarExpanded={sidebarExpanded}
        />

        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-50 custom-scrollbar">
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

      {/* Right Communication Sidebar */}
      <div
        className={`border-l border-gray-200 shadow-lg flex flex-col transition-all duration-300 ease-in-out z-30
                    ${rightSidebarExpanded ? 'w-72' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        {rightSidebarExpanded && (
          <RightCommunicationSidebar
            onStartWebRTCCall={handleStartWebRTCCall}
            onOpenTextMessenger={handleOpenTextMessenger}
            onInitiateBusinessCall={handleInitiateBusinessCall}
          />
        )}
      </div>

      {/* Toggle Button for Right Communication Sidebar */}
      <button
        onClick={() => setRightSidebarExpanded(!rightSidebarExpanded)}
        className="fixed top-16 bg-indigo-600 text-white p-0 rounded-l-md shadow-lg hover:bg-indigo-700 z-40 transition-all duration-300 ease-in-out flex items-center justify-center"
        style={{
          right: rightSidebarExpanded ? '288px' : '0px', // 288px is w-72
          width: '28px',
          height: '44px',
        }}
        title={rightSidebarExpanded ? "Hide Messenger" : "Show Messenger"}
      >
        {rightSidebarExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <CustomModal
        isOpen={isModalOpen}
        onClose={hideCustomModal}
        title={modalTitle}
        content={modalContent}
      />

      <TextMessengerPopup
        isOpen={isChatPopupOpen}
        user={activeChatUser}
        onClose={closeChatPopup}
        isRightSidebarExpanded={rightSidebarExpanded}
      />

      <style jsx global>{`
        /* Basic Styles for Sidebar (customize these in your global CSS or Tailwind config) */
        .bg-sidebar { background-color: #1f2937; /* Example: gray-800 */ }
        .text-sidebar-foreground { color: #e5e7eb; /* Example: gray-200 */ }
        .border-sidebar-border { border-color: #374151; /* Example: gray-700 */ }
        .hover\\:bg-sidebar-hover:hover { background-color: #374151; /* Example: gray-700 */ }
        .hover\\:text-sidebar-foreground-hover:hover { color: #ffffff; }
        .bg-sidebar-active { background-color: #4f46e5; /* Example: indigo-600 */ }
        .text-sidebar-muted-foreground { color: #9ca3af; /* Example: gray-400 */ }

        /* Custom Scrollbar (Optional - for Webkit browsers) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* gray-300 */
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af; /* gray-400 */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent; /* thumb and track */
        }

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