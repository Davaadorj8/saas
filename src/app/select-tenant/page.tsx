// src/app/select-tenant/page.tsx
"use client"; // This page needs client-side interaction

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SelectTenantPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [subdomain, setSubdomain] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const error = searchParams.get('error');
        const attempted = searchParams.get('attempted');
        if (error === 'unknown_tenant' && attempted) {
            setErrorMessage(`The organization '${attempted}' was not found. Please check the name or contact support.`);
        } else if (error === 'missing_host') {
            setErrorMessage('There was an issue determining your organization. Please try entering its address.');
        } else if (error === 'unrecognized_host') {
             setErrorMessage('The web address you used is not recognized. Please enter your organization\'s address.');
        } else if (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (subdomain.trim()) {
            // In development, construct localhost URL. In production, use the actual domain.
            const targetHost = process.env.NODE_ENV === 'production'
                ? `${subdomain.trim()}.${process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN || 'saaspro.com'}`
                : `${subdomain.trim()}.localhost:3000`;
            window.location.href = `http://${targetHost}`; // Full redirect to change host
        } else {
            setErrorMessage("Please enter your organization's subdomain.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-gray-800">Welcome to SAASPro</h1>
                <p className="text-gray-600">
                    Please enter your organization's address (subdomain) to proceed.
                </p>

                {errorMessage && (
                    <p className="text-red-500 bg-red-100 p-3 rounded-md">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subdomain" className="sr-only">
                            Organization Subdomain
                        </label>
                        <div className="flex items-center">
                            <input
                                id="subdomain"
                                name="subdomain"
                                type="text"
                                required
                                className="appearance-none rounded-l-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="e.g., acme"
                                value={subdomain}
                                onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                                autoCapitalize="none"
                            />
                            <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-r-md">
                                .{process.env.NODE_ENV === 'production' ? (process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN || 'saaspro.com') : 'localhost:3000'}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go to My Organization
                    </button>
                </form>
                <p className="text-xs text-gray-500">
                    Example: If your organization is 'acme.saaspro.com', enter 'acme'.
                </p>
            </div>
        </div>
    );
}