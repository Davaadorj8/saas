// src/components/dashboard/DashboardLayoutSupplier.tsx
'use client';

import { ReactNode } from 'react';
import {
  Home,
  Settings,
  ShoppingBag,
  ClipboardList,
  Warehouse,
  BarChart3,
  Briefcase,
  PlusCircle,
  Layers,
  Maximize2,
  Minimize2,
  Pin,
  X
} from 'lucide-react';
import type { Tenant } from '@prisma/client';
import BaseDashboardLayout, {
  NavItemConfig,
  DashboardCardConfig,
} from './BaseDashboardLayout';
import type { CurrentUser } from '@/types/user'; // <<<< IMPORT CurrentUser TYPE

interface DashboardLayoutSupplierProps {
  tenant: Tenant;
  currentUser: CurrentUser; // <<<< ADD currentUser PROP HERE
  initialDashboardContent: ReactNode;
}

// --- Supplier Specific Configurations ---
const supplierNavItems: NavItemConfig[] = [
  { icon: <Home size={20} />, title: 'Dashboard' },
  { icon: <ShoppingBag size={20} />, title: 'My Products' },
  { icon: <ClipboardList size={20} />, title: 'Orders' },
  { icon: <Warehouse size={20} />, title: 'Inventory' },
  { icon: <BarChart3 size={20} />, title: 'Analytics' },
  { icon: <Briefcase size={20} />, title: 'My Company' },
  { icon: <Settings size={20} />, title: 'Settings' },
];

const supplierActionCards: DashboardCardConfig[] = [
  { id: 1, title: 'Product Catalog', themeColorVar: '--chart-1' },
  { id: 2, title: 'Order Processing', themeColorVar: '--chart-2' },
  { id: 3, title: 'Inventory Status', themeColorVar: '--chart-3' },
  { id: 4, title: 'Sales Performance', themeColorVar: '--chart-4' },
];

const supplierInitialNotifications = (tenantName: string) => [
  { id: 1, text: `Welcome, Supplier for ${tenantName}!`, read: false },
  { id: 2, text: "New order #ORD78901 received from Customer Corp.", read: false },
  { id: 3, text: "Low stock warning for 'Premium Widget X'.", read: false },
  { id: 4, text: "Your weekly sales summary is ready.", read: true },
];


export default function DashboardLayoutSupplier({
  tenant,
  currentUser, // <<<< DESTRUCTURE currentUser PROP
  initialDashboardContent,
}: DashboardLayoutSupplierProps) {
  return (
    <BaseDashboardLayout
      tenant={tenant}
      currentUser={currentUser} // <<<< PASS currentUser TO BaseDashboardLayout
      dashboardType="supplier"
      navItems={supplierNavItems}
      availableCards={supplierActionCards}
      initialActiveSection="Dashboard"
      initialNotifications={supplierInitialNotifications(tenant.name)}
      sidebarHeaderTitle={`${tenant.name} - Supplier`}
      modalTitle="Supplier Action Options"
      // renderModalContent={(cardId, closeModal) => { /* ... your custom modal logic ... */ }}
    >
      {(activeSection, maximizedCardId, actions) => {
        // --- Render Logic for Main Content Area (Your existing logic remains unchanged) ---
        if (activeSection === 'Dashboard') {
          return initialDashboardContent;
        }

        if (activeSection === 'My Products') {
          const cardForMaxView = maximizedCardId !== null ? actions.getCardById(maximizedCardId) : null;

          if (cardForMaxView && supplierActionCards.some(c => c.id === cardForMaxView.id)) {
            // Maximized Card View for 'My Products'
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
                      onClick={() => actions.toggleMaximizeCard(cardForMaxView.id)}
                      className="p-1.5 rounded hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))]"
                      title="Restore Down"
                    >
                      <X size={18} /> {/* This should probably be Minimize2 or a different icon for "Restore Down" from maximized state */}
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-[hsl(var(--muted))] rounded p-4 flex items-center justify-center text-[hsl(var(--muted-foreground))]">
                  Detailed supplier-specific maximized content for {cardForMaxView.title}.
                </div>
              </div>
            );
          }
          // Grid View for 'My Products'
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
                    Supplier-specific summary for {card.title}.
                  </div>
                </div>
              ))}
              <button
                onClick={() => console.log("Add new action card for Supplier")}
                className="bg-[hsl(var(--card))] border-2 border-dashed border-[hsl(var(--border))] rounded-lg shadow-sm p-4 min-h-[160px] flex flex-col items-center justify-center text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors group"
              >
                <PlusCircle size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Add Action Card</span>
              </button>
            </div>
          );
        }

        if (activeSection === 'Orders') {
          return (
            <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--card-foreground))]">Manage Orders</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">View, process, and track customer orders. Filter by status, date, or customer.</p>
              <div className="mt-4 p-4 border border-[hsl(var(--border))] rounded bg-[hsl(var(--muted))] text-center text-[hsl(var(--muted-foreground))]">
                Order Management Interface Placeholder
              </div>
            </div>
          );
        }

        if (activeSection === 'Inventory') {
          return (
            <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--card-foreground))]">Manage Inventory</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Track stock levels, manage SKUs, set reorder points, and view inventory history.</p>
              <div className="mt-4 p-4 border border-[hsl(var(--border))] rounded bg-[hsl(var(--muted))] text-center text-[hsl(var(--muted-foreground))]">
                Inventory Management Interface Placeholder
              </div>
            </div>
          );
        }
        if (activeSection === 'Analytics') {
            return (
              <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--card-foreground))]">Supplier Analytics</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">View sales trends, top-performing products, customer insights, and other key metrics.</p>
                <div className="mt-4 p-4 border border-[hsl(var(--border))] rounded bg-[hsl(var(--muted))] text-center text-[hsl(var(--muted-foreground))]">
                  Analytics Dashboards & Reports Placeholder
                </div>
              </div>
            );
          }

        if (activeSection === 'My Company') {
          return (
            <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--card-foreground))]">My Company Profile</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage your supplier profile, business details, banking information, and user access.</p>
              <div className="mt-4 space-y-3 text-[hsl(var(--card-foreground))]">
                <div><span className="font-medium">Company Name:</span> {tenant.name}</div>
                <div><span className="font-medium">Contact Email:</span> supplier.contact@example.com</div> {/* Placeholder */}
                <button className="mt-2 px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md">
                  Edit Profile
                </button>
              </div>
            </div>
          );
        }

        if (activeSection === 'Settings') {
          return (
            <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--card-foreground))]">Supplier Settings</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Configure notification preferences, API integrations, shipping options, and other operational settings.</p>
              <div className="mt-4 p-4 border border-[hsl(var(--border))] rounded bg-[hsl(var(--muted))] text-center text-[hsl(var(--muted-foreground))]">
                Settings Configuration Panel Placeholder (e.g., with toggle switches from BaseDashboardLayout's styles)
              </div>
            </div>
          );
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