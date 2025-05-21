// src/modules/tenant/services.ts
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client'; // Using 'type' for type-only imports

// This interface can be useful if you intend to add more properties to TenantDetails
// that are not directly on the Prisma Tenant model. If TenantDetails is always
// identical to Tenant, you could potentially use 'Tenant' directly in return types.
export interface TenantDetails extends Tenant {
    // Example:
    // lastActivity?: Date;
    // userCount?: number;
}

/**
 * Fetches tenant details by its subdomain.
 * @param subdomain The tenant's unique subdomain string.
 * @returns TenantDetails (which includes all Tenant fields) or null if not found or on error.
 */
export async function getTenantBySubdomain(subdomain: string): Promise<TenantDetails | null> {
    if (!subdomain) {
        console.warn('[GET_TENANT_BY_SUBDOMAIN] Subdomain parameter is empty or null.');
        return null;
    }
    try {
        const tenant = await prisma.tenant.findUnique({
            where: { subdomain },
        });
        // If 'tenant' is found, it already matches the 'Tenant' type,
        // and since TenantDetails extends Tenant, it's a valid TenantDetails.
        return tenant;
    } catch (error) {
        console.error(`[GET_TENANT_BY_SUBDOMAIN] Error fetching tenant by subdomain '${subdomain}':`, error);
        return null; // Return null on error as per current design
    }
}

/**
 * Fetches tenant details by its ID.
 * @param id The tenant's unique ID.
 * @returns TenantDetails (which includes all Tenant fields) or null if not found or on error.
 */
export async function getTenantById(id: string): Promise<TenantDetails | null> {
    if (!id) {
        console.warn('[GET_TENANT_BY_ID] ID parameter is empty or null.');
        return null;
    }
    try {
        const tenant = await prisma.tenant.findUnique({
            where: { id },
        });
        return tenant;
    } catch (error) {
        console.error(`[GET_TENANT_BY_ID] Error fetching tenant by id '${id}':`, error);
        return null; // Return null on error as per current design
    }
}