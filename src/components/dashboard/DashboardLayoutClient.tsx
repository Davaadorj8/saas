// src/components/dashboard/DashboardLayoutClient.tsx
'use client';

import { ReactNode } from 'react';
import {
  Home,
  User,
  Settings,
  Layers, // Also used for "More Options" on cards
  PlusCircle, // For "Add Widget" button AND in OriginalQuickBoardComponent
  ChevronRight, // <<< --- ADDED THIS IMPORT BACK --- >>>
  // Icons for card actions (Pin, Maximize2, Minimize2, X) are handled by BaseDashboardLayout
  // or accessible via its 'actions' prop.
  Maximize2,
  Minimize2,
  Pin,
  X
} from 'lucide-react';
import type { Tenant } from '@prisma/client';
import BaseDashboardLayout, {
  NavItemConfig,
  DashboardCardConfig,
  // Notification // Assuming Notification type is exported from Base or a shared file
} from './BaseDashboardLayout'; // Import BaseDashboardLayout and shared types

interface DashboardLayoutClientProps {
  tenant: Tenant;
  initialDashboardContent: ReactNode; // Content for the main 'Overview' section
}

// --- Client Specific Configurations ---
const clientNavItems: NavItemConfig[] = [
  { icon: <Home size={20} />, title: 'Overview' },
  { icon: <Layers size={20} />, title: 'Main Board' },
  { icon: <User size={20} />, title: 'My Account' },
  { icon: <Settings size={20} />, title: 'Settings' },
  // Example: To show OriginalQuickBoardComponent, add a nav item:
  // { icon: <Layers size={20} />, title: 'Quick Board (Original)' },
];

// Cards for the "Main Board" section
const clientMainBoardCards: DashboardCardConfig[] = [
  { id: 1, title: 'Global Analytics', themeColorVar: '--chart-1' },
  { id: 2, title: 'Team Tasks', themeColorVar: '--chart-2' },
  { id: 3, title: 'Financial Reports', themeColorVar: '--chart-3' },
  { id: 4, title: 'User Management', themeColorVar: '--chart-4' },
];

// Initial notifications specific to clients
const clientInitialNotifications = (tenantName: string) => [
  { id: 1, text: `Welcome to ${tenantName}'s client dashboard!`, read: false },
  { id: 2, text: "System update scheduled for tonight.", read: false },
  { id: 3, text: "Your monthly report is ready.", read: true },
];

// OriginalQuickBoardComponent from the provided code.
// It's not directly used by BaseDashboardLayout's card system
// but can be rendered as content for a specific section.
const OriginalQuickBoardComponent = () => (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[hsl(var(--card))] rounded-lg shadow">
          <div className="p-4 border-b border-[hsl(var(--border))] flex justify-between items-center">
            <h2 className="font-semibold text-[hsl(var(--card-foreground))]">Quick Links</h2>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Maximize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Minimize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><X size={16} /></button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex border-b border-[hsl(var(--border))] mb-4">
              <button className="px-4 py-2 font-medium border-b-2 border-[hsl(var(--chart-3))] text-[hsl(var(--chart-3))]">Supplier</button>
              <button className="px-4 py-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Customer</button>
              <button className="px-4 py-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Product</button>
            </div>
            <div className="space-y-4">
              {['Supplier View', 'Customer Portal', 'Product Catalog'].map(item => (
                <div key={item} className="flex justify-between items-center p-2 hover:bg-[hsl(var(--accent))] rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="text-[hsl(var(--muted-foreground))]">⊙</span>
                    <span className="text-[hsl(var(--card-foreground))]">{item}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"><PlusCircle size={16} /></button>
                    <button className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"><ChevronRight size={16} /></button> {/* This line caused the error */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[hsl(var(--card))] rounded-lg shadow">
          <div className="p-4 border-b border-[hsl(var(--border))] flex justify-between items-center">
            <h2 className="font-semibold text-[hsl(var(--card-foreground))]">Summary Stats</h2>
             <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Maximize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Minimize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><X size={16} /></button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="p-4 border border-[hsl(var(--border))] rounded bg-[hsl(var(--muted))]">
              <h3 className="font-medium text-[hsl(var(--muted-foreground))]">Analytics Snapshot</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Key metrics will be displayed here.</p>
            </div>
            <div className="p-4 border border-[hsl(var(--border))] rounded bg-[hsl(var(--muted))]">
              <h3 className="font-medium text-[hsl(var(--muted-foreground))]">Recent Activity</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Summary of recent actions.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[hsl(var(--card))] rounded-lg shadow">
        <div className="p-4 border-b border-[hsl(var(--border))] flex justify-between items-center">
          <h2 className="font-semibold text-[hsl(var(--card-foreground))]">Recent Invoices</h2>
           <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Maximize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Minimize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><X size={16} /></button>
            </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="text-left p-2 font-medium text-[hsl(var(--muted-foreground))]">Invoice ID</th>
                  <th className="text-left p-2 font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                  <th className="text-left p-2 font-medium text-[hsl(var(--muted-foreground))]">Method</th>
                  <th className="text-right p-2 font-medium text-[hsl(var(--muted-foreground))]">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]">
                  <td className="p-2 text-[hsl(var(--card-foreground))]">INV001</td>
                  <td className="p-2"><span className="px-2 py-1 bg-[hsla(var(--chart-2),0.1)] text-[hsl(var(--chart-2))] rounded text-xs font-medium">Paid</span></td>
                  <td className="p-2 text-[hsl(var(--card-foreground))]">Credit Card</td>
                  <td className="p-2 text-right text-[hsl(var(--primary))] font-medium">$250.00</td>
                </tr>
                <tr className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]">
                  <td className="p-2 text-[hsl(var(--card-foreground))]">INV002</td>
                  <td className="p-2"><span className="px-2 py-1 bg-[hsla(var(--chart-3),0.1)] text-[hsl(var(--chart-3))] rounded text-xs font-medium">Pending</span></td>
                  <td className="p-2 text-[hsl(var(--card-foreground))]">Direct Transfer</td>
                  <td className="p-2 text-right text-[hsl(var(--primary))] font-medium">$150.00</td>
                </tr>
                <tr className="hover:bg-[hsl(var(--accent))]">
                  <td className="p-2 text-[hsl(var(--card-foreground))]">INV003</td>
                  <td className="p-2"><span className="px-2 py-1 bg-[hsla(var(--destructive),0.1)] text-[hsl(var(--destructive))] rounded text-xs font-medium">Overdue</span></td>
                  <td className="p-2 text-[hsl(var(--card-foreground))]">Paypal</td>
                  <td className="p-2 text-right text-[hsl(var(--primary))] font-medium">$300.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">A list of recent financial transactions.</div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-95 rounded-md text-sm font-medium">Create New Invoice</button>
          </div>
        </div>
      </div>
    </div>
);


export default function DashboardLayoutClient({
  tenant,
  initialDashboardContent,
}: DashboardLayoutClientProps) {
  return (
    <BaseDashboardLayout
      tenant={tenant}
      dashboardType="client"
      navItems={clientNavItems}
      availableCards={clientMainBoardCards}
      initialActiveSection="Overview"
      initialNotifications={clientInitialNotifications(tenant.name)}
      sidebarHeaderTitle={`${tenant.name} Client Portal`}
      modalTitle="Client Card Options"
    >
      {(activeSection, maximizedCardId, actions) => {
        // --- Render Logic for Main Content Area ---
        if (activeSection === 'Overview') {
          return initialDashboardContent;
        }

        if (activeSection === 'Main Board') {
          const cardForMaxView = maximizedCardId !== null ? actions.getCardById(maximizedCardId) : null;

          if (cardForMaxView && clientMainBoardCards.some(c => c.id === cardForMaxView.id)) {
            // Maximized Card View for 'Main Board'
            return (
              <div className="bg-[hsl(var(--card))] rounded-lg shadow-xl p-4 sm:p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">
                    {cardForMaxView.title}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => actions.togglePinCard(cardForMaxView.id)}
                      className={`p-1.5 rounded hover:bg-[hsl(var(--accent))] ${actions.isCardPinned(cardForMaxView.id) ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'}`}
                      title={actions.isCardPinned(cardForMaxView.id) ? "Unpin Card" : "Pin Card"}
                    >
                      <Pin size={18} />
                    </button>
                    <button
                      onClick={() => actions.toggleMinimizeCard(cardForMaxView.id)}
                      className="p-1.5 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))]"
                      title="Minimize Card"
                    >
                      <Minimize2 size={18} />
                    </button>
                    <button
                      onClick={() => actions.toggleMaximizeCard(cardForMaxView.id)} // Toggles maximized state
                      className="p-1.5 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))]"
                      title="Restore Down"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-[hsl(var(--muted))] rounded p-4 flex items-center justify-center text-[hsl(var(--muted-foreground))]">
                  Detailed client-specific maximized content for {cardForMaxView.title}.
                </div>
              </div>
            );
          }
          // Grid View for 'Main Board'
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {actions.getFilteredCards().map(card => (
                <div
                  key={card.id}
                  className={`rounded-lg shadow-md p-4 min-h-[160px] flex flex-col transition-shadow hover:shadow-lg ${card.themeColorVar ? `bg-[hsla(var(${card.themeColorVar}),0.15)]` : 'bg-[hsl(var(--card))]'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${card.themeColorVar ? `text-[hsl(var(${card.themeColorVar}))]` : 'text-[hsl(var(--card-foreground))]'}`}>
                      {card.title}
                    </h3>
                    <div className="flex gap-1">
                      <button onClick={() => actions.togglePinCard(card.id)} className={`p-1 rounded hover:bg-white/30 ${actions.isCardPinned(card.id) ? (card.themeColorVar ? `text-[hsl(var(${card.themeColorVar}))]` : 'text-[hsl(var(--primary))]') : 'text-[hsl(var(--muted-foreground))]'}`} title={actions.isCardPinned(card.id) ? "Unpin" : "Pin"}> <Pin size={16} /> </button>
                      <button onClick={() => actions.toggleMinimizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-[hsl(var(--muted-foreground))]" title="Minimize"> <Minimize2 size={16} /> </button>
                      <button onClick={() => actions.toggleMaximizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-[hsl(var(--muted-foreground))]" title="Maximize"> <Maximize2 size={16} /> </button>
                      <button onClick={() => actions.openModalForCard(card.id)} className="p-1 rounded hover:bg-white/30 text-[hsl(var(--muted-foreground))]" title="More Options"> <Layers size={16} /> </button>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center text-sm text-[hsl(var(--muted-foreground))]">
                    Client-specific summary for {card.title}.
                  </div>
                </div>
              ))}
              <button
                onClick={() => console.log("Add new widget to Client Main Board")}
                className="bg-[hsl(var(--card))] border-2 border-dashed border-[hsl(var(--border))] rounded-lg shadow-sm p-4 min-h-[160px] flex flex-col items-center justify-center text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors group"
              >
                <PlusCircle size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Add Widget</span>
              </button>
            </div>
          );
        }

        if (activeSection === 'My Account') {
          return (
            <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--card-foreground))]">My Account Details</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                <span className="font-medium text-[hsl(var(--card-foreground))]">Tenant ID:</span> {tenant.id}
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                <span className="font-medium text-[hsl(var(--card-foreground))]">Tenant Name:</span> {tenant.name}
              </p>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Information specific to the logged-in client user will appear here.</p>
            </div>
          );
        }

        if (activeSection === 'Settings') {
          return (
            <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--card-foreground))]">Client Settings</h2>
              <p className="mb-6 text-sm text-[hsl(var(--muted-foreground))]">Manage your notification settings, display options, and other account preferences for this client dashboard.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-md">
                  <span className="text-[hsl(var(--card-foreground))]">Enable Detailed System Logs</span>
                  <label className="switch"> {/* Switch styles are handled by BaseDashboardLayout */}
                    <input type="checkbox" defaultChecked /> <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-md">
                  <span className="text-[hsl(var(--card-foreground))]">Receive Weekly Summary Emails</span>
                  <label className="switch">
                    <input type="checkbox" /> <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-md">
                  <span className="text-[hsl(var(--card-foreground))]">Dark Mode (Client View)</span>
                  <label className="switch">
                    <input type="checkbox" /> <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          );
        }

        // Example for the OriginalQuickBoardComponent if you add a nav item for it
        if (activeSection === 'Quick Board (Original)') {
            return <OriginalQuickBoardComponent />;
        }

        // Fallback for sections not explicitly handled
        return (
          <div className="flex items-center justify-center h-full text-lg text-[hsl(var(--muted-foreground))]">
            Content for '{activeSection}' is under construction.
          </div>
        );
      }}
    </BaseDashboardLayout>
  );
}