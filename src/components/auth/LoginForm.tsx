// Create this file: C:\Users\user\Documents\saas\src\components\auth\LoginForm.tsx
"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface LoginApiResponse {
    success: boolean;
    message?: string;
    redirectTo?: string;
}

export default function LoginForm({
    tenantSubdomain,
    tenantDisplayName,
}: {
    tenantSubdomain: string | null;
    tenantDisplayName: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const error = searchParams.get('error');
        if (error === 'invalid_credentials') {
            setErrorMessage('Invalid email or password. Please try again.');
        } else if (error === 'tenant_not_found') {
            setErrorMessage('Organization not found. Please verify the address or select your organization.');
        } else if (error) {
            setErrorMessage(`Login failed: An issue occurred (${error}).`);
        }
    }, [searchParams]);


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!tenantSubdomain) {
            setErrorMessage("Cannot log in: Organization information is missing. Please select your organization first.");
            setIsLoading(false);
            // Optionally, redirect to /select-tenant
            // router.push('/select-tenant?error=login_attempt_no_tenant');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    tenantSubdomain,
                    rememberMe,
                }),
            });

            const data: LoginApiResponse = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || `Login failed (status: ${response.status})`);
            } else {
                if (data.success) {
                    setSuccessMessage(data.message || 'Login successful! Redirecting...');
                    const redirectTo = searchParams.get('redirectTo') || data.redirectTo || `/${tenantSubdomain}/dashboard`;
                    router.push(redirectTo);
                } else {
                    setErrorMessage(data.message || 'Login failed. Please check your credentials.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An unexpected error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
                <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div role="alert" className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
                    {successMessage}
                </div>
            )}
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
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50"
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
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLoading}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing in...' : `Sign in to ${tenantDisplayName}`}
                </button>
            </div>
        </form>
    );
}