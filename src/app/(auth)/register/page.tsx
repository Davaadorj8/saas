// C:\Users\user\Documents\saas\src\app\(auth)\register\page.tsx
import { headers } from 'next/headers';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm'; // Import the Client Component

const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MySuperSaaS';

export default async function RegisterPage() {
    // Use 'await' if your Next.js version's typings or behavior for headers() in async components necessitate it.
    // Based on your previous feedback, 'await' fixed a similar issue for login.
    const headerList = await headers();
    const tenantSubdomain = headerList.get('x-tenant-id'); // e.g., "supplier", "client", or null

    let tenantDisplayName = NEXT_PUBLIC_APP_NAME; // Default if no specific tenant context
    let pageTitleAction = "Create your account";

    if (tenantSubdomain) {
        const capitalizedSubdomain = tenantSubdomain.charAt(0).toUpperCase() + tenantSubdomain.slice(1);
        tenantDisplayName = `${capitalizedSubdomain} Portal`; // e.g., "Supplier Portal"
        pageTitleAction = `Join ${tenantDisplayName}`;
    } else {
        // This case implies registration on the root domain.
        // Your middleware might redirect this to /select-tenant if root registration isn't allowed,
        // or this page could be used for a flow where the user also creates a new tenant.
        // For now, we'll assume it's a generic registration if no tenantSubdomain.
        console.warn("RegisterPage: No tenant subdomain identified. Proceeding with generic registration or new tenant flow (if applicable).");
        // tenantDisplayName remains NEXT_PUBLIC_APP_NAME
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/logo.svg" // Ensure logo.svg is in your /public folder
                    alt={`${NEXT_PUBLIC_APP_NAME} Logo`}
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {pageTitleAction}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href={tenantSubdomain ? `/login` : "/login"} /* Stays on subdomain if present */
                          className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
                {/* Optionally, provide a link to select tenant if user landed here by mistake */}
                {tenantSubdomain && (
                     <p className="mt-1 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/select-tenant" className="font-medium text-indigo-600 hover:text-indigo-500">
                            access a different organization
                        </Link>
                    </p>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {/* Pass only serializable data props to the Client Component */}
                    <RegisterForm
                        tenantSubdomain={tenantSubdomain}
                        tenantDisplayName={tenantDisplayName}
                    />
                </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
                {tenantSubdomain ? (
                    <p>You are creating an account for the <span className="font-semibold">{tenantDisplayName}</span>.</p>
                ) : (
                    <p>Creating a new account on {NEXT_PUBLIC_APP_NAME}.</p>
                )}
            </div>
        </div>
    );
}