// src/app/select-tenant/page.tsx
import React from 'react';
import SelectTenantLoader from '@/components/auth/SelectTenantLoader'; // Import the new loader component

// This page can now be a simple Server Component.
// 'export const dynamic = 'force-dynamic';' might still be beneficial here
// to ensure the page itself isn't statically prerendered if there are other dynamic aspects,
// but the primary cause of the useSearchParams error is now handled by the client-side dynamic import.
// For now, let's try without it first to see if the dynamic loader is sufficient.
// export const dynamic = 'force-dynamic';


export default function SelectTenantPageContainer() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <SelectTenantLoader /> {/* Use the loader component */}
            <footer className="absolute bottom-4 text-center w-full text-xs text-gray-500">
                © {new Date().getFullYear()} SAASPro. All rights reserved.
            </footer>
        </div>
    );
}