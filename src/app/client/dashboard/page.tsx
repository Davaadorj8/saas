// src/app/client/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';
// import { getServerSession } from 'next-auth/next'; // We'll use this later for auth
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your authOptions

export default async function ClientDashboardPage() {
    console.log('--- /client/dashboard/page.tsx EXECUTING ---');

    const headerList = await headers(); // Using await as per Next.js 15+
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id'); // This is the subdomain string

    // const session = await getServerSession(authOptions); // Get user session (for later)

    // For now, a simple check. Later, we'll integrate proper auth.
    // if (!session || !session.user || session.user.tenantId !== tenant?.id || session.user.role !== 'client_role_needed') {
    //     console.log('Client Dashboard: Unauthorized access attempt or session issue.');
    //     return redirect(`/login?callbackUrl=/client/dashboard`);
    // }


    if (!tenantSubdomainFromHeader) {
        // This should ideally be caught by middleware if this is a protected route
        console.error(`[CLIENT_DASHBOARD] No tenant ID found in headers. This page requires tenant context. Redirecting.`);
        return redirect('/select-tenant?error=tenant_required_for_client_dashboard');
    }

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });
    } catch (error) {
        console.error(`[CLIENT_DASHBOARD] Error fetching tenant '${tenantSubdomainFromHeader}' from DB:`, error);
        return redirect(`/select-tenant?error=db_error_client_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    if (!tenant) {
        console.error(`[CLIENT_DASHBOARD] Tenant with subdomain '${tenantSubdomainFromHeader}' not found in DB. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_client_dashboard&attempted=${tenantSubdomainFromHeader}`);
    }

    // Further check: Is this tenant actually a 'client_org'?
    if (tenant.tenant_type !== 'client_org') {
        console.warn(`[CLIENT_DASHBOARD] Tenant '${tenant.name}' (${tenant.subdomain}) is not a client_org. Access denied or redirecting.`);
        // You might redirect to a generic dashboard or an error page, or their appropriate dashboard type
        return redirect(`/select-tenant?error=incorrect_tenant_type_for_client_dashboard&type=${tenant.tenant_type}`);
    }

    // At this point, we have a valid client tenant.
    // TODO: Add session check to ensure the logged-in user belongs to this tenant and has client roles.

    return (
        <main className="flex min-h-screen flex-col items-center p-6">
            <div className="w-full max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Client Dashboard</h1>
                    <p className="text-lg text-gray-600">
                        Welcome, {tenant.name} ({tenant.subdomain})
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Dashboard Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">My Projects</h2>
                        <p className="text-gray-700">View and manage your ongoing projects.</p>
                        {/* Placeholder for project list or link */}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Support Tickets</h2>
                        <p className="text-gray-700">Create new tickets or check status.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Account Details</h2>
                        <p className="text-gray-700">Manage your profile and billing.</p>
                    </div>
                </div>
                {/* More client-specific dashboard content will go here */}
            </div>
        </main>
    );
}