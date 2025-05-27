// src/components/dashboard/BaseDashboardLayout.tsx
'use client';

import { useState, useEffect, ReactNode, useRef } from 'react';
import {
  Maximize2,
  Minimize2,
  X,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  Pin,
  Layers,
  ChevronDown,
} from 'lucide-react';
import type { Tenant } from '@prisma/client';
import { useRouter } from 'next/navigation';

// Import the CurrentUser type
import type { CurrentUser } from '@/types/user'; // Correct: Import from its actual file

// Import the new UserMenuDropdown component
import UserMenuDropdown from './UserMenuDropdown'; // Correct: Import the component

// Re-defining Notification here or importing from a shared types file
export interface Notification {
  id: number;
  text: string;
  read: boolean;
}

export interface NavItemConfig {
  icon: ReactNode;
  title: string;
}

export interface DashboardCardConfig {
  id: number;
  title: string;
  themeColorVar?: string;
}

interface BaseDashboardLayoutProps {
  tenant: Tenant;
  dashboardType: 'client' | 'customer' | 'supplier' | string;
  navItems: NavItemConfig[];
  availableCards: DashboardCardConfig[];
  initialActiveSection: string;
  initialNotifications?: Notification[];
  sidebarHeaderTitle?: string;
  currentUser: CurrentUser; // Prop for current user data

  children: (
    activeSection: string,
    maximizedCardId: number | null,
    actions: {
      toggleMinimizeCard: (cardId: number) => void;
      toggleMaximizeCard: (cardId: number) => void;
      togglePinCard: (cardId: number) => void;
      isCardPinned: (cardId: number) => boolean;
      openModalForCard: (cardId: number) => void;
      getCardById: (cardId: number) => DashboardCardConfig | undefined;
      getFilteredCards: () => DashboardCardConfig[];
    }
  ) => ReactNode;

  renderModalContent?: (cardId: number | null, closeModal: () => void) => ReactNode;
  modalTitle?: string;
}

export default function BaseDashboardLayout({
  tenant,
  dashboardType,
  navItems,
  availableCards,
  initialActiveSection,
  initialNotifications = [],
  sidebarHeaderTitle,
  currentUser,
  children,
  renderModalContent,
  modalTitle = "Card Options / Details",
}: BaseDashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState(initialActiveSection);

  const minimizedCardsKey = `minimizedCards_${dashboardType}_${tenant.id}`;
  const pinnedCardsKey = `pinnedCards_${dashboardType}_${tenant.id}`;
  const notificationsKey = `notifications_${dashboardType}_${tenant.id}`;

  const [minimizedCards, setMinimizedCards] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(minimizedCardsKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) { console.error(`Error parsing ${minimizedCardsKey} from localStorage`, e); return []; }
  });

  const [maximizedCard, setMaximizedCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentModalCardId, setCurrentModalCardId] = useState<number | null>(null);

  const [pinnedCards, setPinnedCards] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(pinnedCardsKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) { console.error(`Error parsing ${pinnedCardsKey} from localStorage`, e); return []; }
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window === 'undefined') return initialNotifications;
    try {
      const stored = localStorage.getItem(notificationsKey);
      return stored ? JSON.parse(stored) : initialNotifications;
    } catch (e) {
      console.error(`Error parsing ${notificationsKey} from localStorage`, e);
      return initialNotifications;
    }
  });
  const [showNotifications, setShowNotifications] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null!); // This is type React.RefObject<HTMLButtonElement>
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(minimizedCardsKey, JSON.stringify(minimizedCards));
    }
  }, [minimizedCards, minimizedCardsKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(pinnedCardsKey, JSON.stringify(pinnedCards));
    }
  }, [pinnedCards, pinnedCardsKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(notificationsKey, JSON.stringify(notifications));
    }
  }, [notifications, notificationsKey]);

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  const toggleMinimizeCard = (cardId: number) => {
    setMinimizedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
    if (maximizedCard === cardId) setMaximizedCard(null);
  };
  const toggleMaximizeCard = (cardId: number) => {
    const previousMaximizedCard = maximizedCard;
    setMaximizedCard(currentMaxId => (currentMaxId === cardId ? null : cardId));
    if (previousMaximizedCard !== cardId && cardId !== null) {
        if (minimizedCards.includes(cardId)) {
            setMinimizedCards(prevMinCards => prevMinCards.filter(id => id !== cardId));
        }
    }
  };
  const restoreCardFromMinimized = (cardId: number) => {
    setMinimizedCards(currentMinimizedCards => currentMinimizedCards.filter(id => id !== cardId));
  };
  const togglePinCard = (cardId: number) => {
    setPinnedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
  };
  const isCardPinned = (cardId: number) => pinnedCards.includes(cardId);
  const toggleNotificationsDropdown = () => setShowNotifications(!showNotifications);
  const markAllNotificationsAsRead = () => setNotifications(currentNotifications => currentNotifications.map(n => ({ ...n, read: true })));
  const openModalForCard = (cardId: number) => { setCurrentModalCardId(cardId); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setCurrentModalCardId(null); };
  const getCardById = (cardId: number): DashboardCardConfig | undefined => availableCards.find(c => c.id === cardId);
  const getFilteredCards = (): DashboardCardConfig[] => availableCards.filter(card => !minimizedCards.includes(card.id));

  const handleSignOut = async () => {
    console.log('Signing out user:', currentUser.email);
    setIsUserMenuOpen(false);

    // TODO: Implement your actual sign-out logic here.
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken'); // Example
    }
    
    setTimeout(() => {
      router.push('/login'); // TODO: Update with your actual login page route
    }, 100);
  };

  return (
    <div className="flex h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Sidebar */}
      <div className={`bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--sidebar-border))] h-16">
          {sidebarExpanded && (
            <span className="font-semibold text-lg truncate" title={sidebarHeaderTitle || tenant.name}>
              {sidebarHeaderTitle || tenant.name}
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-[hsl(var(--sidebar-hover-background))] text-[hsl(var(--sidebar-foreground))]"
            aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
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
                  ? 'bg-[hsl(var(--sidebar-active-background))] text-[hsl(var(--sidebar-foreground))]'
                  : 'hover:bg-[hsl(var(--sidebar-hover-background))] hover:text-[hsl(var(--sidebar-foreground-hover))]'
              }`}
              onClick={() => setActiveSection(item.title)}
            >
              {item.icon}
              {sidebarExpanded && <span className="ml-3">{item.title}</span>}
            </button>
          ))}
        </nav>
        {minimizedCards.length > 0 && (
          <div className="border-t border-[hsl(var(--sidebar-border))] p-2">
            <div className={`flex ${sidebarExpanded ? 'flex-wrap gap-2' : 'flex-col items-center gap-2'}`}>
              {minimizedCards.map(cardId => {
                const card = getCardById(cardId);
                return card ? (
                  <button
                    key={cardId}
                    onClick={() => restoreCardFromMinimized(cardId)}
                    title={`Restore ${card.title}`}
                    className="bg-[hsl(var(--sidebar-active-background))] text-xs p-2 rounded flex items-center text-[hsl(var(--sidebar-foreground))] hover:brightness-125 w-full sm:w-auto justify-center"
                  >
                    {sidebarExpanded ? card.title : card.title.charAt(0).toUpperCase()}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] flex flex-col shadow-sm">
          <div className="p-4 flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-[hsl(var(--card-foreground))]">{activeSection}</h1>
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-[hsl(var(--accent))] relative text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent-foreground))]"
                  onClick={toggleNotificationsDropdown}
                  title="Notifications"
                  aria-haspopup="true"
                  aria-expanded={showNotifications}
                >
                  <Bell size={20} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-[hsl(var(--card))] bg-[hsl(var(--destructive))]" aria-label="Unread notifications" />
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-[hsl(var(--popover))] rounded-lg shadow-xl z-20 border border-[hsl(var(--border))]">
                    <div className="p-3 border-b border-[hsl(var(--border))] flex justify-between items-center">
                      <h3 className="font-medium text-sm text-[hsl(var(--popover-foreground))]">Notifications</h3>
                      {notifications.some(n => !n.read) && (
                        <button onClick={markAllNotificationsAsRead} className="text-xs text-[hsl(var(--primary))] hover:underline">
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-[hsl(var(--muted-foreground))]">No new notifications</div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-[hsl(var(--border))] text-sm ${notification.read ? 'text-[hsl(var(--muted-foreground))]' : 'bg-[hsla(var(--primary),0.05)] font-medium text-[hsl(var(--popover-foreground))]'}`}
                          >
                            <p>{notification.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                     {notifications.length > 0 && (
                        <div className="p-2 text-center border-t border-[hsl(var(--border))]">
                            <a href="#" className="text-xs text-[hsl(var(--primary))] hover:underline">View all notifications</a>
                        </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Menu Button & Dropdown Integration */}
              <div className="relative">
                <button
                  ref={userMenuButtonRef}
                  id="user-menu-button"
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="flex items-center p-1 rounded-full hover:bg-[hsl(var(--accent))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--primary))] focus:ring-offset-[hsl(var(--background))]"
                  title="User Menu"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  aria-controls="user-menu-dropdown"
                >
                  <span className="sr-only">Open user menu</span>
                  {currentUser.avatarUrl ? (
                     <img
                        src={currentUser.avatarUrl}
                        alt={`${currentUser.name}'s avatar`}
                        className="h-8 w-8 rounded-full object-cover"
                     />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                        <UserIcon size={20} />
                    </span>
                  )}
                </button>
                <UserMenuDropdown
                  user={currentUser}
                  onSignOut={handleSignOut}
                  isOpen={isUserMenuOpen}
                  onClose={() => setIsUserMenuOpen(false)}
                  buttonRef={userMenuButtonRef} 
                />
              </div>
            </div>
          </div>
          {/* Pinned Cards Bar */}
          {pinnedCards.length > 0 && (
            <div className="bg-[hsl(var(--muted))] px-4 py-2 flex gap-3 overflow-x-auto border-b border-[hsl(var(--border))]">
               {pinnedCards.map(cardId => {
                const card = getCardById(cardId);
                return card ? (
                  <div key={cardId} className="flex items-center px-3 py-1.5 bg-[hsl(var(--card))] rounded-md shadow-sm border border-[hsl(var(--border))] text-sm">
                    <Pin size={14} className="text-[hsl(var(--primary))] mr-2 flex-shrink-0" />
                    <span className="font-medium text-[hsl(var(--card-foreground))] truncate" title={card.title}>{card.title}</span>
                    <button
                      onClick={() => togglePinCard(cardId)}
                      className="ml-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))]"
                      title={`Unpin ${card.title}`}
                      aria-label={`Unpin ${card.title}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-[hsl(var(--muted))]">
          {children(activeSection, maximizedCard, {
            toggleMinimizeCard,
            toggleMaximizeCard,
            togglePinCard,
            isCardPinned,
            openModalForCard,
            getCardById,
            getFilteredCards,
          })}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-[hsl(var(--card))] w-full max-w-2xl rounded-lg shadow-xl">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[hsl(var(--border))]">
              <h2 id="modal-title" className="text-xl font-semibold text-[hsl(var(--card-foreground))]">
                {currentModalCardId && getCardById(currentModalCardId) ? `${getCardById(currentModalCardId)?.title} Options` : modalTitle}
              </h2>
              <button onClick={closeModal} className="p-1.5 rounded-full hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))]" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 sm:p-6 min-h-[200px] max-h-[60vh] overflow-y-auto text-[hsl(var(--card-foreground))]">
              {renderModalContent ? (
                renderModalContent(currentModalCardId, closeModal)
              ) : (
                <>
                  <p>This is a generic modal. Content for the currently active card or action would go here.</p>
                  {currentModalCardId && getCardById(currentModalCardId) && (
                    <p>Options for: {getCardById(currentModalCardId)?.title}</p>
                  )}
                </>
              )}
            </div>
            <div className="p-4 sm:p-6 border-t border-[hsl(var(--border))] flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-[hsl(var(--secondary-foreground))] bg-[hsl(var(--secondary))] hover:brightness-95 rounded-md"
              >
                Close
              </button>
              <button
                onClick={() => { console.log(`Modal action confirmed for card ID: ${currentModalCardId}`); closeModal(); }}
                className="px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for toggle switch */}
      <style jsx global>{`
        .switch { position: relative; display: inline-block; width: 34px; height: 20px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: hsl(var(--muted));
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 12px; width: 12px;
          left: 4px; bottom: 4px;
          background-color: hsl(var(--background));
          transition: .4s;
        }
        input:checked + .slider { background-color: hsl(var(--primary)); }
        input:checked + .slider:before { transform: translateX(14px); }
        .slider.round { border-radius: 20px; }
        .slider.round:before { border-radius: 50%; }
        html.dark .slider:before {
           background-color: hsl(var(--card-foreground));
        }
        @media (prefers-color-scheme: dark) {
          :not(html.light) .slider:before {
            background-color: hsl(var(--card-foreground));
          }
        }
      `}</style>
    </div>
  );
}