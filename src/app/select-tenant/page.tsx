// src/app/select-tenant/page.tsx
import React, { Suspense } from 'react'; // Suspense can be used with dynamic imports for better control
import SelectTenantLoader from '@/components/auth/SelectTenantLoader';

// Environment variable for app name
const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MySuperSaaS';

// This page is a Server Component.
// It's responsible for laying out the page structure where the tenant selection form will be loaded.
// It does not need to be dynamic itself unless there are other server-side reasons.
// The client-side interactivity is handled by SelectTenantLoader and SelectTenantForm.

export default function SelectTenantPageContainer() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/*
                The SelectTenantLoader will dynamically import SelectTenantForm.
                Using Suspense here is optional if SelectTenantLoader's own 'loading' prop is sufficient,
                but can be useful for more complex loading states or if SelectTenantLoader itself
                did async operations (which it currently doesn't).
            */}
            <Suspense fallback={<DefaultLoadingFallback />}>
                <SelectTenantLoader />
            </Suspense>

            <footer className="absolute bottom-4 text-center w-full text-xs text-gray-500">
                © {new Date().getFullYear()} {NEXT_PUBLIC_APP_NAME}. All rights reserved.
            </footer>
        </div>
    );
}

// A simple fallback component for Suspense, matching the style of the loader's fallback
const DefaultLoadingFallback = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
                <img
                    className="mx-auto h-12 w-auto animate-pulse"
                    src="/logo.svg"
                    alt="Loading..."
                />
                <h1 className="text-2xl font-bold text-gray-700 mt-4">Loading...</h1>
                <div className="mt-6 w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto"></div>
            </div>
        </div>
    );
};