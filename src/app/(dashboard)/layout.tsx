// src/app/(dashboard)/layout.tsx
import React from 'react'; // Make sure React is imported
import { headers } from 'next/headers';
// Import your Navbar, Sidebar components here
// import Navbar from '@/components/layout/Navbar';
// import Sidebar from '@/components/layout/Sidebar';
// import { getCurrentUser } from '@/lib/session'; // For user info in layout

// THIS MUST BE A DEFAULT EXPORT
export default async function DashboardLayout({ // It IS a default export here
    children,
}: {
    children: React.ReactNode;
}) {
    const headerList = await headers(); // Correct usage for your Next.js version
    const tenantSubdomain = headerList.get('x-tenant-id');
    // const user = await getCurrentUser();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* <Sidebar tenantSubdomain={tenantSubdomain} user={user} /> */}
            <div className="mock-sidebar w-64 bg-gray-800 text-white p-4 shrink-0"> {/* Added shrink-0 */}
                <h2 className="text-xl font-semibold mb-4">Nav for {tenantSubdomain || "Platform"}</h2>
                <ul className="space-y-2">
                    <li><a href="/dashboard" className="block py-2 px-2 rounded hover:bg-gray-700 transition-colors">Dashboard Home</a></li>
                    <li><a href="/products" className="block py-2 px-2 rounded hover:bg-gray-700 transition-colors">Products</a></li>
                    <li><a href="/orders" className="block py-2 px-2 rounded hover:bg-gray-700 transition-colors">Orders</a></li>
                    <li><a href="/settings" className="block py-2 px-2 rounded hover:bg-gray-700 transition-colors">Settings</a></li>
                </ul>
                <div className="mt-auto pt-4 border-t border-gray-700">
                    <p className="text-xs">User: {/* user ? user.name : 'Guest' */ 'Placeholder User'}</p>
                    <button className="w-full mt-2 text-left py-2 px-2 rounded hover:bg-red-700 bg-red-600 transition-colors text-sm">Logout</button>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* <Navbar tenantSubdomain={tenantSubdomain} user={user} /> */}
                <div className="mock-navbar bg-white shadow p-4">
                    <p>Top Bar - Logged in to {tenantSubdomain ? `Tenant: ${tenantSubdomain}` : "Generic Dashboard"}</p>
                </div>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6"> {/* Added p-6 */}
                    {children} {/* This is where the page content (e.g., dashboard/page.tsx) goes */}
                </main>
            </div>
        </div>
    );
}
