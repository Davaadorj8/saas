// src/components/dashboard/UserMenuDropdown.tsx
'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import { User, LogOut, Sun, Moon, HelpCircle, Settings } from 'lucide-react';
import type { CurrentUser } from '@/types/user'; // Adjusted path

interface UserMenuDropdownProps {
  user: CurrentUser;
  onSignOut: () => Promise<void> | void;
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

interface MenuItemConfig {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  action?: () => void;
  isDestructive?: boolean; // For items like "Log Out"
  separatorBefore?: boolean; // To add a separator line before this item
}

export default function UserMenuDropdown({
  user,
  onSignOut,
  isOpen,
  onClose,
  buttonRef,
}: UserMenuDropdownProps) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      setCurrentTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      setCurrentTheme(systemPrefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, []);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('app-theme', newTheme); // Using 'app-theme' to avoid conflicts
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.setAttribute('data-theme', newTheme); // For CSS selectors if needed
    onClose();
  };

  const handleSignOutClick = async () => {
    onClose();
    await onSignOut();
  };

  const menuItems: MenuItemConfig[] = [
    {
      id: 'profile-link',
      label: 'My Profile',
      icon: <Settings size={18} className="mr-2.5 text-[hsl(var(--muted-foreground))]" />,
      href: '/profile', // TODO: Update with your actual profile page route
    },
    {
      id: 'theme-toggle',
      label: `Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`,
      icon: currentTheme === 'light' ? (
        <Moon size={18} className="mr-2.5 text-[hsl(var(--muted-foreground))]" />
      ) : (
        <Sun size={18} className="mr-2.5 text-[hsl(var(--muted-foreground))]" />
      ),
      action: handleThemeToggle,
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <HelpCircle size={18} className="mr-2.5 text-[hsl(var(--muted-foreground))]" />,
      href: '/help', // TODO: Update with your actual help page route
      separatorBefore: true,
    },
    {
      id: 'logout',
      label: 'Log Out',
      icon: <LogOut size={18} className="mr-2.5" />, // Destructive styling applied by className
      action: handleSignOutClick,
      isDestructive: true,
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-60 origin-top-right rounded-md bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] shadow-xl ring-1 ring-[hsl(var(--border))] ring-opacity-50 focus:outline-none z-30"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      {/* User Info Header */}
      <div className="px-3 py-3 border-b border-[hsl(var(--border))]">
        <div className="flex items-center">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user.name}'s avatar`}
              className="h-9 w-9 rounded-full mr-2.5 object-cover"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mr-2.5 text-[hsl(var(--muted-foreground))]">
              <User size={20} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[hsl(var(--popover-foreground))] truncate" title={user.name}>
              {user.name}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] truncate" title={user.email}>
              {user.email}
            </p>
            {user.role && (
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 truncate" title={user.role}>
                {user.role}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1.5" role="none">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.separatorBefore && <hr className="my-1 border-[hsl(var(--border))]" />}
            {item.href ? (
              <Link
                href={item.href}
                className="flex items-center w-full px-3 py-2 text-sm text-[hsl(var(--popover-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] focus:bg-[hsl(var(--accent))] focus:text-[hsl(var(--accent-foreground))] focus:outline-none rounded-sm"
                role="menuitem"
                onClick={onClose}
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <button
                onClick={item.action}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-sm
                  ${
                    item.isDestructive
                      ? 'text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive-foreground))] focus:bg-[hsl(var(--destructive))] focus:text-[hsl(var(--destructive-foreground))]'
                      : 'text-[hsl(var(--popover-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] focus:bg-[hsl(var(--accent))] focus:text-[hsl(var(--accent-foreground))]'
                  } focus:outline-none`}
                role="menuitem"
              >
                {item.icon}
                {item.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}