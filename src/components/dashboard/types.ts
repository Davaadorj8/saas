// src/components/dashboard/types.ts
import { ReactNode } from 'react';
// 1. IMPORT 'Tenant' from Prisma FIRST
import type { Tenant as PrismaTenantType } from '@prisma/client'; // Use a distinct alias for the import

// 2. DEFINE and EXPORT your 'Tenant' type based on the Prisma type.
//    This 'Tenant' will be the one used throughout this file and by importers.
export type Tenant = PrismaTenantType;

// --- Navigation and Core Layout ---

export interface NavItem {
    icon?: React.ReactElement;
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

/**
 * Defines the signature for the function used to display a custom modal.
 */
export type ShowCustomModalType = (content: ReactNode, title?: string) => void;

/**
 * Parameters passed to the `renderMainContent` function.
 * This allows the main content area to interact with the dashboard layout's state and functions.
 */
export interface RenderMainContentParams { // <-- Error was here (line ~50)
  activeSection: string;
  tenant: Tenant; // This should now correctly refer to the 'Tenant' type exported above
  dashboardCards?: DashboardCard[];
  minimizedCards: Array<string | number>;
  maximizedCard: string | number | null;
  pinnedCards: Array<string | number>;
  toggleMinimizeCard: (cardId: string | number) => void;
  toggleMaximizeCard: (cardId: string | number) => void;
  togglePinCard: (cardId: string | number) => void;
  showCustomModal: ShowCustomModalType; // Function to display a custom modal
  setActiveSection: (sectionTitle: string) => void; // Allow main content to change section
}

/**
 * Props for the BaseDashboardLayout component.
 */
export interface BaseDashboardLayoutProps { // <-- Error was here (line ~66)
  tenant: Tenant; // This should now correctly refer to the 'Tenant' type exported above
  tenantType: string; // e.g., "customer", "client", "supplier" for localStorage keys
  navItems: NavItem[];
  dashboardCards?: DashboardCard[];
  initialActiveSection?: string;
  initialNotifications?: Notification[];
  renderMainContent: (params: RenderMainContentParams) => ReactNode;
  headerRightContent?: ReactNode; // Optional: For custom content next to notifications/menu
  sidebarFooterContent?: ReactNode; // Optional: For custom content at the bottom of the sidebar
  // Consider passing communicationUsers here if fetched from a higher level
  // communicationUsers?: CommunicationUser[];
}

// --- Communication Sidebar Specific Types ---

export interface CommunicationUser {
  id: string;
  name: string;
  avatarUrl?: string; // Optional URL for user's avatar image
  isActive: boolean;
  /**
   * Type of tenant this user belongs to, used for grouping in the communication sidebar.
   * 'client' typically refers to internal colleagues/users of the primary tenant.
   * 'supplier' and 'customer' refer to external tenant types.
   */
  tenantType: 'client' | 'supplier' | 'customer';
}

// --- Potentially other shared dashboard types can go here ---