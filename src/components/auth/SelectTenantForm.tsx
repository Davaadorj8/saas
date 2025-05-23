// C:\Users\user\Documents\saas\src\components\auth\SelectTenantForm.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';

// These should match the values in your .env or .env.local for client-side use
const CLIENT_SIDE_PRODUCTION_ROOT_DOMAIN = process.env.NEXT_PUBLIC_PRODUCTION_ROOT_DOMAIN || 'mysuper-saas.com';
const CLIENT_SIDE_DEV_ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MySuperSaaS';

export default function SelectTenantForm() { // NO props like tenantSubdomain, tenantDisplayName here
    const searchParams = useSearchParams();
    const [subdomainInput, setSubdomainInput] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [currentHostHint, setCurrentHostHint] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const winHostname = window.location.hostname.toLowerCase();
            if (winHostname === 'localhost' || winHostname.startsWith('127.0.0.1')) {
                setCurrentHostHint(CLIENT_SIDE_DEV_ROOT_DOMAIN.replace(/^http(s?):\/\//, ''));
            } else {
                setCurrentHostHint(CLIENT_SIDE_PRODUCTION_ROOT_DOMAIN);
            }
        }

        const error = searchParams.get('error');
        const attempted = searchParams.get('attempted');
        let msg: string | null = null;

        switch (error) {
            case 'unknown_tenant':
                msg = `The organization '${attempted || 'address'}' was not found. Please check the name or contact support.`;
                break;
            case 'unrecognized_host':
                msg = 'The web address you used is not recognized. Please enter your organization\'s address below.';
                break;
            case 'root_access_needs_selection':
                msg = 'Please enter your organization\'s address to continue.';
                break;
            case 'missing_host':
                msg = 'There was an issue determining your organization. Please try entering its address.';
                break;
            case 'middleware_unhandled':
                msg = 'An unexpected error occurred. Please try entering your organization\'s address or contact support.';
                break;
            default:
                if (error) {
                    msg = `An issue occurred (${error}). Please try entering your organization address.`;
                }
        }
        setErrorMessage(msg);
    }, [searchParams]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Set loading true
        const trimmedSubdomain = subdomainInput.trim().toLowerCase();

        if (!trimmedSubdomain) {
            setErrorMessage("Please enter your organization's address (e.g., 'acme', 'supplier').");
            setIsLoading(false);
            return;
        }
        if (trimmedSubdomain.includes('.') || trimmedSubdomain.includes('/')) {
            setErrorMessage("Organization address should only contain letters, numbers, or hyphens (e.g., 'acme-inc').");
            setIsLoading(false);
            return;
        }

        setErrorMessage(null);

        if (typeof window === 'undefined') {
            setIsLoading(false);
            return;
        }

        let targetHostWithSubdomain: string;
        let protocol: string;
        const currentWindowLocation = window.location;
        const winHostname = currentWindowLocation.hostname.toLowerCase();
        const isLocalDevelopment = winHostname === 'localhost' || winHostname.startsWith('127.0.0.1');

        if (isLocalDevelopment) {
            const devRootHostAndPort = CLIENT_SIDE_DEV_ROOT_DOMAIN.replace(/^http(s?):\/\//, '');
            targetHostWithSubdomain = `${trimmedSubdomain}.${devRootHostAndPort}`;
            protocol = currentWindowLocation.protocol;
        } else {
            targetHostWithSubdomain = `${trimmedSubdomain}.${CLIENT_SIDE_PRODUCTION_ROOT_DOMAIN}`;
            protocol = 'https:';
        }

        const redirectUrl = `${protocol}//${targetHostWithSubdomain}/`;
        console.log(`SelectTenantForm: Attempting to redirect to: ${redirectUrl}`);
        window.location.href = redirectUrl;
        // setIsLoading(false); // No need to set false if navigating away, but good if there was an API call here that could fail
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
            <img
                className="mx-auto h-12 w-auto"
                src="/logo.svg"
                alt={`${NEXT_PUBLIC_APP_NAME} Logo`}
            />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Welcome to {NEXT_PUBLIC_APP_NAME}</h1>
            <p className="text-gray-600">
                Please enter your organization's address to continue.
            </p>

            {errorMessage && (
                <div role="alert" className="text-sm text-red-700 bg-red-100 p-3 my-4 rounded-md border border-red-300">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                    <label htmlFor="subdomain" className="sr-only">
                        Organization Address
                    </label>
                    <div className="flex items-center">
                        <input
                            id="subdomain"
                            name="subdomain"
                            type="text"
                            autoComplete="off"
                            required
                            disabled={isLoading}
                            className="appearance-none rounded-l-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100"
                            placeholder="e.g., acme, supplier"
                            value={subdomainInput}
                            onChange={(e) => setSubdomainInput(e.target.value)}
                            autoCapitalize="none"
                            spellCheck="false"
                            aria-describedby="subdomain-hint"
                        />
                        <span
                            id="subdomain-hint"
                            className="inline-flex items-center h-[46px] px-3 border-y border-r border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md whitespace-nowrap"
                        >
                           .{currentHostHint}
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Processing...' : 'Access My Organization'}
                </button>
            </form>
            <p className="text-xs text-gray-500 pt-2">
                Example: If your address is <code className="bg-gray-200 p-1 rounded text-xs">acme.{currentHostHint.split(':')[0]}</code>, enter <code className="bg-gray-200 p-1 rounded text-xs">acme</code>.
            </p>
        </div>
    );
}