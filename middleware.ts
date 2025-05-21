// middleware.ts (Temporary Simplification for Debugging)
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const host = request.headers.get('host');
    const pathname = request.nextUrl.pathname;
    // Use a very unique log message
    console.log(`[SUPER_SIMPLE_MW] Request received! Host: ${host}, Pathname: ${pathname}, Time: ${new Date().toISOString()}`);

    // For testing, just let everything pass through without modification or redirection for a moment
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images/|assets/|robots.txt|sitemap.xml).*)',
    ],
};