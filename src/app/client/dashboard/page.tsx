// src/app/client/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma'; // Adjust path if necessary
import type { Tenant } from '@prisma/client';
import DashboardLayoutClient from '@/components/dashboard/DashboardLayoutClient'; // Adjust path

// import { getServerSession } from 'next-auth/next'; // For auth later
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your authOptions

export default async function ClientDashboardPage() {
    console.log('--- /client/dashboard/page.tsx EXECUTING ---');

    const headerList = await headers();
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

    console.log(`[CLIENT_DASHBOARD] Tenant Subdomain from Header: ${tenantSubdomainFromHeader}`);

    // TODO: Add session check for authentication and authorization
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user) {
    //   console.log('[CLIENT_DASHBOARD] No active session. Redirecting to login.');
    //   const callbackUrl = `/client/dashboard`;
    //   return redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}&error=session_required`);
    // }

    if (!tenantSubdomainFromHeader) {
        console.error(`[CLIENT_DASHBOARD] Critical: No x-tenant-id header found. This page should only be accessed via a client subdomain. Redirecting.`);
        return redirect('/select-tenant?error=tenant_id_missing_in_header_client');
    }

    let tenant: Tenant | null = null;
    try {
        console.log(`[CLIENT_DASHBOARD] Attempting to find tenant with subdomain: '${tenantSubdomainFromHeader}'`);
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });
        console.log(`[CLIENT_DASHBOARD] Tenant found from DB: ${tenant ? tenant.name : 'Not Found'}`);
    } catch (error: any) {
        console.error(`[CLIENT_DASHBOARD] DB Error fetching tenant '${tenantSubdomainFromHeader}':`, error.message);
        return redirect(`/select-tenant?error=db_error_on_client_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    if (!tenant) {
        console.error(`[CLIENT_DASHBOARD] Tenant with subdomain '${tenantSubdomainFromHeader}' not found. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_on_client_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    // IMPORTANT: Ensure your Tenant model has a 'tenant_type' field
    // and that 'client_org' is a valid value for that type.
    if (tenant.tenant_type !== 'client_org') { // Adjust 'client_org' to match your actual tenant type
        console.warn(`[CLIENT_DASHBOARD] Tenant '${tenant.name}' (${tenant.subdomain}) is not a client_org (type: ${tenant.tenant_type}). Access denied.`);
        const rootDomain = process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        return redirect(`${protocol}://${rootDomain}/select-tenant?error=incorrect_tenant_type_for_client&type=${tenant.tenant_type}&attempted=${tenant.subdomain}`);
    }

    // TODO: Add session check to ensure the logged-in user:
    // 1. Belongs to *this specific tenant* (tenant.id)
    // 2. Has a role that permits access to the client dashboard
    // if (!session.user.tenantId || session.user.tenantId !== tenant.id) {
    //   console.warn(`[CLIENT_DASHBOARD] Authenticated user does not belong to tenant '${tenant.name}'.`);
    //   return redirect(`/access-denied?reason=tenant_mismatch`);
    // }
    // if (!session.user.roles?.includes('client_user')) { // Example role check
    //   console.warn(`[CLIENT_DASHBOARD] User does not have required client role for tenant '${tenant.name}'.`);
    //   return redirect(`/access-denied?reason=role_insufficient`);
    // }

    console.log(`[CLIENT_DASHBOARD] Successfully loaded tenant: ${tenant.name}. Rendering dashboard.`);

    // This is the content that will be passed to the 'Overview' section of the layout
    const initialDashboardMainContent = (
        <div className="w-full">
            <header className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Welcome to {tenant.name}'s Client Portal</h2>
                <p className="text-md text-gray-600">
                    Your central hub for managing services and information.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Key Services</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Service A: Active</li>
                        <li>Service B: Pending Setup</li>
                        <li>Service C: Renewal Due Soon</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">Important Notices</h3>
                    <p className="text-gray-700">System maintenance scheduled for 2 AM tonight.</p>
                    <p className="text-gray-700">New feature "XYZ" is now live!</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                 <h3 className="text-xl font-semibold text-gray-700 mb-3">Account Snapshot</h3>
                 <p className="text-gray-600">Account Type: {tenant.tenant_type}</p> {/* Changed from tenant.account_tier */}
                 <p className="text-gray-600">Member Since: {new Date(tenant.createdAt).toLocaleDateString()}</p>
                 {/* Placeholder for more account-specific info */}
                 <div className="mt-4 h-32 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                    Usage Metrics / Quick Stats Area
                 </div>
            </div>
        </div>
    );

    return (
        <DashboardLayoutClient
            tenant={tenant}
            initialDashboardContent={initialDashboardMainContent}
        />
    );
}