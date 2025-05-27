// src/app/supplier/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';
import DashboardLayoutSupplier from '@/components/dashboard/DashboardLayoutSupplier';
import type { CurrentUser } from '@/types/user'; // Your application's CurrentUser type

// Imports for NextAuth.js session handling
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ensure this path is correct

// Define the content that will be passed to the layout
// This component can optionally use the user prop for display
const SupplierDashboardMainContent = ({ tenant, user }: { tenant: Tenant, user?: CurrentUser | null }) => {
    return (
        <div className="w-full">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-[hsl(var(--card-foreground))]">
                    Supplier Hub {user ? <>for <span className="font-bold text-[hsl(var(--primary))]">{user.name}</span></> : ''}
                </h1>
                <p className="text-md text-[hsl(var(--muted-foreground))]">
                    Managing operations for {tenant.name}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example Supplier Widget 1 */}
                <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3 text-[hsl(var(--card-foreground))]">Product Listings</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Manage your products and inventory levels.</p>
                    <button className="px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md">
                        View Products
                    </button>
                </div>

                {/* Example Supplier Widget 2 */}
                <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3 text-[hsl(var(--card-foreground))]">Incoming Orders</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">View and process new orders from customers.</p>
                     <button className="px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md">
                        View Orders
                    </button>
                </div>

                {/* Example Supplier Widget 3 */}
                <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3 text-[hsl(var(--card-foreground))]">Shipments</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Track your outgoing shipments and logistics.</p>
                     <button className="px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md">
                        Track Shipments
                    </button>
                </div>
            </div>
            {/* TODO: Add more supplier-specific dashboard sections, charts, tables etc. */}
        </div>
    );
};


export default async function SupplierDashboardPage() {
    console.log('--- [PAGE] src/app/supplier/dashboard/page.tsx EXECUTING ---');

    // 1. Get Session (Authentication)
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.log('[SUPPLIER_DASHBOARD_PAGE] User not authenticated. Redirecting to login.');
        const currentPath = '/supplier/dashboard'; // Define the current path for callback
        // Adjust /login if your login page is tenant-specific or has a different base path
        const loginUrl = `/login?callbackUrl=${encodeURIComponent(currentPath)}`;
        return redirect(loginUrl);
    }

    // 2. Adapt session.user to your CurrentUser interface
    // This relies on your NextAuth.js callbacks (jwt and session in authOptions)
    // populating session.user with id, role, tenantId, name, email, image.
    const currentUser: CurrentUser = {
        id: session.user.id,
        name: session.user.name || 'Supplier', // Provide a fallback if name can be null
        email: session.user.email || '',    // Provide a fallback if email can be null
        avatarUrl: session.user.image || undefined, // Map from NextAuth session.user.image
        role: session.user.role,
        // You could also add tenantId to CurrentUser type if frequently needed outside session context
        // tenantId: session.user.tenantId,
    };

    // 3. Get Tenant Context from Headers
    const headerList = await headers();
    const tenantUniqueSubdomain = headerList.get('x-tenant-id');

    console.log(`[SUPPLIER_DASHBOARD_PAGE] Tenant Subdomain from Header: ${tenantUniqueSubdomain}`);

    if (!tenantUniqueSubdomain) {
        console.error(`[SUPPLIER_DASHBOARD_PAGE] Critical: No tenant unique subdomain (x-tenant-id) in header. Pathname: ${headerList.get('x-next-pathname')}`);
        return redirect('/select-tenant?error=tenant_id_header_missing_supplier_dash');
    }

    // 4. Fetch Tenant from Database
    let tenant: Tenant | null = null;
    try {
        console.log(`[SUPPLIER_DASHBOARD_PAGE] Attempting to find tenant with unique subdomain: '${tenantUniqueSubdomain}'`);
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantUniqueSubdomain },
        });
        console.log(`[SUPPLIER_DASHBOARD_PAGE] Tenant found from DB: ${tenant ? tenant.name : 'Not Found'}`);
    } catch (error: any) {
        console.error(`[SUPPLIER_DASHBOARD_PAGE] DB Error fetching tenant '${tenantUniqueSubdomain}':`, error.message, error.stack);
        return redirect(`/select-tenant?error=db_error_supplier_dashboard&attempted=${tenantUniqueSubdomain}`);
    }

    if (!tenant) {
        console.error(`[SUPPLIER_DASHBOARD_PAGE] Tenant with unique subdomain '${tenantUniqueSubdomain}' not found post-query. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_supplier_dashboard&attempted=${tenantUniqueSubdomain}`);
    }

    // 5. Authorization Checks
    // Check 5a: Does the authenticated user's session tenantId match the current tenant's ID?
    if (session.user.tenantId !== tenant.id) {
        console.warn(`[SUPPLIER_DASHBOARD_PAGE] Authorization Denied: User ${currentUser.id} (session tenant: ${session.user.tenantId}) attempted to access tenant ${tenant.id} (${tenant.subdomain}).`);
        return redirect('/unauthorized?error=tenant_mismatch_supplier'); // Or a more specific error page
    }

    // Check 5b: Is the user's role appropriate for this supplier dashboard?
    // Define your valid supplier roles here.
    const validSupplierRoles = ['supplier', 'supplier_admin', 'admin']; // Example roles
    if (!validSupplierRoles.includes(currentUser.role)) {
        console.warn(`[SUPPLIER_DASHBOARD_PAGE] Authorization Denied: User ${currentUser.id} with role '${currentUser.role}' attempted to access supplier dashboard.`);
        return redirect('/unauthorized?error=role_mismatch_supplier');
    }

    // Check 5c: Is the tenant_type correct for this specific dashboard?
    if (tenant.tenant_type && tenant.tenant_type !== 'supplier_org') {
        console.warn(`[SUPPLIER_DASHBOARD_PAGE] Tenant '${tenant.name}' (subdomain: ${tenant.subdomain}) has type '${tenant.tenant_type}' but accessed /supplier/dashboard. Potential misrouting or data inconsistency.`);
        return redirect(`/error?code=incorrect_tenant_type_for_route&expected=supplier_org&actual=${tenant.tenant_type}&tenant_id=${tenant.id}`);
    }

    console.log(`[SUPPLIER_DASHBOARD_PAGE] User ${currentUser.name} (Role: ${currentUser.role}) authorized for tenant: ${tenant.name}. Rendering supplier dashboard layout.`);

    // 6. Render Layout, passing the fetched tenant and currentUser
    return (
        <DashboardLayoutSupplier
            tenant={tenant}
            currentUser={currentUser} // <<<< Passing the currentUser prop
            initialDashboardContent={<SupplierDashboardMainContent tenant={tenant} user={currentUser} />}
        />
    );
}