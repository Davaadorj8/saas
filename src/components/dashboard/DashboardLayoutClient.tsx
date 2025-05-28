// src/components/dashboard/DashboardLayoutClient.tsx
'use client';

import { ReactNode } from 'react';
import {
  Home, Layers, User, Settings, Bell,
  Tag, Megaphone, FileText, Wrench, ShoppingCart, Package as PackageIcon, Truck, Users as UsersIcon,
} from 'lucide-react';
import type { Tenant } from '@prisma/client';

// Import BaseDashboardLayout component (default export)
import BaseDashboardLayout from './BaseDashboardLayout';

// Import general dashboard types from ./types
import {
  NavItem,
  DashboardCard as BaseDashboardCard,
  Notification as BaseNotification,
  RenderMainContentParams,
  // Assuming ShowCustomModalType would also be in ./types if needed globally
} from './types'; // This path is for general dashboard types

// Import QuickBoard specific types from ./quickboard/types
import {
  QuickBoardPlugin,
  BasePluginComponentProps,
} from './quickboard/types'; // Corrected path for QuickBoard types

// Import QuickBoard component
import OriginalQuickBoardComponent from './quickboard/QuickBoardComponent';

// --- IMPORT YOUR EXISTING QUICKBOARD PLUGINS ---
import UserCountQuickBoardPlugin from './quickboard/plugins/UserCountQuickBoardPlugin';
import ManyChatControlQuickBoardPlugin from './quickboard/plugins/ManyChatControlQuickBoardPlugin';
import LaunchManyChatControlPlugin from './quickboard/plugins/LaunchManyChatControlPlugin';

// --- MODULE AND SUBMODULE DEFINITIONS ---

type IconType = React.ReactElement;

interface SubmoduleDefinition {
  id: string;
  name: string;
  purpose?: string;
  pluginDefinition?: string; // Maps to a QuickBoard plugin ID
}

interface ModuleDefinition {
  id: string;
  name: string;
  navTitle: string;
  icon: IconType;
  purpose: string;
  submodules: SubmoduleDefinition[];
}

const appModules: ModuleDefinition[] = [
  {
    id: 'sales',
    name: 'Sales',
    navTitle: '🏷️ Sales',
    icon: <Tag size={20} />,
    purpose: 'Customer-facing processes like registration, booking, orders.',
    submodules: [
      { id: 'sales-registration', name: 'Registration Booking', purpose: 'Handle new client registrations and initial bookings.' },
      { id: 'sales-orders', name: 'Orders', purpose: 'Manage and track customer orders.' },
      { id: 'sales-client-history', name: 'Client History', purpose: 'View past interactions and purchases of clients.' },
      { id: 'sales-agent-management', name: 'Agent Management', purpose: 'Oversee sales agents and their performance.' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    navTitle: '📢 Marketing',
    icon: <Megaphone size={20} />,
    purpose: 'Campaigns, outreach, CRM, integrations (ManyChat, email, FB).',
    submodules: [
      { id: 'marketing-social-campaigns', name: 'Social Campaigns (ManyChat)', purpose: 'Manage social media campaigns, e.g., via ManyChat.', pluginDefinition: 'manychatControlEmbedded' },
      { id: 'marketing-email-blasts', name: 'Email Blasts', purpose: 'Send out mass email communications.' },
      { id: 'marketing-meta-ads', name: 'Meta Ads', purpose: 'Manage advertising campaigns on Meta platforms.' },
      { id: 'marketing-campaign-performance', name: 'Campaign Performance', purpose: 'Track and analyze the effectiveness of marketing campaigns.' },
    ],
  },
  {
    id: 'accounting',
    name: 'Accounting',
    navTitle: '🧾 Accounting',
    icon: <FileText size={20} />,
    purpose: 'Financial tracking: invoices, bank reconciliation, transactions.',
    submodules: [
      { id: 'accounting-bank-statements', name: 'Bank Statements', purpose: 'View and manage bank statements.' },
      { id: 'accounting-reconciliation', name: 'Reconciliation', purpose: 'Reconcile financial accounts.' },
      { id: 'accounting-payment-logs', name: 'Payment Logs', purpose: 'Track all payment transactions.' },
      { id: 'accounting-invoicing', name: 'Invoicing', purpose: 'Create and manage invoices.' },
    ],
  },
  {
    id: 'productBuilder',
    name: 'Product Builder',
    navTitle: '🛠️ Product Builder',
    icon: <Wrench size={20} />,
    purpose: 'Creation/assembly of travel products and experiences.',
    submodules: [
      { id: 'pb-create-trips', name: 'Create Trips', purpose: 'Design and define new travel itineraries.' },
      { id: 'pb-configure-packages', name: 'Configure Packages', purpose: 'Assemble services into sellable packages.' },
      { id: 'pb-define-services', name: 'Define Services', purpose: 'Manage individual services offered.' },
      { id: 'pb-price-management', name: 'Price Management', purpose: 'Set and adjust pricing for products and services.' },
    ],
  },
  {
    id: 'salesInventory',
    name: 'Sales Inventory',
    navTitle: '🛍️ Sales Inventory',
    icon: <ShoppingCart size={20} />,
    purpose: 'Stock of ready-to-sell packages and configured services/products.',
    submodules: [
      { id: 'si-stock-overview', name: 'Stock Overview', purpose: 'View current levels of sellable items.' },
      { id: 'si-availability-calendar', name: 'Availability Calendar', purpose: 'Check availability of products/services over time.' },
      { id: 'si-seasonal-inventory', name: 'Seasonal Inventory', purpose: 'Manage inventory adjustments for different seasons.' },
      { id: 'si-status-updates', name: 'Status Updates', purpose: 'Track and update the status of inventory items.' },
    ],
  },
  {
    id: 'assets',
    name: 'Assets',
    navTitle: '📦 Assets',
    icon: <PackageIcon size={20} />,
    purpose: 'Physical warehouse materials (SIMs, gear, print items, etc.).',
    submodules: [
      { id: 'assets-physical-items', name: 'Physical Items', purpose: 'Track individual physical assets.' },
      { id: 'assets-serial-tracking', name: 'Serial Tracking', purpose: 'Manage items by serial number.' },
      { id: 'assets-restocking', name: 'Restocking', purpose: 'Handle the process of replenishing stock.' },
      { id: 'assets-usage-logs', name: 'Usage Logs', purpose: 'Log the usage of assets.' },
    ],
  },
  {
    id: 'suppliers',
    name: 'Suppliers',
    navTitle: '🚚 Suppliers',
    icon: <Truck size={20} />,
    purpose: 'Registered vendors providing services or materials.',
    submodules: [
      { id: 'sup-directory', name: 'Supplier Directory', purpose: 'View and manage supplier profiles.', pluginDefinition: 'supplierDirectory' },
      { id: 'sup-contracts', name: 'Contracts & Terms', purpose: 'Store agreements, rates, service scopes.', pluginDefinition: 'supplierContracts' },
      { id: 'sup-ratings', name: 'Performance Ratings', purpose: 'Rate/review suppliers based on service quality.', pluginDefinition: 'supplierRatings' },
      { id: 'sup-payment-setup', name: 'Payment Setup', purpose: 'Bank details, payment preferences, tax info.', pluginDefinition: 'supplierPaymentSetup' },
    ],
  },
  {
    id: 'customers',
    name: 'Customers',
    navTitle: '👥 Customers',
    icon: <UsersIcon size={20} />,
    purpose: 'Registered clients with booking/interactions and CRM history.',
    submodules: [
      { id: 'cust-directory', name: 'Customer Directory', purpose: 'View/edit client profiles.', pluginDefinition: 'customerDirectory' },
      { id: 'cust-notes', name: 'Notes & Tags', purpose: 'Add internal notes, tag clients.', pluginDefinition: 'customerNotes' },
      { id: 'cust-interaction-log', name: 'Interaction History', purpose: 'View logs of communications and activity.', pluginDefinition: 'customerInteractionLog' },
      { id: 'cust-preferences', name: 'Loyalty & Preferences', purpose: 'Store loyalty levels, preferences, special requests.', pluginDefinition: 'customerPreferences' },
    ],
  },
];

// --- END MODULE AND SUBMODULE DEFINITIONS ---


// --- PLACEHOLDER QUICKBOARD PLUGINS FOR SUBMODULES ---
const createPlaceholderPlugin = (pluginId: string, pluginName: string): React.FC<BasePluginComponentProps> => {
  const PlaceholderComponent: React.FC<BasePluginComponentProps> = ({ showCustomModal }) => (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Placeholder: {pluginName}</h3>
      <p className="text-sm text-gray-600">Plugin ID: <code>{pluginId}</code></p>
      <p className="mt-2">This is a placeholder component for the {pluginName} plugin. Full functionality would be implemented here.</p>
      {showCustomModal && (
        <button
          onClick={() => showCustomModal(<div>Detailed content for {pluginName} from placeholder.</div>, `${pluginName} - Detail View`)}
          className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
        >
          Show Detail Modal Example
        </button>
      )}
    </div>
  );
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


interface DashboardLayoutClientProps {
  tenant: Tenant;
  initialDashboardContent: ReactNode;
}

export default function DashboardLayoutClient({
  tenant,
  initialDashboardContent,
}: DashboardLayoutClientProps) {
  const tenantType = 'client';

  const moduleNavItems: NavItem[] = appModules.map(module => ({
    icon: module.icon,
    title: module.navTitle,
  }));

  const staticTopNavItems: NavItem[] = [
    { icon: <Home size={20} />, title: 'Overview' },
    { icon: <Layers size={20} />, title: 'Quick Board' },
  ];
  
  const staticBottomNavItems: NavItem[] = [
    { icon: <User size={20} />, title: 'My Account' },
    { icon: <Bell size={20} />, title: 'Notifications' },
    { icon: <Settings size={20} />, title: 'Settings' },
  ];

  const navItems: NavItem[] = [
    ...staticTopNavItems,
    ...moduleNavItems,
    ...staticBottomNavItems, 
  ];

  const clientDashboardCards: BaseDashboardCard[] = [
    { id: 'client-card-1', title: 'Global Analytics', color: 'bg-blue-100' },
    { id: 'client-card-2', title: 'Team Tasks', color: 'bg-green-100' },
  ];

  const initialNotifications: BaseNotification[] = [
    { id: 'client-notif-1', text: `Welcome to ${tenant.name}'s client dashboard!`, read: false, timestamp: new Date().toISOString() },
  ];

  const getCurrentUserRoles = (): string[] => {
    return ['admin', 'marketing_user', 'analyst_user', 'procurement_user', 'sales_user', 'support_user'];
  };
  const currentUserRoles = getCurrentUserRoles();

  const availableQuickBoardPlugins: QuickBoardPlugin<any>[] = [
    {
      id: 'userCount',
      title: 'User Statistics',
      component: UserCountQuickBoardPlugin,
      roles: ['admin', 'analyst_user'],
    },
    {
      id: 'launchManyChatPanel',
      title: 'ManyChat Actions',
      component: LaunchManyChatControlPlugin,
      roles: ['admin', 'marketing_user'],
      props: {
        buttonLabel: "Open ManyChat Panel",
        modalTitle: "ManyChat Control Center"
      }
    },
    {
      id: 'manychatControlEmbedded', 
      title: 'Embedded ManyChat Controls',
      component: ManyChatControlQuickBoardPlugin,
      roles: ['admin', 'marketing_user'],
    },
    { id: 'supplierDirectory', title: 'Supplier Directory', component: SupplierDirectoryQuickBoardPlugin, roles: ['admin', 'procurement_user'] },
    { id: 'supplierContracts', title: 'Supplier Contracts', component: SupplierContractsQuickBoardPlugin, roles: ['admin', 'procurement_user'] },
    { id: 'supplierRatings', title: 'Supplier Ratings', component: SupplierRatingsQuickBoardPlugin, roles: ['admin', 'procurement_user'] },
    { id: 'supplierPaymentSetup', title: 'Supplier Payment Setup', component: SupplierPaymentSetupQuickBoardPlugin, roles: ['admin', 'procurement_user'] },
    { id: 'customerDirectory', title: 'Customer Directory', component: CustomerDirectoryQuickBoardPlugin, roles: ['admin', 'sales_user', 'support_user'] },
    { id: 'customerNotes', title: 'Customer Notes & Tags', component: CustomerNotesQuickBoardPlugin, roles: ['admin', 'sales_user', 'support_user'] },
    { id: 'customerInteractionLog', title: 'Customer Interaction Log', component: CustomerInteractionLogQuickBoardPlugin, roles: ['admin', 'sales_user', 'support_user'] },
    { id: 'customerPreferences', title: 'Customer Preferences', component: CustomerPreferencesQuickBoardPlugin, roles: ['admin', 'sales_user', 'support_user'] },
  ];

  const renderMainContent = ({
    activeSection,
    showCustomModal,
  }: RenderMainContentParams): ReactNode => {
    const activeModule = appModules.find(module => module.navTitle === activeSection);

    if (activeModule) {
      return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-1">
            <span className="text-2xl mr-2">{activeModule.icon}</span>
            <h2 className="text-2xl font-semibold text-gray-800">{activeModule.name}</h2>
          </div>
          <p className="text-gray-600 mb-6 ml-10">{activeModule.purpose}</p>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Submodules</h3>
          {activeModule.submodules.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeModule.submodules.map(submodule => {
                const qbPlugin = availableQuickBoardPlugins.find(p => p.id === submodule.pluginDefinition);
                return (
                  <div key={submodule.id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-medium text-gray-700 mb-1">{submodule.name}</h4>
                    {submodule.purpose && <p className="text-sm text-gray-500 mb-2">{submodule.purpose}</p>}
                    {submodule.pluginDefinition && (
                      <div className="text-xs text-gray-400 mb-2">
                        Plugin ID: <code>{submodule.pluginDefinition}</code>
                        {qbPlugin ? <span className="text-green-600 ml-1 font-semibold">(✓ Plugin Ready)</span> : <span className="text-orange-500 ml-1">(Plugin not registered)</span>}
                      </div>
                    )}
                    {qbPlugin && qbPlugin.component && showCustomModal && (
                       <button
                         onClick={() => showCustomModal(
                           <qbPlugin.component
                             showCustomModal={showCustomModal}
                             {...(qbPlugin.props || {})}
                           />,
                           submodule.name
                         )}
                         className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors"
                       >
                         Launch {submodule.name}
                       </button>
                    )}
                    {!qbPlugin && submodule.pluginDefinition && (
                        <p className="mt-2 text-sm text-red-500">This submodule plugin is defined but not available for launch.</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No submodules defined for this module.</p>
          )}
        </div>
      );
    }

    switch (activeSection) {
      case 'Overview':
        return initialDashboardContent;
      case 'Quick Board':
        return (
          <OriginalQuickBoardComponent
            showCustomModal={showCustomModal}
            plugins={availableQuickBoardPlugins}
            userRoles={currentUserRoles}
          />
        );
      case 'My Account':
        return ( <div className="bg-white p-6 rounded-lg shadow"> <h2 className="text-xl font-semibold mb-4">My Client Account</h2> <p>Details about the client's account would go here.</p></div> );
      case 'Notifications':
        return ( <div className="bg-white p-6 rounded-lg shadow"> <h2 className="text-xl font-semibold mb-4">All Client Notifications</h2> <p>A list or feed of notifications.</p></div> );
      case 'Settings':
        return ( <div className="bg-white p-6 rounded-lg shadow"> <h2 className="text-xl font-semibold mb-4">Client Application Settings</h2> <p>User-configurable settings.</p></div> );
      default:
        return ( <div className="flex items-center justify-center h-full text-lg text-gray-500"> Content for '{activeSection}' (Client) is not yet implemented. </div> );
    }
  };

  return (
    <BaseDashboardLayout
      tenant={tenant}
      tenantType={tenantType}
      navItems={navItems}
      dashboardCards={clientDashboardCards}
      initialNotifications={initialNotifications}
      renderMainContent={renderMainContent}
      initialActiveSection="Overview"
    />
  );
}