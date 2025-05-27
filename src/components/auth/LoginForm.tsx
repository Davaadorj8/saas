// src/components/auth/LoginForm.tsx
"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react'; // <<<< IMPORT signIn from NextAuth.js

// Interface for LoginApiResponse is no longer strictly needed for the signIn result,
// but can be kept if you have other uses or for initial error message understanding.
// The `signIn` function returns a specific object structure.

export default function LoginForm({
    tenantSubdomain,
    tenantDisplayName,
}: {
    tenantSubdomain: string | null; // Keep this prop to pass to signIn
    tenantDisplayName: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 'rememberMe' is not directly handled by NextAuth.js signIn by default.
    // Session duration is controlled by NextAuth.js config (maxAge in session options or cookie expiry).
    // If you need custom "remember me" beyond default session, it requires more advanced setup.
    // For now, let's comment it out or remove it to simplify.
    // const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    // Success message might not be needed as we redirect immediately on success
    // const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        // NextAuth.js can pass an 'error' query param on redirect from its default error page
        // or if the signIn call itself fails and you redirect.
        const error = searchParams.get('error');
        if (error) {
            // You can map NextAuth.js error codes to more user-friendly messages
            // Common error from CredentialsProvider if authorize returns null or throws: "CredentialsSignin"
            if (error === "CredentialsSignin") {
                setErrorMessage("Invalid email, password, or organization. Please try again.");
            } else if (error === "OAuthAccountNotLinked") {
                setErrorMessage("This email is already linked with another provider. Please sign in using that method.");
            } else {
                // Try to decode and display the error message if it's URL-encoded
                try {
                    const decodedError = decodeURIComponent(error);
                    setErrorMessage(decodedError || `Login failed: An unexpected error occurred.`);
                } catch (e) {
                    setErrorMessage(`Login failed: An unexpected error occurred.`);
                }
            }
        }
        // Clear the error from URL to prevent it from showing again on refresh
        // router.replace(router.pathname, undefined); // Be careful with this, might cause loops if not handled well
    }, [searchParams]); // router removed from dependencies to avoid potential re-renders triggering this


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);
        // setSuccessMessage(null);

        if (!tenantSubdomain) {
            setErrorMessage("Cannot log in: Organization information is missing. Please select your organization first.");
            setIsLoading(false);
            return;
        }

        try {
            // Use NextAuth.js signIn function
            const result = await signIn('credentials', {
                // We handle the redirect manually to show errors on this page
                redirect: false,
                email: email.toLowerCase(),
                password: password,
                tenantSubdomain: tenantSubdomain, // Pass tenantSubdomain to your `authorize` function
                // rememberMe, // 'rememberMe' is not a standard param for CredentialsProvider by default
            });

            setIsLoading(false); // Set loading to false after signIn attempt

            if (result?.error) {
                // `result.error` will contain the error message thrown from your `authorize` function
                // or a generic NextAuth.js error code (e.g., "CredentialsSignin")
                console.error('NextAuth SignIn Error:', result.error);
                // Use the error message directly from NextAuth if available and user-friendly
                // Otherwise, provide a generic one based on "CredentialsSignin"
                if (result.error === "CredentialsSignin" || result.error.includes("Invalid email or password") || result.error.includes("Organization not found")) {
                    setErrorMessage(result.error); // Display the error from authorize
                } else {
                    setErrorMessage("Login failed. Please check your credentials or organization.");
                }
            } else if (result?.ok && result.url) {
                // Login was successful
                // `result.ok` is true and `result.url` will be the intended redirect URL
                // setSuccessMessage('Login successful! Redirecting...'); // Optional
                const callbackUrl = searchParams.get('callbackUrl'); // Check for callbackUrl from query
                router.push(callbackUrl || `/${tenantSubdomain}/dashboard`); // Redirect to dashboard or callbackUrl
            } else if (result?.ok && !result.url) {
                // This case should ideally not happen if redirect:false is used and there's no error.
                // It might mean signin was ok but no redirect URL was determined by next-auth (unlikely with redirect:false)
                // For safety, redirect to dashboard.
                const callbackUrl = searchParams.get('callbackUrl');
                router.push(callbackUrl || `/${tenantSubdomain}/dashboard`);
            } else {
                // Fallback for any other unexpected scenario from signIn
                setErrorMessage('An unexpected issue occurred during login. Please try again.');
            }
        } catch (error) {
            // This catch block is for network errors or truly unexpected issues with the signIn call itself
            console.error('Login submit catch error:', error);
            setIsLoading(false);
            setErrorMessage('A network error or unexpected issue occurred. Please try again.');
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
                <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {errorMessage}
                </div>
            )}
            {/* Success message is less common here as we usually redirect immediately */}
            {/* {successMessage && (
                <div role="alert" className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
                    {successMessage}
                </div>
            )} */}
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
                {/* "Remember me" is generally handled by session duration in NextAuth.js */}
                {/* <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        // checked={rememberMe}
                        // onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLoading}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div> */}
                <div className="text-sm">
                    {/* Empty div to maintain spacing if remember me is removed, or adjust layout */}
                </div>

                <div className="text-sm">
                    <Link href={tenantSubdomain ? `/${tenantSubdomain}/forgot-password` : "/forgot-password"} className="font-medium text-indigo-600 hover:text-indigo-500">
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