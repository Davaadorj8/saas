// src/app/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link'; // Use Next.js Link for client-side navigation
import prisma from '@/lib/prisma'; // Your Prisma client
import type { Tenant } from '@prisma/client'; // Or from '@/generated/prisma' if aliased

// Environment variable for app name
const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MySuperSaaS';

export default async function RootPage() {
    // Using 'await headers()' as confirmed for your Next.js version
    const headerList = await headers();
    const tenantSubdomainFromHeader = headerList.get('x-tenant-id');

    // --- Scenario 1: Accessed on a Tenant Subdomain ---
    if (tenantSubdomainFromHeader) {
        console.log(`[RootPage] Accessed on subdomain: ${tenantSubdomainFromHeader}`);
        let tenant: Tenant | null = null;
        try {
            tenant = await prisma.tenant.findUnique({
                where: { subdomain: tenantSubdomainFromHeader },
            });
        } catch (error) {
            console.error(`[RootPage] Error fetching tenant '${tenantSubdomainFromHeader}' from DB:`, error);
            // Redirect to a generic error page or back to select-tenant on the main domain
            // Constructing the full URL for select-tenant on the root domain
            const rootDomain = process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || 'mysuper-saas.com'
                : process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
            const protocol = rootDomain.startsWith('localhost') ? 'http' : 'https';
            const errorRedirectPath = `${protocol}://${rootDomain}/select-tenant?error=db_error_tenant_lookup&attempted=${tenantSubdomainFromHeader}`;
            return redirect(errorRedirectPath);
        }

        if (!tenant) {
            console.warn(`[RootPage] Tenant with subdomain '${tenantSubdomainFromHeader}' not found in DB. Header might be stale or DB out of sync with middleware's VALID_TENANT_SUBDOMAINS.`);
            const rootDomain = process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || 'mysuper-saas.com'
                : process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
            const protocol = rootDomain.startsWith('localhost') ? 'http' : 'https';
            const redirectPath = `${protocol}://${rootDomain}/select-tenant?error=tenant_not_found_in_db&attempted=${tenantSubdomainFromHeader}`;
            return redirect(redirectPath);
        }

        // If tenant is found, display a welcome/landing page for that tenant
        // This page would typically be shown *after* a user has logged in and is redirected to the tenant's root.
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-gradient-to-br from-slate-100 to-sky-100 text-center">
                <img src="/logo.svg" alt={`${tenant.name || NEXT_PUBLIC_APP_NAME} Logo`} className="w-20 h-20 mb-6" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                    Welcome to {tenant.name || 'Your Organization'}!
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 mb-8">
                    You've successfully accessed the <span className="font-semibold text-indigo-600">{tenant.subdomain}</span> portal.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                    <Link
                        href={`/${tenant.subdomain}/dashboard`} // Or just "/dashboard" if paths are generic after subdomain routing
                        className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                        Go to Dashboard
                    </Link>
                    {/* Add other relevant links for the tenant */}
                    <Link
                        href="/profile" // Assuming /profile is a path within the tenant's context
                        className="inline-block px-8 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow-md hover:bg-slate-300 transition duration-150 ease-in-out"
                    >
                        View Profile
                    </Link>
                </div>
                <p className="text-xs text-slate-500 mt-10">
                    Tenant Type: {tenant.tenant_type} | ID: {tenant.id}
                </p>
            </main>
        );
    } else {
        // --- Scenario 2: Accessed on the Root Domain (e.g., localhost:3000/ or mysuper-saas.com/) ---
        // The middleware should already handle this and redirect to /select-tenant.
        // This block acts as a fallback or if middleware is bypassed for the root path for some reason.
        console.log("[RootPage] Accessed on root domain (no x-tenant-id header). Redirecting to /select-tenant.");
        return redirect('/select-tenant?from=root_page_direct_access_fallback');
    }
}