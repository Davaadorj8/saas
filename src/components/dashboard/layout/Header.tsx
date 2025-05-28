// src/components/dashboard/layout/Header.tsx
import { ReactNode, useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import type { Tenant } from '@prisma/client';
import { Notification, DashboardCard, Tenant as TenantType } from '../types';
import NotificationsDropdown from './NotificationsDropdown';
import UserMenuDropdown, { UserMenuItem } from './UserMenuDropdown';
import PinnedCardsBar from './PinnedCardsBar';

interface HeaderProps {
  tenant: TenantType;
  activeSection: string;
  notifications: Notification[];
  onMarkAllNotificationsRead: () => void;
  onViewAllNotifications: () => void;
  userMenuItems: UserMenuItem[];
  onUserMenuItemClick: (action: () => void) => void;
  headerRightContent?: ReactNode;
  pinnedCards: Array<string | number>;
  dashboardCards: DashboardCard[];
  onTogglePinCard: (cardId: string | number) => void;
  isLeftSidebarExpanded: boolean;
}

export default function Header({
  tenant,
  activeSection,
  notifications,
  onMarkAllNotificationsRead,
  onViewAllNotifications,
  userMenuItems,
  onUserMenuItemClick,
  headerRightContent,
  pinnedCards,
  dashboardCards,
  onTogglePinCard,
  isLeftSidebarExpanded
}: HeaderProps) {
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showUserMenuDropdown, setShowUserMenuDropdown] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenuDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotificationsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b flex flex-col shadow-sm z-20">
      <div className="p-4 flex justify-between items-center h-16">
        <h1 className="text-xl font-semibold text-gray-700">{activeSection}</h1>
        <div className="flex items-center gap-3 sm:gap-4">
          {headerRightContent}
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600"
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              title="Notifications"
            >
              <Bell size={20} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500" />
              )}
            </button>
            {showNotificationsDropdown && (
              <NotificationsDropdown
                notifications={notifications}
                onMarkAllRead={() => {
                  onMarkAllNotificationsRead();
                }}
                onViewAll={() => {
                  onViewAllNotifications();
                  setShowNotificationsDropdown(false);
                }}
              />
            )}
          </div>
          {/* User Menu */}
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
              {isLeftSidebarExpanded && <span className="text-sm font-medium">{tenant.name}</span>}
            </button>
            {showUserMenuDropdown && (
              <UserMenuDropdown
                tenant={tenant}
                userMenuItems={userMenuItems}
                onItemClick={(action: () => void) => {
                  onUserMenuItemClick(action);
                  setShowUserMenuDropdown(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <PinnedCardsBar
        pinnedCards={pinnedCards}
        dashboardCards={dashboardCards}
        onTogglePin={onTogglePinCard}
      />
    </header>
  );
}
