Let's break it down:
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."
Correct. This is your Accelerate-enabled connection string for Prisma to connect to your Prisma Managed PostgreSQL database. Both prisma migrate dev (as per Prisma's latest instructions for this service) and your Prisma Client at runtime (src/lib/prisma.ts) will use this.
NEXT_PUBLIC_PRODUCTION_DOMAIN=your-actual-domain.com
Correct for placeholder. For local development, this value won't be actively used if your NODE_ENV is not 'production'.
Important: When you deploy to production, you will need to:
Replace your-actual-domain.com with your real production domain.
Ensure this environment variable is set in your production hosting environment (e.g., Vercel, Netlify, AWS).
Alternatively, if your select-tenant/page.tsx and middleware.ts primarily use NEXT_PUBLIC_APP_URL for constructing full URLs, this specific NEXT_PUBLIC_PRODUCTION_DOMAIN variable might become less critical if NEXT_PUBLIC_APP_URL is correctly set for production. However, it's good to have if some logic specifically needs just the domain part.
NEXT_PUBLIC_APP_URL=http://localhost:3000
Correct for local development.
This is what src/app/select-tenant/page.tsx will use (via process.env.NEXT_PUBLIC_APP_URL) to construct the base for redirection URLs like http://tenant-a.localhost:3000/login.
Your middleware.ts also uses a similar logic for DEV_ROOT_DOMAIN = 'localhost:3000';. Having NEXT_PUBLIC_APP_URL is good for consistency, and the middleware could even be updated to use it if NODE_ENV !== 'production'.
Summary for Local Development:
Your Prisma setup will connect to the remote Prisma Managed Postgres via Accelerate.
Your select-tenant page will correctly construct localhost:3000 based URLs for tenant selection.
Your middleware will correctly identify localhost:3000 as the root for development.
When you go to Production:
You will need to change/set these environment variables in your hosting provider's settings:
DATABASE_URL: This will remain the same (your Accelerate URL is inherently production-ready).
NEXT_PUBLIC_APP_URL: Change this to your full production URL, e.g., https://your-saas.com.
NEXT_PUBLIC_PRODUCTION_DOMAIN: Change this to your production domain, e.g., your-saas.com. (Or, as mentioned, if NEXT_PUBLIC_APP_URL is the primary source for full URLs, this might be redundant if the former is always set correctly for the environment).
Consideration for middleware.ts and ROOT_DOMAIN:
Your middleware.ts currently has:
const PRODUCTION_DOMAIN = process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN || 'saaspro.com';
const DEV_ROOT_DOMAIN = 'localhost:3000';

function getRootDomain() {
    return process.env.NODE_ENV === 'production' ? PRODUCTION_DOMAIN : DEV_ROOT_DOMAIN;
}
Use code with caution.
TypeScript
And your select-tenant/page.tsx uses NEXT_PUBLIC_APP_URL.
For maximum consistency, you could align the middleware:
// middleware.ts - Potential alignment

// If NEXT_PUBLIC_APP_URL is always set correctly for dev and prod,
// you can derive ROOT_DOMAIN from it.
function getRootDomainFromAppUrl() {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (appUrl) {
        try {
            const url = new URL(appUrl);
            return url.host; // e.g., "localhost:3000" or "your-saas.com"
        } catch (e) {
            console.error("Invalid NEXT_PUBLIC_APP_URL in middleware:", appUrl);
        }
    }
    // Fallback if NEXT_PUBLIC_APP_URL is not set or invalid
    return process.env.NODE_ENV === 'production'
        ? (process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN || 'your-saas.com') // Ensure placeholder
        : 'localhost:3000';
}

const ROOT_DOMAIN_VAL = getRootDomainFromAppUrl(); // Use this in your middleware logic
Use code with caution.
TypeScript
This way, NEXT_PUBLIC_APP_URL becomes the single source of truth for the application's base URL across environments. But your current separate handling in middleware is also fine, as long as DEV_ROOT_DOMAIN and PRODUCTION_DOMAIN are correctly defined/defaulted.