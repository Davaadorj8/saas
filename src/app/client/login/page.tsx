// src/app/client/login/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma'; // Ensure this path is correct for your prisma client
import type { Tenant } from '@prisma/client';
import LoginForm from '@/components/auth/LoginForm'; // Uses your shared LoginForm

export default async function ClientLoginPage() {
  const headerList = await headers();
  const tenantSubdomain = headerList.get('x-tenant-id');

  console.log(`[PAGE] src/app/client/login/page.tsx - Rendering for tenant: ${tenantSubdomain}`);

  if (!tenantSubdomain || tenantSubdomain !== 'client') {
    // This page is specifically for the 'client' subdomain's login.
    console.error(`[CLIENT LOGIN PAGE] Invalid or missing tenantSubdomain: ${tenantSubdomain}. Expected 'client'.`);
    return redirect('/select-tenant?error=invalid_client_login_access');
  }

  // Fetch tenant details to display name, etc.
  const tenant = await prisma.tenant.findUnique({ where: { subdomain: tenantSubdomain } });

  if (!tenant) {
    console.error(`[CLIENT LOGIN PAGE] Tenant '${tenantSubdomain}' not found.`);
    return redirect(`/select-tenant?error=tenant_not_found_on_login_page&attempted=${tenantSubdomain}`);
  }
  
  // Optional: you could add specific checks or branding for 'client_org' type if that's distinct from customer_org
  // if (tenant.tenant_type.toLowerCase() !== 'client_org_actual_type_name') { ... }


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"> {/* Different bg for visual distinction */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* You can have a specific logo for client login here if needed */}
        <img className="mx-auto h-12 w-auto" src="/logo-client.svg" alt={`${tenant.name} Logo`} /> {/* Different logo example */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800"> {/* Slightly different text color */}
          Sign in to {tenant.name}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-700"> {/* Slightly different text color */}
          Client Portal
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10"> {/* Slightly different shadow */}
          <LoginForm
            tenantSubdomain={tenant.subdomain} // Should be "client"
            tenantDisplayName={tenant.name || "Client Portal"}
          />
          {/* No "Create Account" link here if clients are onboarded differently */}
        </div>
      </div>
    </div>
  );
}