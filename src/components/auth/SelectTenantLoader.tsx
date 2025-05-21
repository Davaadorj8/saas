// src/components/auth/SelectTenantLoader.tsx
"use client"; // This component MUST be a client component

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the form component, disabling SSR for it.
const SelectTenantFormComponent = dynamic(
    () => import('@/components/auth/SelectTenantForm'), // Path to your actual form
    {
        ssr: false, // This is allowed here because SelectTenantLoader is a Client Component
        loading: () => (
            <div className="flex items-center justify-center min-h-[200px] w-full max-w-md p-8"> {/* Added some styling from the form wrapper */}
                <p className="text-gray-500">Loading form...</p>
            </div>
        ),
    }
);

export default function SelectTenantLoader() {
    return <SelectTenantFormComponent />;
}