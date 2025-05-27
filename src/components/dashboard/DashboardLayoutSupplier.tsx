// src/components/dashboard/DashboardLayoutSupplier.tsx
'use client';

import { ReactNode } from 'react';
import {
  Home,
  ShoppingBag,
  ClipboardList,
  Warehouse,
  BarChart3,
  Briefcase,
  Settings,
  Bell,
  Maximize2,
  Minimize2,
  Pin,
  X,
  Layers,
  PlusCircle,
} from 'lucide-react';
import type { Tenant } from '@prisma/client';

import BaseDashboardLayout, {
  NavItem,
  DashboardCard as BaseDashboardCard,
  Notification as BaseNotification,
  RenderMainContentParams,
} from './BaseDashboardLayout'; // Adjust path as necessary

interface DashboardLayoutSupplierProps {
  tenant: Tenant;
  initialDashboardContent: ReactNode;
}

export default function DashboardLayoutSupplier({
  tenant,
  initialDashboardContent,
}: DashboardLayoutSupplierProps) {
  // --- Configuration Specific to Supplier Dashboard ---
  const tenantType = 'supplier';

  const navItems: NavItem[] = [
    { icon: <Home size={20} />, title: 'Dashboard' },
    { icon: <ShoppingBag size={20} />, title: 'My Products' },
    { icon: <ClipboardList size={20} />, title: 'Orders' },
    { icon: <Warehouse size={20} />, title: 'Inventory' },
    { icon: <BarChart3 size={20} />, title: 'Analytics' },
    { icon: <Bell size={20} />, title: 'Notifications' }, // Added for dedicated notifications page
    { icon: <Briefcase size={20} />, title: 'My Company' },
    { icon: <Settings size={20} />, title: 'Settings' },
  ];

  const supplierActionCards: BaseDashboardCard[] = [
    { id: 'supp-card-1', title: 'Product Catalog', color: 'bg-sky-100' },
    { id: 'supp-card-2', title: 'Order Processing', color: 'bg-amber-100' },
    { id: 'supp-card-3', title: 'Inventory Status', color: 'bg-emerald-100' },
    { id: 'supp-card-4', title: 'Sales Performance', color: 'bg-violet-100' },
  ];

  const initialNotifications: BaseNotification[] = [
    { id: 'supp-notif-1', text: `Welcome, Supplier for ${tenant.name}!`, read: false, timestamp: new Date().toISOString() },
    { id: 'supp-notif-2', text: "New order #ORD78901 received from Customer Corp.", read: false, timestamp: new Date().toISOString() },
    { id: 'supp-notif-3', text: "Low stock warning for 'Premium Widget X'.", read: false, timestamp: new Date().toISOString() },
    { id: 'supp-notif-4', text: "Your weekly sales summary is ready.", read: true, timestamp: new Date().toISOString() },
  ];

  // --- Main Content Renderer ---
  const renderMainContent = ({
    activeSection,
    dashboardCards = supplierActionCards, // Default to supplier cards
    minimizedCards,
    maximizedCard,
    pinnedCards,
    toggleMinimizeCard,
    toggleMaximizeCard,
    togglePinCard,
    showCustomModal,
  }: RenderMainContentParams): ReactNode => {
    switch (activeSection) {
      case 'Dashboard':
        return initialDashboardContent;

      case 'My Products': // This section uses the card layout
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
                Maximized Content for {card?.title} would go here.
                {/* Example: <ProductCatalogDetails productId={card.relatedId} /> */}
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
                  className={`${card.color || 'bg-blue-100'} rounded-lg shadow-md p-4 min-h-[160px] flex flex-col transition-shadow hover:shadow-lg`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-700">{card.title}</h3>
                    <div className="flex gap-1">
                      <button onClick={() => togglePinCard(card.id)} className={`p-1 rounded hover:bg-white/30 ${pinnedCards.includes(card.id) ? 'text-indigo-700' : 'text-gray-600'}`} title={pinnedCards.includes(card.id) ? "Unpin" : "Pin"}> <Pin size={16} /> </button>
                      <button onClick={() => toggleMinimizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-gray-600" title="Minimize"> <Minimize2 size={16} /> </button>
                      <button onClick={() => toggleMaximizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-gray-600" title="Maximize"> <Maximize2 size={16} /> </button>
                      <button
                        onClick={() => showCustomModal(
                          <div>Content for {card.title} modal. Add supplier-specific forms or details.</div>,
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
                    Summary for {card.title}
                  </div>
                </div>
            ))}
            <button
              onClick={() => showCustomModal(
                <div>Form or options to add a new action card or widget to the supplier dashboard.</div>,
                "Add New Action Card"
              )}
              className="bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm p-4 min-h-[160px] flex flex-col items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors group"
            >
              <PlusCircle size={32} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Add Action Card</span>
            </button>
          </div>
        );

      case 'Orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Supplier Orders</h2>
            <p>View, process, and track customer orders. Filter by status, date, or customer.</p>
            <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Supplier Order Management Interface</div>
          </div>
        );

      case 'Inventory':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Supplier Inventory</h2>
            <p>Track stock levels, manage SKUs, set reorder points, and view inventory history.</p>
            <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Supplier Inventory Management Interface</div>
          </div>
        );

      case 'Analytics':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Supplier Analytics</h2>
            <p>View sales trends, top-performing products, customer insights, and other key metrics.</p>
            <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Supplier Analytics Dashboards & Reports</div>
          </div>
        );
        
      case 'Notifications':
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">All Supplier Notifications</h2>
                <p>This page would display a full list of your supplier-related notifications with options to filter, sort, and manage them.</p>
                <ul>
                    {initialNotifications.map(n => <li key={n.id} className={`${n.read ? 'text-gray-500' : 'font-bold'}`}>{n.text}</li>)}
                </ul>
            </div>
        );

      case 'My Company':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Supplier Company Profile</h2>
            <p>Manage your supplier profile, business details, banking information, and user access.</p>
            <div className="mt-4 space-y-3">
              <div><span className="font-medium">Company Name:</span> {tenant.name} {/* Or specific supplier name from a supplier object */}</div>
              <div><span className="font-medium">Contact Email:</span> supplier.contact@example.com</div>
              <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Edit Company Profile</button>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Supplier Settings</h2>
            <p>Configure notification preferences, API integrations, shipping options, and other operational settings for your supplier account.</p>
            <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Supplier Settings Configuration Panel</div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-lg text-gray-500">
            Content for '{activeSection}' is not yet implemented for Suppliers.
          </div>
        );
    }
  };

  return (
    <BaseDashboardLayout
      tenant={tenant}
      tenantType={tenantType}
      navItems={navItems}
      dashboardCards={supplierActionCards} // Pass the supplier-specific cards
      initialNotifications={initialNotifications}
      renderMainContent={renderMainContent}
      initialActiveSection="Dashboard"
      // headerRightContent={<button className="text-sm bg-green-500 text-white px-3 py-1 rounded">New Product</button>} // Example custom header content
      // sidebarFooterContent={<div className="p-4 text-xs text-gray-400">Supplier Portal v1.0</div>} // Example custom sidebar footer
    />
  );
}