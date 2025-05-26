// src/app/(dashboard)/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma'; // Ensure this path is correct
import type { Tenant } from '@prisma/client'; // Ensure this path is correct
import { getDynamicProtocol, getDynamicRootDomain, getHostnameWithoutPort } from '@/lib/domainUtils'; // Ensure this path is correct

// Import the client layout component
import DashboardLayoutClient from '@/components/dashboard/DashboardLayoutClient'; // Adjust path as needed

// Placeholder components for different tenant dashboards (content for the "Overview" section)
// These now include their own headers as part of their content.
const SupplierDashboardContent = ({ tenant }: { tenant: Tenant }) => (
    <>
        <header className="mb-6 pb-4"> {/* Removed border-b, main layout has enough separation */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Supplier Hub: <span className="text-indigo-600">{tenant.name}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Managing products, orders, and shipments for {tenant.subdomain}.{getHostnameWithoutPort(getDynamicRootDomain())}
            </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Listings</h2>
                <p className="text-gray-600 text-sm">Manage your products and inventory for {tenant.name}.</p>
                <Link href={`/${tenant.subdomain}/products`} className="text-indigo-600 hover:text-indigo-700 font-medium mt-4 inline-block text-sm">View Products →</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Incoming Orders</h2>
                <p className="text-gray-600 text-sm">View and process new orders from customers.</p>
                <Link href={`/${tenant.subdomain}/orders`} className="text-indigo-600 hover:text-indigo-700 font-medium mt-4 inline-block text-sm">Manage Orders →</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipments</h2>
                <p className="text-gray-600 text-sm">Track your outgoing shipments and manage logistics.</p>
                <Link href={`/${tenant.subdomain}/shipments`} className="text-indigo-600 hover:text-indigo-700 font-medium mt-4 inline-block text-sm">Track Shipments →</Link>
            </div>
        </div>
    </>
);

const ClientDashboardContent = ({ tenant }: { tenant: Tenant }) => (
    <>
        <header className="mb-6 pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
                Client Portal: <span className="text-blue-800">{tenant.name}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Access your project status, invoices, and team communication.
            </p>
        </header>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Project Hub</h2>
            <p className="text-gray-600 text-sm">View your project status, invoices, and communicate with the team.</p>
            <Link href={`/${tenant.subdomain}/projects`} className="text-blue-600 hover:text-blue-700 font-medium mt-4 inline-block text-sm">View Projects →</Link>
        </div>
    </>
);

const CustomerDashboardContent = ({ tenant }: { tenant: Tenant }) => (
     <>
        <header className="mb-6 pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
                Welcome, <span className="text-green-800">{tenant.name}</span>!
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Your personal space for orders, subscriptions, and support.
            </p>
        </header>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Your Portal</h2>
            <p className="text-gray-600 text-sm">Access your past orders, manage subscriptions, and find support.</p>
            <Link href={`/${tenant.subdomain}/my-orders`} className="text-green-600 hover:text-green-700 font-medium mt-4 inline-block text-sm">My Orders →</Link>
        </div>
    </>
);

const DefaultDashboardContent = ({ tenant }: { tenant: Tenant }) => (
    <>
        <header className="mb-6 pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
                Dashboard: {tenant.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Tenant Type: <span className="capitalize font-medium">{tenant.tenant_type}</span>
            </p>
        </header>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome!</h2>
            <p className="text-gray-600 text-sm">No specific dashboard view configured for this tenant type ({tenant.tenant_type}).</p>
        </div>
    </>
);


export default async function DashboardPage() {
    console.log('[DASHBOARD PAGE SERVER COMPONENT] Rendering...');

    const headerList = await headers(); // Renamed for clarity
    const tenantSubdomain = headerList.get('x-tenant-id'); // Use clear variable name

    // --- AUTHENTICATION CHECK (CRUCIAL - Placeholder) ---
    // const user = await getCurrentUser(); // Implement this
    // if (!user) {
    //   console.log('[DASHBOARD] No active session. Redirecting to login.');
    //   const protocol = getDynamicProtocol();
    //   const currentHostname = getHostnameWithoutPort(headerList.get('host') || '');
    //   // Ensure login path is correct for your app, might be on root domain or current subdomain
    //   return redirect(`${protocol}://${currentHostname}/login?redirectTo=${encodeURIComponent('/dashboard')}`);
    // }
    // ---

    if (!tenantSubdomain) {
        console.error(`[DASHBOARD] Critical: No x-tenant-id header found. Redirecting to select-tenant on root.`);
        const rootDomain = getDynamicRootDomain();
        const protocol = getDynamicProtocol();
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=tenant_context_missing`);
    }

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomain },
        });
    } catch (error) {
        console.error(`[DASHBOARD] DB Error fetching tenant '${tenantSubdomain}':`, error);
        const rootDomain = getDynamicRootDomain();
        const protocol = getDynamicProtocol();
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=db_error&attempted=${encodeURIComponent(tenantSubdomain)}`);
    }

    if (!tenant) {
        console.error(`[DASHBOARD] Tenant '${tenantSubdomain}' not found. Redirecting to select-tenant on root.`);
        const rootDomain = getDynamicRootDomain();
        const protocol = getDynamicProtocol();
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=tenant_not_found&attempted=${encodeURIComponent(tenantSubdomain)}`);
    }

    // --- AUTHORIZATION CHECK (Placeholder - if user should only access their assigned tenant) ---
    // if (user && user.tenantId !== tenant.id) { // Ensure user.tenantId is part of your user model
    //   console.warn(`[DASHBOARD] AuthZ Failure: User ${user.id} attempted to access tenant ${tenant.id} but belongs to ${user.tenantId}.`);
    //   const protocol = getDynamicProtocol();
    //   const currentHostname = getHostnameWithoutPort(headerList.get('host') || '');
    //   return redirect(`${protocol}://${currentHostname}/unauthorized`); // Or a generic error page on current subdomain
    // }
    // ---

    let initialDashboardContentNode = null;
    // Use toLowerCase() for case-insensitive matching of tenant_type
    switch (tenant.tenant_type.toLowerCase()) {
        case 'supplier':
            initialDashboardContentNode = <SupplierDashboardContent tenant={tenant} />;
            break;
        case 'client':
            initialDashboardContentNode = <ClientDashboardContent tenant={tenant} />;
            break;
        case 'customer':
            initialDashboardContentNode = <CustomerDashboardContent tenant={tenant} />;
            break;
        default:
            console.warn(`[DASHBOARD] Unsupported tenant_type: ${tenant.tenant_type} for tenant ${tenant.name}. Showing default.`);
            initialDashboardContentNode = <DefaultDashboardContent tenant={tenant} />;
    }

    // Render the client layout component, passing tenant data and the specific dashboard content
    return (
        <DashboardLayoutClient
            tenant={tenant}
            initialDashboardContent={initialDashboardContentNode}
            // Pass other necessary props like user object if available:
            // user={user}
        />
    );
}