// src/components/auth/SelectTenantForm.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import { getTenantDirectoryUrl } from '@/lib/subdirectories';

export default function SelectTenantForm() {
    const searchParams = useSearchParams(); // For reading error query params
    const [directory, setDirectory] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const error = searchParams.get('error');
        const attempted = searchParams.get('attempted');
        let msg: string | null = null;
        switch (error) {
            case 'unknown_tenant':
                msg = `The organization '${attempted || 'directory'}' was not found. Please check the name or contact support.`;
                break;
            case 'missing_host':
                msg = 'There was an issue determining your organization. Please try entering its address.';
                break;
            case 'unrecognized_host':
                msg = 'The web path you used is not recognized. Please enter your organization\'s address.';
                break;
            case 'tenant_required_for_client_dashboard':
            case 'tenant_required_for_customer_dashboard':
            case 'tenant_required_for_supplier_dashboard':
                msg = 'Access to that dashboard requires an organization directory. Please enter it below.';
                break;
            case 'tenant_db_not_found':
            case 'tenant_on_root_not_found':
            case 'tenant_not_found_client_dashboard':
            case 'tenant_not_found_customer_dashboard':
            case 'tenant_not_found_supplier_dashboard':
                msg = `We couldn't find an organization with the directory '${attempted || 'provided'}'. Please check and try again.`;
                break;
            case 'incorrect_tenant_type_for_client_dashboard':
            case 'incorrect_tenant_type_for_customer_dashboard':
            case 'incorrect_tenant_type_for_supplier_dashboard':
                msg = `The organization '${attempted || 'directory'}' is not the correct type for that dashboard.`;
                break;
            case 'db_error':
            case 'db_error_client_dashboard':
            case 'db_error_customer_dashboard':
            case 'db_error_supplier_dashboard':
                 msg = 'We encountered a problem looking up your organization. Please try again shortly.';
                 break;
            case 'middleware_fallback':
            case 'root_page_direct_access':
            case 'root_page_unhandled':
                msg = 'Please select or enter your organization directory.';
                break;
            default:
                if (error) {
                    msg = 'An unexpected issue occurred. Please try entering your organization directory.';
                }
        }
        setErrorMessage(msg);
    }, [searchParams]);

    // src/components/auth/SelectTenantForm.tsx - handleSubmit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedDirectory = directory.trim().toLowerCase();
        if (trimmedDirectory) {
            if (typeof window === 'undefined') return;

            const targetPath = getTenantDirectoryUrl(trimmedDirectory);

            console.log(`Redirecting to: ${targetPath}`);
            window.location.href = targetPath;
        } else {
            setErrorMessage("Please enter your organization's directory (e.g., 'client').");
        }
    };
    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
            <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" // Replace with your actual logo
                alt="SAASPro Logo"
            />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Welcome to SAASPro</h1> {/* Your App Name */}
            <p className="text-gray-600">
                Please enter your organization's directory to continue.
            </p>

            {errorMessage && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                    <label htmlFor="directory" className="sr-only">
                        Organization Directory
                    </label>
                    <div className="flex items-center">
                        <input
                            id="directory"
                            name="directory"
                            type="text"
                            required
                            className="appearance-none rounded-l-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="client"
                            value={directory}
                            onChange={(e) => setDirectory(e.target.value)}
                            autoCapitalize="none"
                            spellCheck="false"
                        />
                        <span className="inline-flex items-center h-[46px] px-3 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md">
                           /dashboard
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Access My Organization
                </button>
            </form>
            <p className="text-xs text-gray-500 pt-2">
                Example: If your dashboard is <code className="bg-gray-200 p-1 rounded">/client/dashboard</code>, enter <code className="bg-gray-200 p-1 rounded">client</code>.
            </p>
        </div>
    );
}