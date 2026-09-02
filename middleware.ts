// middleware.ts (rewritten)
// -------------------------

import { NextRequest, NextResponse } from 'next/server';
import {
  isValidTenantDirectory,
  resolveTenantDirectoryFromPath,
} from './src/lib/subdirectories';

// --- SETTINGS ---
const PUBLIC_PATHS = ['/about-us', '/pricing', '/terms', '/privacy'];
const TENANT_SELECTION = '/select-tenant';
const AUTH_PREFIX = '/api/auth';

// --- HELPERS ---
const isAsset = (path: string) => /\.(ico|png|jpg|jpeg|svg|js|css|webmanifest|txt|xml)$/i.test(path);

export const config = {
  matcher: ['/:path*'],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

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

  // 2. Path parsing: tenant context comes from the first path segment.
  const resolution = resolveTenantDirectoryFromPath(pathname);

  if (resolution.type === 'reserved') {
    return NextResponse.next();
  }

  if (resolution.type === 'root') {
    return redirectToSelection(request, 'root_access');
  }

  // 3. Routing
  if (isValidTenantDirectory(resolution.directory)) {
    // Create new Headers instance and set tenant ID
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-tenant-id', resolution.directory);

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return redirectToSelection(request, 'unknown_tenant', resolution.directory);
}

// --- REDIRECT HELPER ---
function redirectToSelection(request: NextRequest, error: string, attempted?: string) {
  const url = request.nextUrl.clone();
  url.pathname = TENANT_SELECTION;
  url.searchParams.set('error', error);
  if (attempted) url.searchParams.set('attempted', attempted);
  return NextResponse.redirect(url);
}
