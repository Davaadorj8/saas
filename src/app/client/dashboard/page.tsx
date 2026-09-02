// src/app/client/dashboard/page.tsx
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';

const DIRECTORY_TENANT_ID = 'client';
const EXPECTED_TENANT_TYPE = 'client_org';

function getTenantDisplay(tenant: Tenant | null, fallbackId: string) {
    return {
        name: tenant?.name || fallbackId.charAt(0).toUpperCase() + fallbackId.slice(1),
        id: tenant?.subdomain || fallbackId,
        isFromDatabase: Boolean(tenant),
    };
}

export default async function ClientDashboardPage() {
    const headerList = await headers();
    const tenantId = headerList.get('x-tenant-id') || DIRECTORY_TENANT_ID;

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantId },
        });
    } catch (error) {
        console.error('[CLIENT_DASHBOARD] Could not fetch tenant from DB. Rendering fallback dashboard.', error);
    }

    if (tenant && tenant.tenant_type !== EXPECTED_TENANT_TYPE) {
        console.warn(
            `[CLIENT_DASHBOARD] Tenant '${tenant.name}' (${tenant.subdomain}) has type '${tenant.tenant_type}', expected '${EXPECTED_TENANT_TYPE}'. Rendering anyway for development access.`,
        );
    }

    const tenantDisplay = getTenantDisplay(tenant, tenantId);

    return (
        <main className="flex min-h-screen flex-col items-center p-6">
            <div className="w-full max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Client Dashboard</h1>
                    <p className="text-lg text-gray-600">
                        Welcome, {tenantDisplay.name} ({tenantDisplay.id})
                    </p>
                    {!tenantDisplay.isFromDatabase && (
                        <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                            No tenant record was found in the database, so this dashboard is using the
                            <code className="mx-1 rounded bg-amber-100 px-1">/client</code>
                            directory as a temporary tenant context.
                        </p>
                    )}
                </header>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
                    <p className="text-gray-700">You can now access the client dashboard from the path-based tenant route.</p>
                </div>
            </div>
        </main>
    );
}
