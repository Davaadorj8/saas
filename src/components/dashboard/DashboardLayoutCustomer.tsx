// src/app/supplier/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';
import DashboardLayoutSupplier from '@/components/dashboard/DashboardLayoutSupplier';
import type { CurrentUser } from '@/types/user'; // <<<< IMPORT CurrentUser TYPE

// vvvv These imports are now crucial vvvv
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your authOptions (ensure it's correct)
// ^^^^ These imports are now crucial ^^^^

// Define the content that will be passed to the layout
const SupplierDashboardMainContent = ({ tenant, user }: { tenant: Tenant, user?: CurrentUser | null }) => {
    return (
        <div className="w-full">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-[hsl(var(--card-foreground))]">
                    Supplier Hub {user ? `for ${user.name}` : ''}
                </h1>
                <p className="text-md text-[hsl(var(--muted-foreground))]">
                    Managing operations for {tenant.name}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3 text-[hsl(var(--card-foreground))]">Product Listings</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Manage your products and inventory levels.</p>
                    <button className="px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md">
                        View Products
                    </button>
                </div>
                <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3 text-[hsl(var(--card-foreground))]">Incoming Orders</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">View and process new orders from customers.</p>
                     <button className="px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md">
                        View Orders
                    </button>
                </div>
                <div className="bg-[hsl(var(--card))] p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3 text-[hsl(var(--card-foreground))]">Shipments</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Track your outgoing shipments and logistics.</p>
                     <button className="px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:brightness-95 rounded-md">
                        Track Shipments
                    </button>
                </div>
            </div>
        </div>
    );
};


export default async function SupplierDashboardPage() {
    console.log('--- [SUPPLIER_DASHBOARD_PAGE] (/supplier/dashboard/page.tsx) Execution Start ---');

    // 1. Get Session (Authentication)
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.log('[SUPPLIER_DASHBOARD_PAGE] User not authenticated. Redirecting to login.');
        const callbackUrl = `/supplier/dashboard`; // Or dynamically construct if needed
        return redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`); // Adjust /login if your login page is tenant-specific
    }

    // 2. Adapt session.user to your CurrentUser interface
    // This relies on your NextAuth.js callbacks populating session.user correctly
    const currentUser: CurrentUser = {
        id: session.user.id, // From NextAuth session.user.id
        name: session.user.name || 'Supplier', // Default if name is null
        email: session.user.email || '',    // Default if email is null
        avatarUrl: session.user.image || undefined, // Map from NextAuth session.user.image
        role: session.user.role,          // From NextAuth session.user.role
        // tenantId: session.user.tenantId, // If you added tenantId to CurrentUser type AND NextAuth session
    };

    // 3. Get Tenant Context
    const headerList = await headers();
    const tenantUniqueSubdomain = headerList.get('x-tenant-id');

    console.log(`[SUPPLIER_DASHBOARD_PAGE] Tenant Unique Subdomain from Header: ${tenantUniqueSubdomain}`);

    if (!tenantUniqueSubdomain) {
        console.error(`[SUPPLIER_DASHBOARD_PAGE] Critical: No tenant unique subdomain in header. Pathname: ${headerList.get('x-next-pathname')}`);
        return redirect('/select-tenant?error=tenant_id_header_missing_supplier_dash');
    }

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
        console.error(`[SUPPLIER_DASHBOARD_PAGE] Tenant with unique subdomain '${tenantUniqueSubdomain}' not found. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_supplier_dashboard&attempted=${tenantUniqueSubdomain}`);
    }

    // 4. Authorization Checks
    // Does the authenticated user's session tenantId match the current tenant's ID?
    if (session.user.tenantId !== tenant.id) {
        console.warn(`[SUPPLIER_DASHBOARD_PAGE] Authorization Denied: User ${currentUser.id} (session tenant: ${session.user.tenantId}) attempted to access tenant ${tenant.id} (${tenant.subdomain}).`);
        // Redirect to an unauthorized page or the user's correct tenant dashboard if determinable
        return redirect('/unauthorized?error=tenant_mismatch');
    }

    // Is the user's role appropriate for this supplier dashboard?
    // (e.g., 'supplier_admin', 'supplier_member' - adjust roles as per your system)
    if (currentUser.role !== 'supplier' && currentUser.role !== 'admin' && currentUser.role !== 'supplier_admin') { // Example roles
        console.warn(`[SUPPLIER_DASHBOARD_PAGE] Authorization Denied: User ${currentUser.id} with role '${currentUser.role}' attempted to access supplier dashboard.`);
        return redirect('/unauthorized?error=role_mismatch');
    }


    // Check tenant_type for this specific dashboard (this logic can remain)
    if (tenant.tenant_type && tenant.tenant_type !== 'supplier_org') {
        console.warn(`[SUPPLIER_DASHBOARD_PAGE] Tenant '${tenant.name}' (subdomain: ${tenant.subdomain}) has type '${tenant.tenant_type}' but accessed /supplier/dashboard.`);
        return redirect(`/error?code=incorrect_tenant_type_for_route&expected=supplier_org&actual=${tenant.tenant_type}&tenant_id=${tenant.id}`);
    }

    console.log(`[SUPPLIER_DASHBOARD_PAGE] User ${currentUser.name} (Role: ${currentUser.role}) authorized for tenant: ${tenant.name}. Rendering supplier dashboard layout.`);

    // 5. Render Layout with currentUser and tenant
    return (
        <DashboardLayoutSupplier
            tenant={tenant}
            currentUser={currentUser} // <<<< PASSING THE currentUser PROP
            initialDashboardContent={<SupplierDashboardMainContent tenant={tenant} user={currentUser} />}
        />
    );
}