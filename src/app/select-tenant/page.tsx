// src/app/select-tenant/page.tsx
"use client"; // Directive for Client Component

import { useEffect, useState } from 'react';

// This list should ideally be kept in sync with your middleware.ts
// Or better, imported from a shared configuration module if it grows or changes.
const KNOWN_TENANT_SUBDOMAINS: string[] = ['client', 'supplier', 'customer']; // <<-- YOUR ACTUAL TENANT SUBDOMAINS

export default function TenantSelectionPage() {
  const [baseAppUrl, setBaseAppUrl] = useState<string>('');

  useEffect(() => {
    // Determine base URL on the client side to correctly handle protocol and host.
    // For production, rely on an environment variable.
    // For development, construct from window.location or default to localhost:3000.
    if (process.env.NEXT_PUBLIC_APP_URL) {
      setBaseAppUrl(process.env.NEXT_PUBLIC_APP_URL);
    } else if (typeof window !== 'undefined') {
      // Fallback for development if NEXT_PUBLIC_APP_URL is not set
      // This ensures http://localhost:3000 works correctly
      if (window.location.hostname === 'localhost') {
        setBaseAppUrl(`${window.location.protocol}//${window.location.host}`); // e.g. http://localhost:3000
      } else {
        // Fallback for other non-localhost dev environments or if env var is missing
        // This might happen in some preview environments if not configured.
        // Tries to construct a base URL without any subdomains.
        const parts = window.location.hostname.split('.');
        const mainDomain = parts.length > 1 ? parts.slice(-2).join('.') : window.location.hostname;
        setBaseAppUrl(`${window.location.protocol}//${mainDomain}${window.location.port ? ':' + window.location.port : ''}`);
      }
    } else {
      // Absolute fallback (e.g., during SSR pre-hydration if needed, though less critical for this client page)
      setBaseAppUrl('http://localhost:3000');
    }
  }, []);

  const handleTenantSelect = (tenantSubdomain: string) => {
    if (!baseAppUrl) {
      console.error("Base application URL is not set. Cannot redirect.");
      // Optionally, show an error to the user
      return;
    }

    // The baseAppUrl should already include the protocol and correct host/port.
    // We just need to prepend the subdomain.
    try {
      const urlObject = new URL(baseAppUrl); // Validate and parse the baseAppUrl
      const targetUrl = `${urlObject.protocol}//${tenantSubdomain}.${urlObject.host}/login`;

      console.log('Redirecting to:', targetUrl);

      if (typeof window !== 'undefined') {
        window.location.href = targetUrl; // Best for subdomain navigation
      } else {
        console.error("window object not available for redirection.");
      }
    } catch (error) {
      console.error("Error constructing target URL:", error);
      // Handle invalid baseAppUrl if necessary
    }
  };

  if (!baseAppUrl) {
    // Optional: Show a loading state or a simple message while baseAppUrl is being determined.
    // This flicker should be minimal.
    return <div>Loading tenant selection...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '30px', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: '#333' }}>
        Select Your Portal
      </h1>
      <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: '350px' }}>
        {KNOWN_TENANT_SUBDOMAINS.map((tenant) => (
          <li
            key={tenant}
            onClick={() => handleTenantSelect(tenant)}
            style={{
              cursor: 'pointer',
              padding: '15px 25px',
              margin: '12px 0',
              border: '1px solid #ddd',
              borderRadius: '8px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
              fontSize: '1.1rem',
              fontWeight: 500,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e9e9e9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f9f9f9';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Access {tenant.charAt(0).toUpperCase() + tenant.slice(1)}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: '40px' }}>
        <a href="/about-us" style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem' }}>
          Learn more about us
        </a>
      </p>
    </div>
  );
}