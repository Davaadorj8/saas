// src/app/supplier/dashboard/page.tsx
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';

const DIRECTORY_TENANT_ID = 'supplier';
const EXPECTED_TENANT_TYPE = 'supplier_org';

function getTenantDisplay(tenant: Tenant | null, fallbackId: string) {
    return {
        name: tenant?.name || fallbackId.charAt(0).toUpperCase() + fallbackId.slice(1),
        id: tenant?.subdomain || fallbackId,
        isFromDatabase: Boolean(tenant),
    };
}

export default async function SupplierDashboardPage() {
    const headerList = await headers();
    const tenantId = headerList.get('x-tenant-id') || DIRECTORY_TENANT_ID;

    let tenant: Tenant | null = null;
    try {
        tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantId },
        });
    } catch (error) {
        console.error('[SUPPLIER_DASHBOARD] Could not fetch tenant from DB. Rendering fallback dashboard.', error);
    }

    if (tenant && tenant.tenant_type !== EXPECTED_TENANT_TYPE) {
        console.warn(
            `[SUPPLIER_DASHBOARD] Tenant '${tenant.name}' (${tenant.subdomain}) has type '${tenant.tenant_type}', expected '${EXPECTED_TENANT_TYPE}'. Rendering anyway for development access.`,
        );
    }

    const tenantDisplay = getTenantDisplay(tenant, tenantId);

    return (
        <main className="flex min-h-screen flex-col items-center p-6">
            <div className="w-full max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Supplier Dashboard</h1>
                    <p className="text-lg text-gray-600">
                        Welcome, {tenantDisplay.name} ({tenantDisplay.id})
                    </p>
                    {!tenantDisplay.isFromDatabase && (
                        <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                            No tenant record was found in the database, so this dashboard is using the
                            <code className="mx-1 rounded bg-amber-100 px-1">/supplier</code>
                            directory as a temporary tenant context.
                        </p>
                    )}
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Product Listings</h2>
                        <p className="text-gray-700">Manage your products and inventory.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Incoming Orders</h2>
                        <p className="text-gray-700">View and process new orders from customers.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Shipments</h2>
                        <p className="text-gray-700">Track your outgoing shipments.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
