// src/components/dashboard/DashboardLayoutCustomer.tsx
'use client';

import { ReactNode } from 'react';
import {
  Home,
  Package,
  UserCircle,
  SlidersHorizontal,
  LifeBuoy,
  Bell,
  Maximize2,
  Minimize2,
  Pin,
  X,
  Layers,
} from 'lucide-react';
import type { Tenant } from '@prisma/client'; // Assuming Tenant type is globally available or adjust path

import BaseDashboardLayout, {
  NavItem,
  DashboardCard as BaseDashboardCard, // Renaming to avoid conflict if needed locally
  Notification as BaseNotification,
  RenderMainContentParams,
} from './BaseDashboardLayout'; // Adjust path as necessary

interface DashboardLayoutCustomerProps {
  tenant: Tenant;
  initialDashboardContent: ReactNode; // This is the content for the "Dashboard" section
}

export default function DashboardLayoutCustomer({
  tenant,
  initialDashboardContent,
}: DashboardLayoutCustomerProps) {
  // --- Configuration Specific to Customer Dashboard ---
  const tenantType = 'customer';

  const navItems: NavItem[] = [
    { icon: <Home size={20} />, title: 'Dashboard' },
    { icon: <Package size={20} />, title: 'My Services' },
    { icon: <UserCircle size={20} />, title: 'My Profile' },
    { icon: <SlidersHorizontal size={20} />, title: 'Preferences' },
    { icon: <Bell size={20} />, title: 'Notifications' }, // Added for dedicated notifications page
    { icon: <LifeBuoy size={20} />, title: 'Help & Support' },
  ];

  const customerServiceCards: BaseDashboardCard[] = [
    { id: 'cust-svc-1', title: 'Active Subscriptions', color: 'bg-teal-100' },
    { id: 'cust-svc-2', title: 'Order History', color: 'bg-sky-100' },
    { id: 'cust-svc-3', title: 'My Downloads', color: 'bg-lime-100' },
    { id: 'cust-svc-4', title: 'Usage Statistics', color: 'bg-fuchsia-100' },
  ];

  const initialNotifications: BaseNotification[] = [
    { id: 'cust-notif-1', text: `Welcome to your ${tenant.name} customer dashboard!`, read: false, timestamp: new Date().toISOString() },
    { id: 'cust-notif-2', text: "Your recent order #ORD12345 has been confirmed.", read: false, timestamp: new Date().toISOString() },
    { id: 'cust-notif-3', text: "A new guide 'Getting Started with Our Services' is available.", read: true, timestamp: new Date().toISOString() },
  ];

  // --- Main Content Renderer ---
  const renderMainContent = ({
    activeSection,
    // tenant is available in the outer scope
    dashboardCards = customerServiceCards, // Use customer-specific cards
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

      case 'My Services':
        if (maximizedCard !== null) {
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
                Detailed view for {card?.title} would go here.
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
                          <div>Content for {card.title} modal. Add forms, details, or actions here.</div>,
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
                    Summary content for {card.title}
                  </div>
                </div>
            ))}
          </div>
        );

      case 'My Profile':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Customer Profile</h2>
            <p>Here you can view and edit your personal information, manage your password, and update communication preferences.</p>
            <div className="mt-4 space-y-3">
              <div><span className="font-medium">Name:</span> Your Customer Name</div>
              <div><span className="font-medium">Email:</span> customer.email@example.com</div>
              <div><span className="font-medium">Customer Since:</span> January 1, 2023</div>
              <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Edit Profile</button>
            </div>
          </div>
        );

      case 'Preferences':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Customer Preferences</h2>
            <p>Manage your notification settings, display options, and other account preferences to customize your experience.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span>Email Notifications for Orders</span>
                <label className="switch"><input type="checkbox" defaultChecked /> <span className="slider round"></span></label>
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <label className="switch"><input type="checkbox" /> <span className="slider round"></span></label>
              </div>
            </div>
          </div>
        );
        
      case 'Notifications':
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">All Notifications</h2>
                {/* Placeholder for a more detailed notification list/management component */}
                <p>This page would display a full list of your notifications with options to filter, sort, and manage them.</p>
                <ul>
                    {initialNotifications.map(n => <li key={n.id} className={`${n.read ? 'text-gray-500' : 'font-bold'}`}>{n.text}</li>)}
                </ul>
            </div>
        );

      case 'Help & Support':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
            <p>Find answers to common questions, access troubleshooting guides, or contact our support team for customer-specific issues.</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md">
                <h3 className="font-medium">Customer FAQs</h3>
                <p className="text-sm text-gray-600">Browse frequently asked questions for customers.</p>
              </a>
              <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md">
                <h3 className="font-medium">Service Guides</h3>
                <p className="text-sm text-gray-600">Explore articles and tutorials about our services.</p>
              </a>
              <a href="#" className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md">
                <h3 className="font-medium">Contact Support</h3>
                <p className="text-sm text-gray-600">Get in touch with our support team.</p>
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-lg text-gray-500">
            Content for {activeSection} is not yet implemented.
          </div>
        );
    }
  };

  return (
    <BaseDashboardLayout
      tenant={tenant}
      tenantType={tenantType}
      navItems={navItems}
      dashboardCards={customerServiceCards}
      initialNotifications={initialNotifications}
      renderMainContent={renderMainContent}
      initialActiveSection="Dashboard" // Or any default section you prefer
    />
  );
}