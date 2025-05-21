// middleware.ts (rewritten)
// -------------------------

import { NextRequest, NextResponse } from 'next/server';

// --- ENV CONFIG ---
const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || 'saaspro.com';
const DEV_DOMAIN = 'localhost:3000';
const ROOT_DOMAIN = process.env.NODE_ENV === 'production'
  ? PRODUCTION_DOMAIN
  : DEV_DOMAIN;

// --- SETTINGS ---
const PUBLIC_PATHS = ['/about-us', '/pricing', '/terms', '/privacy'];
const TENANT_SELECTION = '/select-tenant';
const AUTH_PREFIX = '/api/auth';

const VALID_SUBDOMAINS = ['client', 'supplier', 'customer'];
const RESERVED = ['www', 'app', 'api', 'mail', 'blog', 'dev', 'status', 'docs', 'assets', 'static'];

// --- HELPERS ---
const isAsset = (path: string) => /\.(ico|png|jpg|jpeg|svg|js|css|webmanifest|txt|xml)$/i.test(path);

export const config = {
  matcher: ['/:path*'],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const host = request.headers.get('host') || '';

  // 1. Bypass static, assets, auth, and public
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith(AUTH_PREFIX) ||
    isAsset(pathname) ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Host parsing
  const root = ROOT_DOMAIN.split(':')[0];
  let sub: string | null = null;
  let isRootAccess = false;

  if (host === root || host === `www.${root}`) {
    isRootAccess = true;
  } else if (host.endsWith(`.${root}`)) {
    const part = host.split('.')[0];
    if (!RESERVED.includes(part.toLowerCase())) sub = part;
    else isRootAccess = true;
  } else {
    return redirectToSelection(request, 'unrecognized_host');
  }

  // 3. Routing
  if (sub) {
    if (VALID_SUBDOMAINS.includes(sub.toLowerCase())) {
      // Create new Headers instance and set tenant ID
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-tenant-id', sub);

      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    return redirectToSelection(request, 'unknown_tenant', sub);
  }

  if (isRootAccess) {
    return redirectToSelection(request, 'root_access');
  }

  // Fallback
  return redirectToSelection(request, 'middleware_unhandled');
}

// --- REDIRECT HELPER ---
function redirectToSelection(request: NextRequest, error: string, attempted?: string) {
  const url = request.nextUrl.clone();
  url.pathname = TENANT_SELECTION;
  url.searchParams.set('error', error);
  if (attempted) url.searchParams.set('attempted', attempted);
  return NextResponse.redirect(url);
}
