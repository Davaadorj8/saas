// C:\Users\user\Documents\saas\src\app\(auth)\login\page.tsx
import { headers } from 'next/headers';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MySuperSaaS';

export default async function LoginPage() {
    const headerList = await headers(); // Confirmed this pattern works for your Next.js version
    const tenantSubdomain = headerList.get('x-tenant-id'); // e.g., "supplier"

    let tenantDisplayName = NEXT_PUBLIC_APP_NAME;
    let loginPathWithTenantContext = "/login"; // Default path
    let registerPathWithTenantContext = "/register"; // Default path

    if (tenantSubdomain) {
        const capitalizedSubdomain = tenantSubdomain.charAt(0).toUpperCase() + tenantSubdomain.slice(1);
        tenantDisplayName = `${capitalizedSubdomain} Portal`; // e.g., "Supplier Portal"
        // Note: The actual navigation will happen on the current subdomain, so paths are relative to it.
        // No need to construct full subdomain URLs for <Link href="..."> here.
    } else {
        // This block should ideally not be hit if middleware correctly redirects root /login to /select-tenant
        console.warn("[LoginPage] Accessed without a tenant subdomain. This state should be reviewed if unintended.");
        // If somehow here, links will go to /login and /register on the root domain,
        // which middleware should then redirect to /select-tenant.
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/logo.svg"
                    alt={`${NEXT_PUBLIC_APP_NAME} Logo`}
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to {tenantDisplayName}
                </h2>
                {/* Link to select different organization */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link href="/select-tenant" className="font-medium text-indigo-600 hover:text-indigo-500">
                        access a different organization
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm
                        tenantSubdomain={tenantSubdomain}
                        tenantDisplayName={tenantDisplayName}
                    />
                    {/* ADDED REGISTER LINK HERE */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    New to {tenantSubdomain ? tenantDisplayName : NEXT_PUBLIC_APP_NAME}?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href={registerPathWithTenantContext} // Will resolve to /register on the current subdomain
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
                {tenantSubdomain ? (
                    <p>You are signing in to the <span className="font-semibold">{tenantDisplayName}</span>.</p>
                ) : (
                    <p>Please <Link href="/select-tenant" className="font-medium text-indigo-600 hover:text-indigo-500">select your organization</Link> to sign in.</p>
                )}
            </div>
        </div>
    );
}