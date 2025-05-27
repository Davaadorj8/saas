// src/app/client/dashboard/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Tenant } from '@prisma/client';
import DashboardLayoutClient from '@/components/dashboard/DashboardLayoutClient'; // Specific layout
import { auth } from '@/auth'; // Assuming your NextAuth v5 setup is in '@/auth'
                               // If using Pages Router version or older NextAuth, this would be different (e.g. getSession)

// Content for the initial view of this dashboard
const ClientDashboardMainContent = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Client Portal Overview</h2>
      <p>Manage your services, view history, and get support.</p>
      {/* ... more specific client dashboard widgets ... */}
    </div>
  );
};

// Define the CurrentUser type based on your NextAuth session structure.
// Ensure this matches what your session callback provides, especially 'avatarUrl' and 'role'.
// NextAuth default user object has 'name', 'email', 'image'.
// 'id', 'role', 'avatarUrl' would be custom additions via JWT/session callbacks.
interface CurrentUser {
  id?: string; // Often 'sub' from JWT, added to session.user.id
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null; // This is the field causing the error if undefined. Or it might be 'image'.
  image?: string | null;     // Standard NextAuth field for avatar
  role?: string; // Custom field for user role
}

export default async function ClientSpecificDashboardPage() {
    console.log('--- [CLIENT_SPECIFIC_DASHBOARD] Page Execution Start ---');

    const headerList = headers(); // No need for await with `next/headers`
    const tenantUniqueSubdomain = headerList.get('x-tenant-id');

    console.log(`[CLIENT_SPECIFIC_DASHBOARD] Tenant Unique Subdomain from Header: ${tenantUniqueSubdomain}`);

    if (!tenantUniqueSubdomain) {
        console.error(`[CLIENT_SPECIFIC_DASHBOARD] Critical: No tenant unique subdomain in header. Pathname: ${headerList.get('x-next-pathname')}`);
        // Consider a more generic error page if /select-tenant is not always appropriate
        return redirect('/select-tenant?error=tenant_id_header_missing_client_dash');
    }

    // 1. Fetch Current User Session
    const session = await auth(); // Fetch NextAuth session

    if (!session || !session.user) {
        console.error('[CLIENT_SPECIFIC_DASHBOARD] No authenticated user session found. Redirecting to login.');
        // Redirect to the tenant-specific login page
        // The original logs show a login path like /client/login, so use tenantUniqueSubdomain
        return redirect(`/${tenantUniqueSubdomain}/login?error=session_expired&callbackUrl=/${tenantUniqueSubdomain}/dashboard`);
    }

    // Cast session.user to your CurrentUser type.
    // Ensure your NextAuth session callback populates these fields.
    const currentUser = session.user as CurrentUser;
    
    // It's good practice to verify essential user fields if needed, e.g., if role is critical for this page
    // if (!currentUser.role) {
    //   console.error('[CLIENT_SPECIFIC_DASHBOARD] User session is missing essential role information.');
    //   return redirect(`/${tenantUniqueSubdomain}/login?error=user_profile_incomplete`);
    // }


    // 2. Fetch Tenant Details
    let tenant: Tenant | null = null;
    try {
        console.log(`[CLIENT_SPECIFIC_DASHBOARD] Attempting to find tenant with unique subdomain: '${tenantUniqueSubdomain}'`);
        tenant = await prisma.tenant.findUnique({
            // Ensure 'subdomain' is the correct unique field in your Tenant model for this lookup
            where: { subdomain: tenantUniqueSubdomain },
        });
        console.log(`[CLIENT_SPECIFIC_DASHBOARD] Tenant found from DB: ${tenant ? tenant.name : 'Not Found'}`);
    } catch (error: any) {
        console.error(`[CLIENT_SPECIFIC_DASHBOARD] DB Error fetching tenant '${tenantUniqueSubdomain}':`, error.message);
        return redirect(`/select-tenant?error=db_error_client_dash&attempted=${tenantUniqueSubdomain}`);
    }

    if (!tenant) {
        console.error(`[CLIENT_SPECIFIC_DASHBOARD] Tenant with unique subdomain '${tenantUniqueSubdomain}' not found. Redirecting.`);
        return redirect(`/select-tenant?error=tenant_not_found_client_dash&attempted=${tenantUniqueSubdomain}`);
    }

    // 3. Optional: Tenant Type Check (if applicable to your model)
    // Ensure 'tenant_type' exists on your Tenant model if you use this check.
    if (tenant.tenant_type && tenant.tenant_type !== 'client_org') {
        console.warn(`[CLIENT_SPECIFIC_DASHBOARD] Tenant '${tenant.name}' (subdomain: ${tenant.subdomain}) has type '${tenant.tenant_type}' but accessed /client/dashboard. Potential misrouting or data issue.`);
        return redirect(`/error?code=incorrect_tenant_type_for_route&expected=client_org&actual=${tenant.tenant_type}&tenant=${tenant.subdomain}`);
    }

    console.log(`[CLIENT_SPECIFIC_DASHBOARD] Successfully loaded tenant: ${tenant.name} and user: ${currentUser.name || currentUser.email}. Rendering client dashboard layout.`);

    // 4. Render Dashboard Layout with Tenant and User Data
    return (
        <DashboardLayoutClient
            tenant={tenant}
            currentUser={currentUser} // Pass the fetched currentUser object
            initialDashboardContent={<ClientDashboardMainContent />}
        />
    );
}