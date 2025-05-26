// src/app/supplier/login/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma'; // Ensure this path is correct for your prisma client
import type { Tenant } from '@prisma/client';
import LoginForm from '@/components/auth/LoginForm'; // Uses your shared LoginForm

export default async function SupplierLoginPage() {
  const headerList = await headers();
  const tenantSubdomain = headerList.get('x-tenant-id');

  console.log(`[PAGE] src/app/supplier/login/page.tsx - Rendering for tenant: ${tenantSubdomain}`);

  if (!tenantSubdomain || tenantSubdomain !== 'supplier') {
    // This page is specifically for the 'supplier' subdomain's login.
    console.error(`[SUPPLIER LOGIN PAGE] Invalid or missing tenantSubdomain: ${tenantSubdomain}. Expected 'supplier'.`);
    return redirect('/select-tenant?error=invalid_supplier_login_access');
  }

  // Fetch tenant details to display name, etc.
  const tenant = await prisma.tenant.findUnique({ where: { subdomain: tenantSubdomain } });

  if (!tenant) {
    console.error(`[SUPPLIER LOGIN PAGE] Tenant '${tenantSubdomain}' not found.`);
    return redirect(`/select-tenant?error=tenant_not_found_on_login_page&attempted=${tenantSubdomain}`);
  }
  
  // Optional: you could add specific checks or branding for 'supplier_org' type if needed
  // if (tenant.tenant_type.toLowerCase() !== 'supplier_org_type_name') { ... }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"> {/* Slightly different bg for visual distinction */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* You can have a specific logo for supplier login here if needed */}
        <img className="mx-auto h-12 w-auto" src="/logo-supplier.svg" alt={`${tenant.name} Logo`} /> {/* Different logo example */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to {tenant.name}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Supplier Hub
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <LoginForm
            tenantSubdomain={tenant.subdomain} // Should be "supplier"
            tenantDisplayName={tenant.name || "Supplier Hub"}
          />
           {/* Optional: Links specific to suppliers */}
           {/* <div className="mt-4 text-center text-sm">
                <Link href="/supplier-registration-info" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Learn about becoming a supplier
                </Link>
            </div> */}
        </div>
      </div>
    </div>
  );
}