// src/components/dashboard/DashboardLayoutSupplier.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';
import {
  Maximize2,
  Minimize2,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  Bell,
  Pin,
  PlusCircle,
  Layers, // General purpose "more options" or "view layers"
  Settings,
  ShoppingBag, // For Products
  ClipboardList, // For Orders
  Warehouse, // For Inventory
  BarChart3, // For Analytics
  Briefcase, // For My Company / Profile
} from 'lucide-react';
import type { Tenant } from '@prisma/client'; // Assuming Tenant might represent the platform or the supplier's own org context

// Define the Notification type
interface Notification {
  id: number;
  text: string;
  read: boolean;
}

interface DashboardLayoutSupplierProps {
  tenant: Tenant; // Represents the platform or supplier's organizational context
  initialDashboardContent: ReactNode; // Main content for the 'Dashboard' section
  // supplier: Supplier; // Potentially, a supplier-specific object could be passed
}

export default function DashboardLayoutSupplier({ tenant, initialDashboardContent }: DashboardLayoutSupplierProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('Dashboard'); // Default to 'Dashboard'
  const [minimizedCards, setMinimizedCards] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`minimizedCards_supplier_${tenant.id}`); // Scoped storage
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error("Error parsing minimizedCards_supplier from localStorage", e); return []; }
    }
    return [];
  });
  const [maximizedCard, setMaximizedCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); // Generic modal state
  const [pinnedCards, setPinnedCards] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`pinnedCards_supplier_${tenant.id}`); // Scoped storage
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error("Error parsing pinnedCards_supplier from localStorage", e); return []; }
    }
    return [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const initialNotifications: Notification[] = [
      { id: 1, text: `Welcome, Supplier for ${tenant.name}!`, read: false },
      { id: 2, text: "New order #ORD78901 received from Customer Corp.", read: false },
      { id: 3, text: "Low stock warning for 'Premium Widget X'.", read: false },
      { id: 4, text: "Your weekly sales summary is ready.", read: true },
    ];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`notifications_supplier_${tenant.id}`); // Scoped storage
      try {
        return stored ? JSON.parse(stored) : initialNotifications;
      } catch (e) {
        console.error("Error parsing notifications_supplier from localStorage", e);
        return initialNotifications;
      }
    }
    return initialNotifications;
  });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`minimizedCards_supplier_${tenant.id}`, JSON.stringify(minimizedCards));
    }
  }, [minimizedCards, tenant.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pinnedCards_supplier_${tenant.id}`, JSON.stringify(pinnedCards));
    }
  }, [pinnedCards, tenant.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`notifications_supplier_${tenant.id}`, JSON.stringify(notifications));
    }
  }, [notifications, tenant.id]);

  // Cards for a supplier-centric "Action Center" or "Key Modules"
  // This section might be named 'My Products' or similar in the nav
  const supplierActionCards = [
    { id: 1, title: 'Product Catalog', color: 'bg-sky-100' },
    { id: 2, title: 'Order Processing', color: 'bg-amber-100' },
    { id: 3, title: 'Inventory Status', color: 'bg-emerald-100' },
    { id: 4, title: 'Sales Performance', color: 'bg-violet-100' },
  ];

  const navItems = [
    { icon: <Home size={20} />, title: 'Dashboard' },
    { icon: <ShoppingBag size={20} />, title: 'My Products' }, // This could be the section with cards
    { icon: <ClipboardList size={20} />, title: 'Orders' },
    { icon: <Warehouse size={20} />, title: 'Inventory' },
    { icon: <BarChart3 size={20} />, title: 'Analytics' },
    { icon: <Briefcase size={20} />, title: 'My Company' },
    { icon: <Settings size={20} />, title: 'Settings' },
  ];

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  const toggleMinimizeCard = (cardId: number) => {
    setMinimizedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
    if (maximizedCard === cardId) setMaximizedCard(null);
  };

  const toggleMaximizeCard = (cardId: number) => {
    setMaximizedCard(prev => prev === cardId ? null : cardId);
  };

  const restoreCard = (cardId: number) => {
    setMinimizedCards(minimizedCards.filter(id => id !== cardId));
    setMaximizedCard(null);
  };

  const togglePinCard = (cardId: number) => {
    setPinnedCards(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
  };

  const toggleNotificationsDropdown = () => {
    setShowNotifications(!showNotifications);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n: Notification) => ({ ...n, read: true })));
  };

  // Determine which set of cards to use based on activeSection, if multiple card-based views exist
  // For this example, 'My Products' will use supplierActionCards. Other sections might have their own if needed.
  const currentCards = activeSection === 'My Products' ? supplierActionCards : [];


  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <div className={`bg-sidebar text-sidebar-foreground flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
          {sidebarExpanded && <span className="font-semibold text-lg truncate" title={tenant.name}>{tenant.name} - Supplier</span>}
          <button onClick={toggleSidebar} className="p-1 rounded hover:bg-sidebar-hover text-sidebar-foreground">
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
                  ? 'bg-sidebar-active text-white'
                  : 'hover:bg-sidebar-hover hover:text-sidebar-foreground-hover'
              }`}
              onClick={() => setActiveSection(item.title)}
            >
              {item.icon}
              {sidebarExpanded && <span className="ml-3">{item.title}</span>}
            </button>
          ))}
        </nav>
        {minimizedCards.length > 0 && (
          <div className="border-t border-sidebar-border p-2">
            <div className={`flex ${sidebarExpanded ? 'flex-wrap gap-2' : 'flex-col items-center gap-2'}`}>
              {minimizedCards.map(cardId => {
                // Ensure card exists in the relevant card list (supplierActionCards in this case)
                const card = supplierActionCards.find(c => c.id === cardId);
                return card ? (
                  <button
                    key={cardId}
                    onClick={() => restoreCard(cardId)}
                    title={`Restore ${card.title}`}
                    className="bg-gray-700 text-xs p-2 rounded flex items-center text-white hover:bg-gray-600 w-full sm:w-auto justify-center"
                  >
                    {sidebarExpanded ? card.title : card.title.charAt(0).toUpperCase()}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-white border-b flex flex-col shadow-sm">
          <div className="p-4 flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-700">{activeSection}</h1>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600"
                  onClick={toggleNotificationsDropdown}
                  title="Notifications"
                >
                  <Bell size={20} />
                  {notifications.some((n: Notification) => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500" />
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border">
                    <div className="p-3 border-b flex justify-between items-center">
                      <h3 className="font-medium text-sm">Notifications</h3>
                      {notifications.some((n: Notification) => !n.read) && (
                        <button onClick={markAllNotificationsAsRead} className="text-xs text-indigo-600 hover:underline">
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
                      ) : (
                        notifications.map((notification: Notification) => (
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
                            <a href="#" className="text-xs text-indigo-600 hover:underline">View all notifications</a>
                        </div>
                    )}
                  </div>
                )}
              </div>
              <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600" title="User Menu">
                <Menu size={20} />
              </button>
            </div>
          </div>
          {pinnedCards.length > 0 && (
            <div className="bg-gray-50 px-4 py-2 flex gap-3 overflow-x-auto border-b">
              {pinnedCards.map(cardId => {
                const card = supplierActionCards.find(c => c.id === cardId); // Check against relevant cards
                return card ? (
                  <div key={cardId} className="flex items-center px-3 py-1.5 bg-white rounded-md shadow-sm border text-sm">
                    <Pin size={14} className="text-indigo-500 mr-2" />
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
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-50">
          {activeSection === 'Dashboard' ? (
            initialDashboardContent
          ) : activeSection === 'My Products' ? ( // Example of a card-based section
            maximizedCard !== null && supplierActionCards.some(c => c.id === maximizedCard) ? (
              <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {supplierActionCards.find(c => c.id === maximizedCard)?.title}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { if (maximizedCard !== null) togglePinCard(maximizedCard); }}
                      className={`p-1.5 rounded hover:bg-gray-100 ${maximizedCard !== null && pinnedCards.includes(maximizedCard) ? 'text-indigo-600' : 'text-gray-500'}`}
                      title={maximizedCard !== null && pinnedCards.includes(maximizedCard) ? "Unpin Card" : "Pin Card"}
                    >
                      <Pin size={18} />
                    </button>
                    <button
                      onClick={() => { if (maximizedCard !== null) toggleMinimizeCard(maximizedCard); }}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                      title="Minimize Card"
                    >
                      <Minimize2 size={18} />
                    </button>
                    <button
                      onClick={() => setMaximizedCard(null)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                      title="Restore Down"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-gray-100 rounded p-4 flex items-center justify-center text-gray-600">
                  Maximized Content for {supplierActionCards.find(c => c.id === maximizedCard)?.title} would go here.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {supplierActionCards.filter(card => !minimizedCards.includes(card.id)).map(card => (
                  <div
                    key={card.id}
                    className={`${card.color} rounded-lg shadow-md p-4 min-h-[160px] flex flex-col transition-shadow hover:shadow-lg`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-700">{card.title}</h3>
                      <div className="flex gap-1">
                        <button onClick={() => togglePinCard(card.id)} className={`p-1 rounded hover:bg-white/30 ${pinnedCards.includes(card.id) ? 'text-indigo-700' : 'text-gray-600'}`} title={pinnedCards.includes(card.id) ? "Unpin" : "Pin"}> <Pin size={16} /> </button>
                        <button onClick={() => toggleMinimizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-gray-600" title="Minimize"> <Minimize2 size={16} /> </button>
                        <button onClick={() => toggleMaximizeCard(card.id)} className="p-1 rounded hover:bg-white/30 text-gray-600" title="Maximize"> <Maximize2 size={16} /> </button>
                        <button onClick={() => setShowModal(true)} className="p-1 rounded hover:bg-white/30 text-gray-600" title="More Options"> <Layers size={16} /> </button>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                      Content for {card.title}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => console.log("Add new widget to Supplier Dashboard")}
                  className="bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm p-4 min-h-[160px] flex flex-col items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors group"
                >
                  <PlusCircle size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Add Action Card</span>
                </button>
              </div>
            )
          ) : activeSection === 'Orders' ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
              <p>View, process, and track customer orders. Filter by status, date, or customer.</p>
              {/* Placeholder for order list or management tools */}
              <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Order Management Interface</div>
            </div>
          ) : activeSection === 'Inventory' ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Manage Inventory</h2>
              <p>Track stock levels, manage SKUs, set reorder points, and view inventory history.</p>
              {/* Placeholder for inventory management tools */}
              <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Inventory Management Interface</div>
            </div>
          ) : activeSection === 'Analytics' ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Supplier Analytics</h2>
              <p>View sales trends, top-performing products, customer insights, and other key metrics.</p>
              {/* Placeholder for analytics dashboards */}
              <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Analytics Dashboards & Reports</div>
            </div>
          ) : activeSection === 'My Company' ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">My Company Profile</h2>
              <p>Manage your supplier profile, business details, banking information, and user access.</p>
              {/* Placeholder for company profile fields */}
              <div className="mt-4 space-y-3">
                <div><span className="font-medium">Company Name:</span> {tenant.name /* Or supplier specific name */}</div>
                <div><span className="font-medium">Contact Email:</span> supplier.contact@example.com</div>
                <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Edit Profile</button>
              </div>
            </div>
          ) : activeSection === 'Settings' ? (
             <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Supplier Settings</h2>
              <p>Configure notification preferences, API integrations, shipping options, and other operational settings.</p>
               <div className="mt-4 p-4 border rounded bg-gray-50 text-center text-gray-500">Settings Configuration Panel</div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-lg text-gray-500">
              Select a section from the sidebar or content for '{activeSection}' is not yet defined.
            </div>
          )}
        </main>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-700">Modal Title (Supplier)</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"> <X size={20} /> </button>
            </div>
            <div className="p-4 sm:p-6 min-h-[200px] max-h-[60vh] overflow-y-auto">
              <p>This is a generic modal for supplier actions. Content for the active card or specific supplier function would go here.</p>
            </div>
            <div className="p-4 sm:p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
              <button onClick={() => { console.log("Supplier modal confirmed"); setShowModal(false); }} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}