// C:\Users\user\Documents\saas\src\components\auth\RegisterForm.tsx
"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Link from 'next/link'; // Only if you have links directly inside this form component

interface RegisterApiResponse {
    success: boolean;
    message?: string;
    redirectTo?: string;
    errors?: any; // For Zod validation errors from the API
}

export default function RegisterForm({
    tenantSubdomain,
    tenantDisplayName,
}: {
    tenantSubdomain: string | null;
    tenantDisplayName: string;
}) {
    // Log the received props for debugging
    useEffect(() => {
        console.log("[RegisterForm Props] tenantSubdomain:", tenantSubdomain, "tenantDisplayName:", tenantDisplayName);
    }, [tenantSubdomain, tenantDisplayName]);

    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        console.log("[RegisterForm Submit] Current tenantSubdomain state:", tenantSubdomain);

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        // This check is crucial. If this form is always meant to be used in a tenant context,
        // tenantSubdomain should NOT be null here.
        if (!tenantSubdomain) {
            console.error("RegisterForm Error: handleSubmit called but tenantSubdomain prop is null or empty.");
            setErrorMessage("Critical error: Organization context is missing. Please ensure you are on the correct registration page or try selecting your organization again.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', { // Relative path, uses current host (e.g., supplier.localhost:3000)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    // tenantSubdomain from prop is used to confirm context,
                    // but API should rely on x-tenant-id header set by middleware
                    tenantContext: tenantSubdomain,
                }),
            });

            const data: RegisterApiResponse = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flat().join(' '); // Assuming Zod-like error structure
                    setErrorMessage(errorMessages || data.message || `Registration failed (status: ${response.status})`);
                } else {
                    setErrorMessage(data.message || `Registration failed (status: ${response.status})`);
                }
            } else {
                if (data.success) {
                    setSuccessMessage(data.message || 'Registration successful! Redirecting...');
                    const redirectTo = data.redirectTo || `/login`; // Default to login on the same subdomain
                    router.push(redirectTo); // router.push maintains the current subdomain
                } else {
                    setErrorMessage(data.message || 'Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration submission error:', error);
            setErrorMessage('An unexpected error occurred during registration. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
                <div role="alert" className="p-3 my-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div role="alert" className="p-3 my-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
                    {successMessage}
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <div className="mt-1">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>
             <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="mt-1">
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating Account...' : `Create Account for ${tenantDisplayName}`}
                </button>
            </div>
        </form>
    );
}