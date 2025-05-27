// src/app/supplier/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma'; // Adjust path if necessary
import type { Tenant } from '@prisma/client';
import DashboardLayoutSupplier from '@/components/dashboard/DashboardLayoutSupplier'; // Adjust path

// import { getServerSession } from 'next-auth/next'; // For auth later
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your authOptions

export default async function SupplierDashboardPage() {
    console.log('--- /supplier/dashboard/page.tsx EXECUTING ---');

    // Correctly await the headers() call
    const headerList = await headers();
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

    // const session = await getServerSession(authOptions); // For auth later
    // TODO: Add session check for authentication and authorization
    // if (!session || !session.user) {
    //   console.log('[SUPPLIER_DASHBOARD] No active session. Redirecting to login.');
    //   const callbackUrl = `/supplier/dashboard`; // Or construct dynamically if needed
    //   return redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}&error=session_required`);
    // }

    if (!tenantSubdomainFromHeader) {
        console.error(`[SUPPLIER_DASHBOARD] No x-tenant-id header found. This page should only be accessed via a supplier subdomain. Redirecting.`);
        // This redirect assumes the middleware correctly set the subdomain.
        // If middleware failed, this redirect might go to the root domain's select-tenant.
        return redirect('/select-tenant?error=tenant_id_missing_in_header');
    }

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });
    } catch (error) {
        console.error(`[SUPPLIER_DASHBOARD] Error fetching tenant '${tenantSubdomainFromHeader}' from DB:`, error);
        // Consider a more generic error page or logging for the user if DB is down
        return redirect(`/select-tenant?error=db_error_on_supplier_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    if (!tenant) {
        console.error(`[SUPPLIER_DASHBOARD] Tenant with subdomain '${tenantSubdomainFromHeader}' not found. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_on_supplier_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    // IMPORTANT: Ensure your Tenant model has a 'tenant_type' field or similar
    // and that 'supplier_org' is a valid value for that type.
    if (tenant.tenant_type !== 'supplier_org') { // Adjust 'supplier_org' to match your actual tenant type enum/string
        console.warn(`[SUPPLIER_DASHBOARD] Tenant '${tenant.name}' (${tenant.subdomain}) is not a supplier_org (type: ${tenant.tenant_type}). Access denied.`);
        // Redirect to an access denied page on the current subdomain or to select-tenant on root
        // For now, redirecting to select-tenant on the root.
        const rootDomain = process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'; // Get this from a shared config
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=incorrect_tenant_type_for_supplier&type=${tenant.tenant_type}&attempted=${tenant.subdomain}`);
    }

    // TODO: Add session check to ensure the logged-in user:
    // 1. Belongs to *this specific tenant* (tenant.id)
    // 2. Has a role that permits access to the supplier dashboard (e.g., 'supplier_admin', 'supplier_user')
    // if (!session.user.tenantId || session.user.tenantId !== tenant.id) {
    //   console.warn(`[SUPPLIER_DASHBOARD] Authenticated user does not belong to tenant '${tenant.name}'.`);
    //   return redirect(`/access-denied?reason=tenant_mismatch`); // Or similar
    // }
    // if (!session.user.roles?.includes('supplier_admin')) { // Example role check
    //   console.warn(`[SUPPLIER_DASHBOARD] User does not have required supplier role for tenant '${tenant.name}'.`);
    //   return redirect(`/access-denied?reason=role_insufficient`); // Or similar
    // }


    // This is the content that will be passed to the 'Dashboard' section of the layout
    const initialDashboardMainContent = (
        <div className="w-full">
            <header className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Overview for {tenant.name}</h2>
                <p className="text-md text-gray-600">
                    Here's a quick look at your supplier activities.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Quick Stats</h3>
                    <p className="text-gray-700">New Orders: <strong>5</strong></p>
                    <p className="text-gray-700">Pending Shipments: <strong>3</strong></p>
                    <p className="text-gray-700">Active Products: <strong>120</strong></p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">Recent Activity</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Order #ORD78901 processed.</li>
                        <li>Product "Super Widget" updated.</li>
                        <li>Shipment #SHP123 dispatched.</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-amber-700 mb-2">Alerts</h3>
                    <p className="text-gray-700">Low stock: 'Basic Gizmo' (5 units left)</p>
                    <p className="text-gray-700">New message from "Buyer Inc."</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                 <h3 className="text-xl font-semibold text-gray-700 mb-3">Performance Snapshot</h3>
                 {/* Placeholder for a small chart or more detailed stats */}
                 <div className="h-48 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                    Chart / Graph Area
                 </div>
            </div>
        </div>
    );

    return (
        <DashboardLayoutSupplier
            tenant={tenant}
            initialDashboardContent={initialDashboardMainContent}
        />
    );
}