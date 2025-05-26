// src/app/customer/login/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';
import LoginForm from '@/components/auth/LoginForm'; // Uses your shared LoginForm

export default async function CustomerLoginPage() {
  const headerList = await headers();
  const tenantSubdomain = headerList.get('x-tenant-id');

  console.log(`[PAGE] src/app/customer/login/page.tsx - Rendering for tenant: ${tenantSubdomain}`);

  if (!tenantSubdomain || tenantSubdomain !== 'customer') {
    console.error(`[CUSTOMER LOGIN PAGE] Invalid or missing tenantSubdomain: ${tenantSubdomain}. Expected 'customer'.`);
    return redirect('/select-tenant?error=invalid_customer_login_access');
  }

  // Fetch tenant details to display name, etc.
  const tenant = await prisma.tenant.findUnique({ where: { subdomain: tenantSubdomain } });

  if (!tenant) {
    console.error(`[CUSTOMER LOGIN PAGE] Tenant '${tenantSubdomain}' not found.`);
    return redirect(`/select-tenant?error=tenant_not_found_on_login_page&attempted=${tenantSubdomain}`);
  }
  
  // Optional: you could add specific branding or links for 'customer_org' type here
  // if (tenant.tenant_type.toLowerCase() !== 'customer_org') { ... }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* You can have a specific logo for customer login here if needed */}
        <img className="mx-auto h-12 w-auto" src="/logo-customer.svg" alt={`${tenant.name} Logo`} />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to {tenant.name}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Customer Portal
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm
            tenantSubdomain={tenant.subdomain} // Should be "customer"
            tenantDisplayName={tenant.name || "Customer Portal"}
          />
           {/* No "Create Account" link here if customers are created differently */}
        </div>
      </div>
    </div>
  );
}