// src/app/customer/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';
// import { getServerSession } from 'next-auth/next'; // For auth later
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your authOptions

export default async function CustomerDashboardPage() {
    console.log('--- /customer/dashboard/page.tsx EXECUTING ---');

    const headerList = await headers(); // Using await as per Next.js 15+
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

    // const session = await getServerSession(authOptions); // For auth later
    // TODO: Add session check for authentication and authorization

    if (!tenantSubdomainFromHeader) {
        console.error(`[CUSTOMER_DASHBOARD] No tenant ID found in headers. Redirecting.`);
        return redirect('/select-tenant?error=tenant_required_for_customer_dashboard');
    }

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });
    } catch (error) {
        console.error(`[CUSTOMER_DASHBOARD] Error fetching tenant '${tenantSubdomainFromHeader}' from DB:`, error);
        return redirect(`/select-tenant?error=db_error_customer_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    if (!tenant) {
        console.error(`[CUSTOMER_DASHBOARD] Tenant with subdomain '${tenantSubdomainFromHeader}' not found in DB. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_customer_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    if (tenant.tenant_type !== 'customer_org') {
        console.warn(`[CUSTOMER_DASHBOARD] Tenant '${tenant.name}' (${tenant.subdomain}) is not a customer_org. Access denied or redirecting.`);
        return redirect(`/select-tenant?error=incorrect_tenant_type_for_customer_dashboard&type=${tenant.tenant_type}`);
    }

    // TODO: Add session check to ensure the logged-in user belongs to this tenant and has customer roles.

    return (
        <main className="flex min-h-screen flex-col items-center p-6">
            <div className="w-full max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
                    <p className="text-lg text-gray-600">
                        Welcome, {tenant.name} ({tenant.subdomain})
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">My Orders</h2>
                        <p className="text-gray-700">Track your recent orders and view history.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
                        <p className="text-gray-700">Update your contact information and preferences.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Subscription</h2>
                        <p className="text-gray-700">Manage your subscription details.</p>
                    </div>
                </div>
                {/* More customer-specific dashboard content */}
            </div>
        </main>
    );
}