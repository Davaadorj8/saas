// C:\Users\user\Documents\saas\src\components\auth\SelectTenantLoader.tsx
"use client";

import dynamic from 'next/dynamic';
import React from 'react'; // Explicit React import

// Dynamically import the SelectTenantForm component, disabling SSR for it.
// SSR is disabled because SelectTenantForm uses useSearchParams, a client-side hook.
const SelectTenantFormComponent = dynamic(
    () => import('@/components/auth/SelectTenantForm'), // Path to your actual form
    {
        ssr: false, // Important for components using client-side hooks like useSearchParams
        loading: () => (
            // Basic loading UI, can be customized further
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
                    <img
                        className="mx-auto h-12 w-auto animate-pulse" // Simple pulse animation
                        src="/logo.svg" // Assuming logo.svg is in your public folder
                        alt="Loading..."
                    />
                    <h1 className="text-2xl font-bold text-gray-700 mt-4">Loading Organization Selector</h1>
                    <p className="text-gray-500">Please wait a moment...</p>
                    {/* You could add a spinner component here */}
                    <div className="mt-6 w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto"></div>

                </div>
                <footer className="absolute bottom-4 text-center w-full text-xs text-gray-500">
                     © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME || "MySuperSaaS"}. Loading...
                </footer>
            </div>
        ),
    }
);

export default function SelectTenantLoader() {
    // No props are passed to SelectTenantFormComponent, which is correct
    // because SelectTenantForm itself does not (and should not) expect them.
    return <SelectTenantFormComponent />;
}