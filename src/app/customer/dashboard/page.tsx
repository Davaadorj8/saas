// src/app/customer/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma'; // Ensure this path is correct
import type { Tenant } from '@prisma/client'; // Ensure this path is correct
import DashboardLayoutCustomer from '@/components/dashboard/DashboardLayoutCustomer'; // Import the layout

// import { getServerSession } from 'next-auth/next'; // For auth later
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your authOptions

// This component represents the specific content for the "Dashboard" section
// when DashboardLayoutCustomer's activeSection is 'Dashboard'.
const CustomerDashboardMainContent = ({ tenant }: { tenant: Tenant }) => {
    // This content will be passed to the `initialDashboardContent` prop of the layout
    return (
        <>
            {/* This header is part of the content rendered by initialDashboardContent,
                The DashboardLayoutCustomer itself will have its own header for the active section title. */}
            <header className="mb-6 pb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Welcome to Your Dashboard, <span className="text-green-700">{tenant.name}!</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Here's a quick overview of your account.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">My Orders</h2>
                    <p className="text-gray-600 text-sm">Track your recent orders and view your complete order history.</p>
                    {/* Example Link - adjust path as needed if 'My Services' section handles orders */}
                    {/* <Link href={`/${tenant.subdomain}/orders`} className="text-green-600 hover:text-green-700 font-medium mt-4 inline-block text-sm">View Orders →</Link> */}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Profile Settings</h2>
                    <p className="text-gray-600 text-sm">Update your contact information, password, and communication preferences.</p>
                    {/* Example Link - adjust path if 'My Profile' section handles this */}
                     {/* <Link href={`/${tenant.subdomain}/profile`} className="text-green-600 hover:text-green-700 font-medium mt-4 inline-block text-sm">Edit Profile →</Link> */}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Active Subscriptions</h2>
                    <p className="text-gray-600 text-sm">Manage your current subscriptions and view billing details.</p>
                    {/* Example Link */}
                    {/* <Link href={`/${tenant.subdomain}/subscriptions`} className="text-green-600 hover:text-green-700 font-medium mt-4 inline-block text-sm">Manage Subscriptions →</Link> */}
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Support Tickets</h2>
                    <p className="text-gray-600 text-sm">View your support tickets or create a new one.</p>
                </div>
            </div>
            {/* You can add more high-level summary components here */}
        </>
    );
};


export default async function CustomerDashboardPage() {
    console.log('--- [PAGE] src/app/customer/dashboard/page.tsx EXECUTING ---');

    // TODO: Implement robust session checking for authentication
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user) {
    //     console.log('[CUSTOMER_DASHBOARD] No active session. Redirecting to login.');
    //     // Construct the correct login URL for this tenant, e.g., /customer/login
    //     const tenantLoginUrl = `/customer/login?callbackUrl=${encodeURIComponent('/customer/dashboard')}`;
    //     return redirect(tenantLoginUrl);
    // }

    const headerList = await headers();
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

    if (!tenantSubdomainFromHeader) {
        console.error(`[CUSTOMER_DASHBOARD] Critical: No x-tenant-id header. This should be set by middleware. Redirecting to root selection.`);
        // This redirect should ideally go to the root domain's tenant selection.
        // For simplicity, using a relative path that middleware might catch.
        return redirect('/select-tenant?error=customer_dashboard_missing_tenant_header');
    }

    // Verify the header matches the expected subdomain for this route, if necessary,
    // though middleware rewrite should ensure this.
    if (tenantSubdomainFromHeader !== 'customer') {
        console.warn(`[CUSTOMER_DASHBOARD] Mismatched tenant header. Expected 'customer', got '${tenantSubdomainFromHeader}'. Redirecting.`);
        return redirect('/select-tenant?error=customer_dashboard_mismatched_header');
    }

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader }, // Should be 'customer'
        });
    } catch (error) {
        console.error(`[CUSTOMER_DASHBOARD] Database error fetching tenant '${tenantSubdomainFromHeader}':`, error);
        return redirect(`/select-tenant?error=db_error_cd&attempted=${tenantSubdomainFromHeader}`);
    }

    if (!tenant) {
        console.error(`[CUSTOMER_DASHBOARD] Tenant with subdomain '${tenantSubdomainFromHeader}' not found. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_cd&attempted=${tenantSubdomainFromHeader}`);
    }

    // Explicitly check if this tenant is of type 'customer_org' for this specific dashboard page.
    if (tenant.tenant_type.toLowerCase() !== 'customer_org') {
        console.warn(`[CUSTOMER_DASHBOARD] Tenant '${tenant.name}' (subdomain: ${tenant.subdomain}, type: ${tenant.tenant_type}) is not a 'customer_org'. Access to this specific dashboard denied.`);
        // Redirect to a generic error, or perhaps the root domain, or a page indicating wrong access.
        // Or, if you have a generic dashboard page this user *should* see:
        // return redirect('/dashboard'); // This would hit the (dashboard)/dashboard/page.tsx
        return redirect(`/select-tenant?error=incorrect_tenant_type_for_cd&type=${tenant.tenant_type}&expected=customer_org`);
    }

    // TODO: Further authorization: Ensure session.user.id belongs to this tenant.id
    // if (session.user.tenantId !== tenant.id) { // Assuming user object has tenantId
    //     console.warn(`[CUSTOMER_DASHBOARD] AuthZ failure: User ${session.user.id} does not belong to tenant ${tenant.id}.`);
    //     return redirect('/unauthorized'); // Or a more specific error
    // }

    console.log(`[CUSTOMER_DASHBOARD] Successfully validated tenant: ${tenant.name} (Type: ${tenant.tenant_type}). Rendering customer dashboard layout.`);

    return (
        <DashboardLayoutCustomer
            tenant={tenant}
            initialDashboardContent={<CustomerDashboardMainContent tenant={tenant} />}
            // user={session.user} // Pass user object if needed by the layout
        />
    );
}