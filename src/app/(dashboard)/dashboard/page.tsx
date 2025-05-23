// src/app/(dashboard)/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link'; // For client-side navigation
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client'; // Or from '@/generated/prisma'
import { getDynamicProtocol, getDynamicRootDomain, getHostnameWithoutPort } from '@/lib/domainUtils'; // Import helpers

// For Authentication (you'll need to implement this part fully)
// import { getCurrentUser } from '@/lib/session'; // Example session utility

// Placeholder components for different tenant dashboards
const SupplierDashboardContent = ({ tenant }: { tenant: Tenant }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Listings</h2>
            <p className="text-gray-600">Manage your products and inventory for {tenant.name}.</p>
            <Link href="/products" className="text-indigo-600 hover:text-indigo-800 font-medium mt-3 inline-block">View Products →</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Incoming Orders</h2>
            <p className="text-gray-600">View and process new orders from customers.</p>
            <Link href="/orders" className="text-indigo-600 hover:text-indigo-800 font-medium mt-3 inline-block">Manage Orders →</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipments</h2>
            <p className="text-gray-600">Track your outgoing shipments and manage logistics.</p>
            <Link href="/shipments" className="text-indigo-600 hover:text-indigo-800 font-medium mt-3 inline-block">Track Shipments →</Link>
        </div>
    </div>
);

const ClientDashboardContent = ({ tenant }: { tenant: Tenant }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Project Hub for {tenant.name}</h2>
        <p className="text-gray-600">View your project status, invoices, and communicate with the team.</p>
        <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium mt-3 inline-block">View Projects →</Link>
    </div>
);

const CustomerDashboardContent = ({ tenant }: { tenant: Tenant }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Your Portal, {tenant.name}</h2>
        <p className="text-gray-600">Access your past orders, manage subscriptions, and find support.</p>
        <Link href="/my-orders" className="text-green-600 hover:text-green-800 font-medium mt-3 inline-block">My Orders →</Link>
    </div>
);

const DefaultDashboardContent = ({ tenant }: { tenant: Tenant }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome to your Dashboard, {tenant.name}</h2>
        <p className="text-gray-600">No specific view for tenant type: {tenant.tenant_type}.</p>
    </div>
);


export default async function DashboardPage() {
    console.log('[DASHBOARD PAGE] Rendering...');

    const headerList = await headers();
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

    // --- AUTHENTICATION CHECK (CRUCIAL - Placeholder) ---
    // const user = await getCurrentUser();
    // if (!user) {
    //   console.log('[DASHBOARD] No active session. Redirecting to login.');
    //   return redirect(`/login?redirectTo=/dashboard`); // Stays on current subdomain
    // }
    // ---

    if (!tenantSubdomainFromHeader) {
        console.error(`[DASHBOARD] Critical: No x-tenant-id header found. This should be set by middleware. Redirecting to select-tenant on root.`);
        const rootDomain = getDynamicRootDomain();
        const protocol = getDynamicProtocol();
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=tenant_context_missing_fatal`);
    }

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });
    } catch (error) {
        console.error(`[DASHBOARD] DB Error fetching tenant '${tenantSubdomainFromHeader}':`, error);
        const rootDomain = getDynamicRootDomain();
        const protocol = getDynamicProtocol();
        // Corrected placeholders for Lines 76-77
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=db_error_dashboard&attempted=${encodeURIComponent(tenantSubdomainFromHeader)}`);
    }

    if (!tenant) {
        console.error(`[DASHBOARD] Tenant '${tenantSubdomainFromHeader}' not found in DB. Redirecting.`);
        const rootDomain = getDynamicRootDomain();
        const protocol = getDynamicProtocol();
        // Corrected placeholders for Lines 83-84
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=tenant_not_found_dashboard&attempted=${encodeURIComponent(tenantSubdomainFromHeader)}`);
    }

    // --- AUTHORIZATION CHECK (Placeholder) ---
    // if (user.tenantId !== tenant.id) {
    //   console.warn(`[DASHBOARD] AuthZ Failure: User ${user.id} does not belong to tenant ${tenant.id}.`);
    //   return redirect(`/unauthorized`); // Or appropriate error page
    // }
    // ---

    let dashboardContent = null;
    // Ensure tenant.tenant_type exactly matches the strings used in your DB/Prisma schema
    switch (tenant.tenant_type.toLowerCase()) { // Use toLowerCase for case-insensitive matching
        case 'supplier': // Make sure this matches the value in your DB for supplier tenants
            dashboardContent = <SupplierDashboardContent tenant={tenant} />;
            break;
        case 'client':   // Make sure this matches
            dashboardContent = <ClientDashboardContent tenant={tenant} />;
            break;
        case 'customer': // Make sure this matches
            dashboardContent = <CustomerDashboardContent tenant={tenant} />;
            break;
        default:
            console.warn(`[DASHBOARD] Unsupported tenant_type: ${tenant.tenant_type} for tenant ${tenant.name}`);
            dashboardContent = <DefaultDashboardContent tenant={tenant} />;
    }

    return (
        // Assuming you have a src/app/(dashboard)/layout.tsx that provides main layout structure
        <div className="w-full"> {/* Let layout handle padding if used, or add p-6 sm:p-8 here */}
            <header className="mb-8 border-b pb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {tenant.name} Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                    {tenant.subdomain}.{getHostnameWithoutPort(getDynamicRootDomain())}
                    {' '}| <span className="capitalize">{tenant.tenant_type}</span>
                </p>
            </header>
            {dashboardContent}
        </div>
    );
}