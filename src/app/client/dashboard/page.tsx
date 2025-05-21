// src/app/client/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';

export default async function ClientDashboardPage() {
    console.log('--- [CLIENT_DASHBOARD] Page Execution Start ---');

    const headerList = await headers();
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

    console.log(`[CLIENT_DASHBOARD] Tenant Subdomain from Header: ${tenantSubdomainFromHeader}`);
    // console.log('[CLIENT_DASHBOARD] Prisma instance available:', !!prisma); // Check if prisma is defined

    if (!tenantSubdomainFromHeader) {
        console.error(`[CLIENT_DASHBOARD] Critical: No tenantSubdomainFromHeader. This shouldn't happen for a dashboard route if middleware is correct. Pathname from headers: ${headerList.get('x-next-pathname')}`); // See what path it thinks it is
        return redirect('/select-tenant?error=tenant_ctx_missing_client_dash');
    }

    let tenant: Tenant | null = null;
    try {
        console.log(`[CLIENT_DASHBOARD] Attempting to find tenant with subdomain: '${tenantSubdomainFromHeader}'`);
        if (prisma && prisma.tenant) { // Extra check
            tenant = await prisma.tenant.findUnique({
                where: { subdomain: tenantSubdomainFromHeader },
            });
            console.log(`[CLIENT_DASHBOARD] Tenant found from DB: ${tenant ? tenant.name : 'Not Found'}`);
        } else {
            console.error('[CLIENT_DASHBOARD] Prisma client or prisma.tenant is not available!');
        }
    } catch (error: any) { // Catch specific error
        console.error(`[CLIENT_DASHBOARD] DB Error fetching tenant '${tenantSubdomainFromHeader}':`, error.message, error.stack);
        // It's possible the error object itself is not serializable for a redirect if it's too complex
        return redirect(`/select-tenant?error=db_error_client_dash&attempted=${tenantSubdomainFromHeader}`);
    }

    if (!tenant) {
        console.error(`[CLIENT_DASHBOARD] Tenant with subdomain '${tenantSubdomainFromHeader}' not found post-query. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_client_dash&attempted=${tenantSubdomainFromHeader}`);
    }

    if (tenant.tenant_type !== 'client_org') {
        console.warn(`[CLIENT_DASHBOARD] Incorrect tenant_type: '${tenant.tenant_type}' for tenant '${tenant.name}'. Redirecting.`);
        return redirect(`/select-tenant?error=incorrect_type_client_dash&type=${tenant.tenant_type}`);
    }

    console.log(`[CLIENT_DASHBOARD] Successfully loaded tenant: ${tenant.name}. Rendering dashboard.`);
    return (
        <main className="flex min-h-screen flex-col items-center p-6">
            {/* ... rest of your JSX ... */}
            <h1 className="text-3xl font-bold text-gray-800">Client Dashboard for {tenant.name}</h1>
        </main>
    );
}