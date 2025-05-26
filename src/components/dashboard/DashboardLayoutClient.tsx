// src/components/dashboard/DashboardLayoutClient.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Maximize2, Minimize2, X, Menu, ChevronLeft, ChevronRight, Home, User, Settings, Layers, Bell, Pin, PlusCircle } from 'lucide-react';
import type { Tenant } from '@prisma/client'; // Ensure this path is correct

// Define the Notification type
interface Notification {
  id: number;
  text: string;
  read: boolean;
}

interface DashboardLayoutClientProps {
  tenant: Tenant;
  initialDashboardContent: ReactNode;
}

export default function DashboardLayoutClient({ tenant, initialDashboardContent }: DashboardLayoutClientProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('Overview');
  const [minimizedCards, setMinimizedCards] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('minimizedCards');
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error("Error parsing minimizedCards from localStorage", e); return []; }
    }
    return [];
  });
  const [maximizedCard, setMaximizedCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pinnedCards, setPinnedCards] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pinnedCards');
      try {
        return stored ? JSON.parse(stored) : [];
      } catch (e) { console.error("Error parsing pinnedCards from localStorage", e); return []; }
    }
    return [];
  });

  // Use the Notification interface for state
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const initialNotifications: Notification[] = [
      { id: 1, text: `Welcome to ${tenant.name}'s dashboard!`, read: false },
      { id: 2, text: "System update scheduled for tonight.", read: false },
      { id: 3, text: "Your monthly report is ready.", read: true },
    ];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`notifications_${tenant.id}`);
      try {
        return stored ? JSON.parse(stored) : initialNotifications;
      } catch (e) {
        console.error("Error parsing notifications from localStorage", e);
        return initialNotifications;
      }
    }
    return initialNotifications;
  });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('minimizedCards', JSON.stringify(minimizedCards));
    }
  }, [minimizedCards]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pinnedCards', JSON.stringify(pinnedCards));
    }
  }, [pinnedCards]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`notifications_${tenant.id}`, JSON.stringify(notifications));
    }
  }, [notifications, tenant.id]);

  const mainBoardCards = [
    { id: 1, title: 'Global Analytics', color: 'bg-blue-100' },
    { id: 2, title: 'Team Tasks', color: 'bg-green-100' },
    { id: 3, title: 'Financial Reports', color: 'bg-yellow-100' },
    { id: 4, title: 'User Management', color: 'bg-purple-100' },
  ];

  const navItems = [
    { icon: <Home size={20} />, title: 'Overview' },
    { icon: <Layers size={20} />, title: 'Main Board' },
    { icon: <User size={20} />, title: 'My Account' },
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

  // Explicitly type 'n' using the Notification interface
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n: Notification) => ({ ...n, read: true })));
  };

  const OriginalQuickBoardComponent = () => (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Quick Links</h2>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-gray-100"><Maximize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-100"><Minimize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-100"><X size={16} /></button>
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
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Summary Stats</h2>
             <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-gray-100"><Maximize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-100"><Minimize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-100"><X size={16} /></button>
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
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Recent Invoices</h2>
           <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-gray-100"><Maximize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-100"><Minimize2 size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-100"><X size={16} /></button>
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
              className={`flex items-center w-full p-3 text-sm transition-colors ${activeSection === item.title ? 'bg-sidebar-active text-white' : 'hover:bg-sidebar-hover hover:text-sidebar-foreground-hover'}`}
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
                const card = mainBoardCards.find(c => c.id === cardId);
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
                  {/* Explicitly type 'n' */}
                  {notifications.some((n: Notification) => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500" />
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border">
                    <div className="p-3 border-b flex justify-between items-center">
                      <h3 className="font-medium text-sm">Notifications</h3>
                      {/* Explicitly type 'n' */}
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
                        // Explicitly type 'notification'
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
                const card = mainBoardCards.find(c => c.id === cardId);
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
          {activeSection === 'Overview' ? (
            initialDashboardContent
          ) : activeSection === 'Main Board' ? (
            maximizedCard !== null ? (
              <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {mainBoardCards.find(c => c.id === maximizedCard)?.title}
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
                  Maximized Content for {mainBoardCards.find(c => c.id === maximizedCard)?.title} would go here.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mainBoardCards.filter(card => !minimizedCards.includes(card.id)).map(card => (
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
                  onClick={() => console.log("Add new card to Main Board")}
                  className="bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm p-4 min-h-[160px] flex flex-col items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors group"
                >
                  <PlusCircle size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Add Widget</span>
                </button>
              </div>
            )
          ) : activeSection === 'My Account' ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">My Account Details</h2>
              <p>Tenant ID: {tenant.id}</p>
              <p>Tenant Name: {tenant.name}</p>
              <p>Information specific to the logged-in user will appear here.</p>
            </div>
          ) : activeSection === 'Settings' ? (
             <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
              <p>Global or tenant-specific settings configuration panel.</p>
            </div>
          ) : activeSection === 'Quick Board (Original)' ? (
            <OriginalQuickBoardComponent />
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
              <h2 className="text-xl font-semibold text-gray-700">Modal Title</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"> <X size={20} /> </button>
            </div>
            <div className="p-4 sm:p-6 min-h-[200px] max-h-[60vh] overflow-y-auto">
              <p>This is a generic modal. Content for the currently active card or action would go here.</p>
            </div>
            <div className="p-4 sm:p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
              <button onClick={() => { console.log("Modal confirmed"); setShowModal(false); }} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}