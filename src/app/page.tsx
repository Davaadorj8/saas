// src/app/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';

export default async function HomePage() {
  const headerList = await headers(); // <<--- MUST use await
  const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

  if (tenantSubdomainFromHeader) {
    let tenant: Tenant | null = null;
    try {
      tenant = await prisma.tenant.findUnique({
        where: { subdomain: tenantSubdomainFromHeader },
      });
    } catch (error) {
      console.error(`[APP_PAGE] Error fetching tenant from DB:`, error);
      const errorRedirectPath = `/select-tenant?error=db_error&attempted=${tenantSubdomainFromHeader}`;
      return redirect(errorRedirectPath);
    }

    if (!tenant) {
      const redirectPath = `/select-tenant?error=tenant_on_root_not_found&attempted=${tenantSubdomainFromHeader}`;
      return redirect(redirectPath);
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to {tenant.name}!</h1>
        <p className="text-2xl text-center">
          You are on the main page for the <span className="font-semibold text-blue-600">{tenant.subdomain}</span> tenant.
        </p>
        <p className="text-sm text-gray-500 mt-2">(Tenant Type: {tenant.tenant_type})</p>
        <a href="/dashboard" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Dashboard
        </a>
      </main>
    );
  } else {
    return redirect('/select-tenant?from=root_page_direct_access');
  }
}