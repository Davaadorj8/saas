'use client';

import { useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import {
  Maximize2,
  Minimize2,
  X,
  Menu as MenuIcon, // Renamed to avoid conflict with Menu HTML element
  ChevronLeft,      // Used for left sidebar AND right sidebar toggle (collapsed state)
  ChevronRight,     // Used for left sidebar AND right sidebar toggle (expanded state) AND group accordion
  LogOut,
  Bell,
  Pin,
  Layers,
  ChevronDown,      // For communication group accordion
  Video,            // For WebRTC icon
  MessageSquare,    // For Text Message icon
  Users,            // For Colleagues/Customers group icon
  Briefcase,        // For Suppliers group icon
  Phone,            // For Business Call icon
} from 'lucide-react';
import type { Tenant } from '@prisma/client'; // Assuming Tenant type is globally available or adjust path
import { useRouter } from 'next/navigation';

// --- Type Definitions ---
export interface NavItem {
  icon: ReactNode;
  title: string;
}

export interface DashboardCard {
  id: string | number;
  title: string;
  color?: string;
}

export interface Notification {
  id: string | number;
  text: string;
  read: boolean;
  timestamp?: string;
  link?: string;
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
  setActiveSection: (sectionTitle: string) => void;
}

export interface BaseDashboardLayoutProps {
  tenant: Tenant;
  tenantType: string;
  navItems: NavItem[];
  dashboardCards?: DashboardCard[];
  initialActiveSection?: string;
  initialNotifications?: Notification[];
  renderMainContent: (params: RenderMainContentParams) => ReactNode;
  headerRightContent?: ReactNode;
  sidebarFooterContent?: ReactNode;
  // Potentially pass communication users as props in a real app
  // communicationUsers?: CommunicationUser[];
}

// --- Communication Sidebar Types ---
export interface CommunicationUser {
  id: string;
  name: string;
  avatarUrl?: string;
  isActive: boolean;
  tenantType: 'client' | 'supplier' | 'customer'; // Used for grouping
}

// Mock data for communication users (replace with actual data fetching)
const MOCK_COMMUNICATION_USERS: CommunicationUser[] = [
  { id: 'colleague1', name: 'Eleanor Vance', isActive: true, tenantType: 'client' },
  { id: 'colleague2', name: 'Marcus Bell', isActive: true, tenantType: 'client' },
  { id: 'colleague3', name: 'Nina Petrova', isActive: false, tenantType: 'client' },
  { id: 'supplier1', name: 'Supplier Alpha Inc.', isActive: true, tenantType: 'supplier' },
  { id: 'supplier2', name: 'Supplier Beta Co.', isActive: true, tenantType: 'supplier' },
  { id: 'customer1', name: 'Customer X Corp', isActive: true, tenantType: 'customer' },
  { id: 'customer2', name: 'Customer Y Ltd', isActive: false, tenantType: 'customer' },
  { id: 'customer3', name: 'Customer Z Global', isActive: true, tenantType: 'customer' },
];

const getActiveUsersByTenantType = (
  users: CommunicationUser[],
  type: 'client' | 'supplier' | 'customer'
): CommunicationUser[] => {
  return users.filter(user => user.tenantType === type && user.isActive);
};


// --- Component ---
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

  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showUserMenuDropdown, setShowUserMenuDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("Details");
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // --- State for Right Communication Sidebar ---
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(false); // Default collapsed
  const [activeChatUser, setActiveChatUser] = useState<CommunicationUser | null>(null);
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);


  const userMenuItems = [
    { title: "Profile", action: () => router.push('/profile') },
    { title: "Settings", action: () => router.push('/settings') },
    { title: "Logout", action: () => router.push('/logout') },
  ];

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenuDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const toggleNotifications = () => setShowNotificationsDropdown(!showNotificationsDropdown);
  const markAllNotificationsAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const showCustomModal = useCallback((content: ReactNode, title: string = "Details") => {
    setModalContent(content); setModalTitle(title); setIsModalOpen(true);
  }, []);
  const hideCustomModal = () => { setIsModalOpen(false); setModalContent(null); };
  const handleNavClick = (title: string) => { setActiveSection(title); setMaximizedCard(null); };
  const getCardById = (cardId: string | number) => dashboardCards.find(c => c.id === cardId);

  // --- Communication Action Handlers ---
  const handleStartWebRTCCall = (user: CommunicationUser) => {
    // Placeholder for WebRTC call logic
    alert(`Starting WebRTC call with ${user.name} (Placeholder)`);
    console.log("Initiate WebRTC call with:", user);
  };

  const handleOpenTextMessenger = (user: CommunicationUser) => {
    setActiveChatUser(user);
    setIsChatPopupOpen(true);
    console.log("Open text messenger with:", user);
  };

  const handleInitiateBusinessCall = (user: CommunicationUser) => {
    // Placeholder for custom business call logic
    alert(`Initiating business call with ${user.name} (Custom Logic Placeholder)`);
    console.log("Initiate Business Call (custom logic) with:", user);
    // Example: showCustomModal(<div>Calling {user.name}...</div>, "Business Call");
  };

  const closeChatPopup = () => {
    setIsChatPopupOpen(false);
    setActiveChatUser(null);
  };

  // --- Right Sidebar Content Sub-Components ---
  // (These could be moved to separate files for larger applications)

  interface CommunicationUserGroupProps {
    title: string;
    icon: ReactNode;
    users: CommunicationUser[];
    onStartWebRTCCall: (user: CommunicationUser) => void;
    onOpenTextMessenger: (user: CommunicationUser) => void;
    onInitiateBusinessCall: (user: CommunicationUser) => void;
  }

  const CommunicationUserGroup: React.FC<CommunicationUserGroupProps> = ({
    title, icon, users, onStartWebRTCCall, onOpenTextMessenger, onInitiateBusinessCall
  }) => {
    const [isOpen, setIsOpen] = useState(true);
    const groupId = `comm-group-${title.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          aria-expanded={isOpen}
          aria-controls={groupId}
        >
          <div className="flex items-center">
            {icon}
            <span className="ml-2.5">{title} ({users.length})</span>
          </div>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        {isOpen && (
          <ul id={groupId} className="mt-1.5 space-y-1 pl-4 pr-1 max-h-52 overflow-y-auto custom-scrollbar">
            {users.length === 0 ? (
              <li className="px-2 py-1.5 text-xs text-gray-500 italic">No active users in this group.</li>
            ) : (
              users.map(user => (
                <li key={user.id} className="group flex items-center justify-between p-1.5 hover:bg-gray-50 rounded text-sm">
                  <div className="flex items-center truncate">
                    <div className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-gray-800 truncate" title={user.name}>{user.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                    <button title="WebRTC Call" onClick={() => onStartWebRTCCall(user)} className="p-1 text-gray-500 hover:text-indigo-600 rounded-full">
                      <Video size={16} />
                    </button>
                    <button title="Text Message" onClick={() => onOpenTextMessenger(user)} className="p-1 text-gray-500 hover:text-indigo-600 rounded-full">
                      <MessageSquare size={16} />
                    </button>
                    <button title="Business Call" onClick={() => onInitiateBusinessCall(user)} className="p-1 text-gray-500 hover:text-indigo-600 rounded-full">
                      <Phone size={16} />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    );
  };

  const CommunicationSidebarContent: React.FC = () => {
    // In a real app, MOCK_COMMUNICATION_USERS might be passed as a prop or fetched here
    const colleagues = getActiveUsersByTenantType(MOCK_COMMUNICATION_USERS, 'client');
    const suppliers = getActiveUsersByTenantType(MOCK_COMMUNICATION_USERS, 'supplier');
    const customers = getActiveUsersByTenantType(MOCK_COMMUNICATION_USERS, 'customer');

    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between h-16">
          <h3 className="text-lg font-semibold text-gray-800">Messenger</h3>
          {/* Optional: Close button for sidebar itself, if toggle is not preferred */}
        </div>
        <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          <CommunicationUserGroup
            title="Colleagues"
            icon={<Users size={18} className="text-blue-600" />}
            users={colleagues}
            onStartWebRTCCall={handleStartWebRTCCall}
            onOpenTextMessenger={handleOpenTextMessenger}
            onInitiateBusinessCall={handleInitiateBusinessCall}
          />
          <CommunicationUserGroup
            title="Suppliers"
            icon={<Briefcase size={18} className="text-green-600" />}
            users={suppliers}
            onStartWebRTCCall={handleStartWebRTCCall}
            onOpenTextMessenger={handleOpenTextMessenger}
            onInitiateBusinessCall={handleInitiateBusinessCall}
          />
          <CommunicationUserGroup
            title="Customers"
            icon={<Users size={18} className="text-purple-600" />} // Or a more specific customer icon
            users={customers}
            onStartWebRTCCall={handleStartWebRTCCall}
            onOpenTextMessenger={handleOpenTextMessenger}
            onInitiateBusinessCall={handleInitiateBusinessCall}
          />
        </div>
        <div className="p-3 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">© Communications Panel</p>
        </div>
      </div>
    );
  };


  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden"> {/* Parent overflow hidden */}
      {/* Left Sidebar */}
      <div className={`bg-sidebar text-sidebar-foreground flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shadow-lg z-30`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
          {sidebarExpanded && <span className="font-semibold text-lg truncate" title={tenant.name}>{tenant.name}</span>}
          <button onClick={toggleSidebar} className="p-1 rounded hover:bg-sidebar-hover text-sidebar-foreground">
            {sidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.title}
              title={item.title}
              className={`flex items-center w-full p-3 text-sm transition-colors ${
                activeSection === item.title
                  ? 'bg-sidebar-active text-white'
                  : 'hover:bg-sidebar-hover hover:text-sidebar-foreground-hover'
              }`}
              onClick={() => handleNavClick(item.title)}
            >
              {item.icon}
              {sidebarExpanded && <span className="ml-3 truncate">{item.title}</span>}
            </button>
          ))}
        </nav>
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

      {/* Main Content Area & Header Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden"> {/* This div will contain Header and Main content */}
        {/* Header */}
        <header className="bg-white border-b flex flex-col shadow-sm z-20"> {/* z-20 for header */}
          <div className="p-4 flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-700">{activeSection}</h1>
            <div className="flex items-center gap-3 sm:gap-4">
              {headerRightContent}
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
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 text-sm ${notification.read ? 'text-gray-600' : 'bg-indigo-50 font-medium text-gray-800'}`}
                          >
                            <p>{notification.text}</p>
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
              <div className="relative user-menu" ref={userMenuRef}>
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 flex items-center gap-2"
                  onClick={() => setShowUserMenuDropdown(!showUserMenuDropdown)}
                  title="User Menu"
                  aria-expanded={showUserMenuDropdown}
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">
                    {tenant.name.charAt(0).toUpperCase()}
                  </div>
                  {sidebarExpanded && <span className="text-sm font-medium">{tenant.name}</span>}
                </button>
                {showUserMenuDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border" role="menu">
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium text-gray-700">{tenant.name}</p>
                      <p className="text-xs text-gray-500">User Role</p>
                    </div>
                    <div className="py-1">
                      {userMenuItems.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => { item.action(); setShowUserMenuDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                          role="menuitem"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {dashboardCards.length > 0 && pinnedCards.length > 0 && (
            <div className="bg-gray-50 px-4 py-2 flex gap-3 overflow-x-auto border-b items-center custom-scrollbar">
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

        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-50 custom-scrollbar">
          {renderMainContent({
            activeSection, tenant, dashboardCards, minimizedCards, maximizedCard,
            pinnedCards, toggleMinimizeCard, toggleMaximizeCard, togglePinCard,
            showCustomModal, setActiveSection: handleNavClick,
          })}
        </main>
      </div>

      {/* Right Communication Sidebar */}
      <div
        className={`border-l border-gray-200 shadow-lg flex flex-col transition-all duration-300 ease-in-out z-30
                    ${rightSidebarExpanded ? 'w-72' : 'w-0 opacity-0 pointer-events-none'}`} // w-72 is 288px
      >
        {/* Render content only when it would be visible to avoid issues when collapsed to w-0 */}
        {rightSidebarExpanded && <CommunicationSidebarContent />}
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
            <div className="p-4 sm:p-6 min-h-[150px] max-h-[70vh] overflow-y-auto custom-scrollbar">
              {modalContent || <p>Modal content goes here.</p>}
            </div>
            <div className="p-4 sm:p-5 border-t flex justify-end gap-3">
              <button onClick={hideCustomModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Text Messenger Popup */}
      {isChatPopupOpen && activeChatUser && (
        <div
          className={`fixed bottom-0 bg-white w-80 h-[400px] rounded-t-lg shadow-2xl z-50 flex flex-col border border-gray-300
                      transition-all duration-300 ease-in-out
                      ${rightSidebarExpanded ? 'right-[298px]' : 'right-5'}`} // Adjust right based on sidebar state (288px + 10px margin)
        >
          <div className="flex justify-between items-center p-3 bg-indigo-600 text-white rounded-t-lg h-14">
            <h3 className="font-semibold text-sm truncate" title={`Chat with ${activeChatUser.name}`}>Chat with {activeChatUser.name}</h3>
            <button onClick={closeChatPopup} className="p-1 rounded-full hover:bg-indigo-700 text-white">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <p className="text-sm text-gray-700">This is a placeholder chat window for <span className="font-medium">{activeChatUser.name}</span>.</p>
            <p className="text-xs text-gray-500 mt-4">Future messages will appear here.</p>
            {/* Example messages */}
            <div className="mt-4 space-y-2 text-xs">
                <div className="p-2 bg-gray-100 rounded-md w-fit max-w-[80%]">Hello there!</div>
                <div className="p-2 bg-indigo-100 text-indigo-800 rounded-md w-fit max-w-[80%] ml-auto">Hi! How can I help?</div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-200 h-16">
            <input type="text" placeholder="Type a message..." className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
        </div>
      )}

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