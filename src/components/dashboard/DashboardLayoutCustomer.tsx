// src/components/dashboard/DashboardLayoutCustomer.tsx
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
  Layers,
  Package,
  UserCircle,
  SlidersHorizontal,
  LifeBuoy,
} from 'lucide-react';
import type { Tenant } from '@prisma/client';

interface Notification {
  id: number;
  text: string;
  read: boolean;
}

interface DashboardLayoutCustomerProps {
  tenant: Tenant;
  initialDashboardContent: ReactNode;
}

export default function DashboardLayoutCustomer({ tenant, initialDashboardContent }: DashboardLayoutCustomerProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [minimizedCards, setMinimizedCards] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`minimizedCards_customer_${tenant.id}`);
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error("Error parsing minimizedCards_customer from localStorage", e); return []; }
    }
    return [];
  });
  const [maximizedCard, setMaximizedCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pinnedCards, setPinnedCards] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`pinnedCards_customer_${tenant.id}`);
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error("Error parsing pinnedCards_customer from localStorage", e); return []; }
    }
    return [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const initialNotifications: Notification[] = [
      { id: 1, text: `Welcome to your ${tenant.name} dashboard!`, read: false },
      { id: 2, text: "Your recent order #ORD12345 has been confirmed.", read: false },
      { id: 3, text: "A new guide 'Getting Started with Our Services' is available.", read: true },
    ];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`notifications_customer_${tenant.id}`);
      try {
        return stored ? JSON.parse(stored) : initialNotifications;
      } catch (e) {
        console.error("Error parsing notifications_customer from localStorage", e);
        return initialNotifications;
      }
    }
    return initialNotifications;
  });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`minimizedCards_customer_${tenant.id}`, JSON.stringify(minimizedCards));
    }
  }, [minimizedCards, tenant.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pinnedCards_customer_${tenant.id}`, JSON.stringify(pinnedCards));
    }
  }, [pinnedCards, tenant.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`notifications_customer_${tenant.id}`, JSON.stringify(notifications));
    }
  }, [notifications, tenant.id]);

  const serviceCards = [
    { id: 1, title: 'Active Subscriptions', color: 'bg-teal-100' },
    { id: 2, title: 'Order History', color: 'bg-sky-100' },
    { id: 3, title: 'My Downloads', color: 'bg-lime-100' },
    { id: 4, title: 'Usage Statistics', color: 'bg-fuchsia-100' },
  ];

  const navItems = [
    { icon: <Home size={20} />, title: 'Dashboard' },
    { icon: <Package size={20} />, title: 'My Services' },
    { icon: <UserCircle size={20} />, title: 'My Profile' },
    { icon: <SlidersHorizontal size={20} />, title: 'Preferences' },
    { icon: <LifeBuoy size={20} />, title: 'Help & Support' },
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

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <div className={`bg-sidebar text-sidebar-foreground flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
          {sidebarExpanded && <span className="font-semibold text-lg truncate" title={tenant.name}>{tenant.name}</span>}
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
                const card = serviceCards.find(c => c.id === cardId);
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
                const card = serviceCards.find(c => c.id === cardId);
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
          ) : activeSection === 'My Services' ? (
            maximizedCard !== null ? (
              <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {serviceCards.find(c => c.id === maximizedCard)?.title}
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
                  Detailed view for {serviceCards.find(c => c.id === maximizedCard)?.title} would go here.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {serviceCards.filter(card => !minimizedCards.includes(card.id)).map(card => (
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
                      Summary content for {card.title}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeSection === 'My Profile' ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">My Profile</h2>
              <p>Here you can view and edit your personal information, manage your password, and update communication preferences.</p>
              <div className="mt-4 space-y-3">
                <div><span className="font-medium">Name:</span> Your Name</div>
                <div><span className="font-medium">Email:</span> your.email@example.com</div>
                <div><span className="font-medium">Member Since:</span> January 1, 2023</div>
                <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Edit Profile</button>
              </div>
            </div>
          ) : activeSection === 'Preferences' ? (
             <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Preferences</h2>
              <p>Manage your notification settings, display options, and other account preferences to customize your experience.</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span>Email Notifications for Orders</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked /> <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                   <label className="switch">
                    <input type="checkbox" /> <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          ) : activeSection === 'Help & Support' ? (
             <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
              <p>Find answers to common questions, access troubleshooting guides, or contact our support team.</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <h3 className="font-medium">FAQs</h3>
                  <p className="text-sm text-gray-600">Browse frequently asked questions.</p>
                </a>
                <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <h3 className="font-medium">Knowledge Base</h3>
                  <p className="text-sm text-gray-600">Explore articles and tutorials.</p>
                </a>
                <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md">
                  <h3 className="font-medium">Contact Support</h3>
                  <p className="text-sm text-gray-600">Get in touch with our support team.</p>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-lg text-gray-500">
              Select a section from the sidebar.
            </div>
          )}
        </main>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-700">Card Options / Details</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"> <X size={20} /> </button>
            </div>
            <div className="p-4 sm:p-6 min-h-[200px] max-h-[60vh] overflow-y-auto">
              <p>This is a generic modal. Content for the currently active card or action would go here.</p>
              <p>For example, if triggered from a service card, it might show more details or actions for that service.</p>
            </div>
            <div className="p-4 sm:p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Close</button>
              <button onClick={() => { console.log("Modal action confirmed"); setShowModal(false); }} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Confirm Action</button>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .switch { position: relative; display: inline-block; width: 34px; height: 20px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
        input:checked + .slider { background-color: #4f46e5; } /* indigo-600 */
        input:checked + .slider:before { transform: translateX(14px); }
        .slider.round { border-radius: 20px; }
        .slider.round:before { border-radius: 50%; }
      `}</style>
    </div>
  );
}