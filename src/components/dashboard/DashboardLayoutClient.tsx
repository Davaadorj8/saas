// src/components/dashboard/DashboardLayoutClient.tsx
'use client';

import { ReactNode } from 'react';
import {
  Home,
  Layers,
  User,
  Settings,
  Bell,
  Maximize2,
  Minimize2,
  Pin,
  X,
  PlusCircle,
  ChevronRight, // For Quick Links
} from 'lucide-react';
import type { Tenant } from '@prisma/client';

import BaseDashboardLayout, {
  NavItem,
  DashboardCard as BaseDashboardCard,
  Notification as BaseNotification,
  RenderMainContentParams,
} from './BaseDashboardLayout'; // Adjust path as necessary

interface DashboardLayoutClientProps {
  tenant: Tenant;
  initialDashboardContent: ReactNode; // This is the content for the "Overview" section
}

// OriginalQuickBoardComponent can be moved here or imported if it's complex and used elsewhere
const OriginalQuickBoardComponent = ({ showCustomModal }: { showCustomModal: RenderMainContentParams['showCustomModal'] }) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Quick Links</h2>
          <div className="flex gap-1">
            {/* Card controls can be managed by BaseDashboardLayout if this becomes a "card" */}
            <button onClick={() => showCustomModal(<div>Maximize Quick Links</div>, "Maximize Quick Links")} className="p-1 rounded hover:bg-gray-100"><Maximize2 size={16} /></button>
            <button onClick={() => showCustomModal(<div>Minimize Quick Links</div>, "Minimize Quick Links")} className="p-1 rounded hover:bg-gray-100"><Minimize2 size={16} /></button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex border-b mb-4">
            <button className="px-4 py-2 font-medium border-b-2 border-orange-500 text-orange-600">Supplier</button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Customer</button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Product</button>
          </div>
          <div className="space-y-4">
            {['Supplier View', 'Customer Portal', 'Product Catalog'].map(item => (
              <div key={item} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">⊙</span>
                  <span>{item}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-gray-700"><PlusCircle size={16} /></button>
                  <button className="text-gray-500 hover:text-gray-700"><ChevronRight size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Summary Stats</h2>
           <div className="flex gap-1">
            <button onClick={() => showCustomModal(<div>Maximize Summary Stats</div>, "Maximize Summary Stats")} className="p-1 rounded hover:bg-gray-100"><Maximize2 size={16} /></button>
            <button onClick={() => showCustomModal(<div>Minimize Summary Stats</div>, "Minimize Summary Stats")} className="p-1 rounded hover:bg-gray-100"><Minimize2 size={16} /></button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="p-4 border rounded bg-gray-50">
            <h3 className="font-medium">Analytics Snapshot</h3>
            <p className="text-sm text-gray-600">Key metrics will be displayed here.</p>
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <h3 className="font-medium">Recent Activity</h3>
            <p className="text-sm text-gray-600">Summary of recent actions.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Recent Invoices</h2>
         <div className="flex gap-1">
            <button onClick={() => showCustomModal(<div>Maximize Recent Invoices</div>, "Maximize Recent Invoices")} className="p-1 rounded hover:bg-gray-100"><Maximize2 size={16} /></button>
            <button onClick={() => showCustomModal(<div>Minimize Recent Invoices</div>, "Minimize Recent Invoices")} className="p-1 rounded hover:bg-gray-100"><Minimize2 size={16} /></button>
          </div>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium text-gray-600">Invoice ID</th>
                <th className="text-left p-2 font-medium text-gray-600">Status</th>
                <th className="text-left p-2 font-medium text-gray-600">Method</th>
                <th className="text-right p-2 font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">INV001</td>
                <td className="p-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Paid</span></td>
                <td className="p-2">Credit Card</td>
                <td className="p-2 text-right text-blue-600 font-medium">$250.00</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">INV002</td>
                <td className="p-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Pending</span></td>
                <td className="p-2">Direct Transfer</td>
                <td className="p-2 text-right text-blue-600 font-medium">$150.00</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-2">INV003</td>
                <td className="p-2"><span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">Overdue</span></td>
                <td className="p-2">Paypal</td>
                <td className="p-2 text-right text-blue-600 font-medium">$300.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">A list of recent financial transactions.</div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md text-sm font-medium">Create New Invoice</button>
        </div>
      </div>
    </div>
  </div>
);


export default function DashboardLayoutClient({
  tenant,
  initialDashboardContent,
}: DashboardLayoutClientProps) {
  // --- Configuration Specific to Client Dashboard ---
  const tenantType = 'client'; // Make sure this matches what you use in BaseDashboardLayout for localStorage keys

  const navItems: NavItem[] = [
    { icon: <Home size={20} />, title: 'Overview' },
    { icon: <Layers size={20} />, title: 'Main Board' }, // For card-based widgets
    { icon: <Layers size={20} />, title: 'Quick Board' }, // For the original complex component
    { icon: <User size={20} />, title: 'My Account' },
    { icon: <Bell size={20} />, title: 'Notifications' },
    { icon: <Settings size={20} />, title: 'Settings' },
  ];

  const clientDashboardCards: BaseDashboardCard[] = [
    { id: 'client-card-1', title: 'Global Analytics', color: 'bg-blue-100' },
    { id: 'client-card-2', title: 'Team Tasks', color: 'bg-green-100' },
    { id: 'client-card-3', title: 'Financial Reports', color: 'bg-yellow-100' },
    { id: 'client-card-4', title: 'User Management', color: 'bg-purple-100' },
  ];

  const initialNotifications: BaseNotification[] = [
    { id: 'client-notif-1', text: `Welcome to ${tenant.name}'s client dashboard!`, read: false, timestamp: new Date().toISOString() },
    { id: 'client-notif-2', text: "System update scheduled for tonight.", read: false, timestamp: new Date().toISOString() },
    { id: 'client-notif-3', text: "Your monthly report is ready.", read: true, timestamp: new Date().toISOString() },
  ];

  // --- Main Content Renderer ---
  const renderMainContent = ({
    activeSection,
    dashboardCards = clientDashboardCards, // Default to client cards
    minimizedCards,
    maximizedCard,
    pinnedCards,
    toggleMinimizeCard,
    toggleMaximizeCard,
    togglePinCard,
    showCustomModal,
  }: RenderMainContentParams): ReactNode => {
    switch (activeSection) {
      case 'Overview':
        return initialDashboardContent;

      case 'Main Board': // This section uses the card layout from BaseDashboardLayout
        if (maximizedCard !== null && dashboardCards.some(c => c.id === maximizedCard)) {
          const card = dashboardCards.find(c => c.id === maximizedCard);
          return (
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">{card?.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => togglePinCard(maximizedCard)}
                    className={`p-1.5 rounded hover:bg-gray-100 ${pinnedCards.includes(maximizedCard) ? 'text-indigo-600' : 'text-gray-500'}`}
                    title={pinnedCards.includes(maximizedCard) ? "Unpin Card" : "Pin Card"}
                  >
                    <Pin size={18} />
                  </button>
                  <button
                    onClick={() => toggleMinimizeCard(maximizedCard)}
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                    title="Minimize Card"
                  >
                    <Minimize2 size={18} />
                  </button>
                  <button
                    onClick={() => toggleMaximizeCard(maximizedCard)} // This will set maximizedCard to null
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                    title="Restore Down"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 rounded p-4 flex items-center justify-center text-gray-600">
                Maximized Content for {card?.title} (Client).
                {/* Example: <AnalyticsDetailsWidget data={card.data} /> */}
              </div>
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dashboardCards
              .filter(card => !minimizedCards.includes(card.id))
              .map(card => (
                <div
                  key={card.id}
                  className={`${card.color || 'bg-indigo-100'} rounded-lg shadow-md p-4 min-h-[160px] flex flex-col transition-shadow hover:shadow-lg`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-700">{card.title}</h3>
                    <div className="flex gap-1">
                      <button onClick={() => togglePinCard(card.id)} className={`p-1 rounded hover:bg-white/30 ${pinnedCards.includes(card.id) ? 'text-indigo-700' : 'text-gray-600'}`} title={pinnedCards.includes(card.id) ? "Unpin" : "Pin"}> <Pin size={16} /> </button>
                      <button onClick={() => toggleMinimizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-gray-600" title="Minimize"> <Minimize2 size={16} /> </button>
                      <button onClick={() => toggleMaximizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-gray-600" title="Maximize"> <Maximize2 size={16} /> </button>
                      <button
                        onClick={() => showCustomModal(
                          <div>Client-specific modal content for {card.title}.</div>,
                          `${card.title} - Options`
                        )}
                        className="p-1 rounded hover:bg-white/30 text-gray-600"
                        title="More Options"
                      >
                        <Layers size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                    Summary for {card.title} (Client).
                  </div>
                </div>
            ))}
            <button
              onClick={() => showCustomModal(
                <div>Form or options to add a new widget to the client main board.</div>,
                "Add New Widget"
              )}
              className="bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm p-4 min-h-[160px] flex flex-col items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors group"
            >
              <PlusCircle size={32} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Add Widget</span>
            </button>
          </div>
        );

      case 'Quick Board': // Section for the original complex component
        return <OriginalQuickBoardComponent showCustomModal={showCustomModal} />;

      case 'My Account':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Client Account</h2>
            <p>Details specific to the logged-in client user.</p>
            <p>Tenant ID: {tenant.id}</p>
            <p>Tenant Name: {tenant.name}</p>
            {/* Add more user-specific details here */}
          </div>
        );

      case 'Notifications':
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">All Client Notifications</h2>
                <p>This page would display a full list of your client-related notifications.</p>
                <ul>
                    {initialNotifications.map(n => <li key={n.id} className={`${n.read ? 'text-gray-500' : 'font-bold'}`}>{n.text}</li>)}
                </ul>
            </div>
        );

      case 'Settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Client Application Settings</h2>
            <p>Configuration options relevant to the client experience.</p>
            {/* Add client-specific settings toggles/forms */}
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-lg text-gray-500">
            Content for '{activeSection}' (Client) is not yet implemented.
          </div>
        );
    }
  };

  return (
    <BaseDashboardLayout
      tenant={tenant}
      tenantType={tenantType}
      navItems={navItems}
      dashboardCards={clientDashboardCards} // Pass client-specific cards for the 'Main Board'
      initialNotifications={initialNotifications}
      renderMainContent={renderMainContent}
      initialActiveSection="Overview" // Default to Overview
    />
  );
}