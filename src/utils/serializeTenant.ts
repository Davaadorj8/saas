// src/utils/serializeTenant.ts
import type { Tenant } from '@prisma/client';

export function serializeTenant(tenant: Tenant) {
  return {
    ...tenant,
    createdAt: tenant.createdAt ? tenant.createdAt.toISOString() : null,
    updatedAt: tenant.updatedAt ? tenant.updatedAt.toISOString() : null,
    // Add other Date fields if present in your Tenant model
  };
}
