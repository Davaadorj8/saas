// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const loginUserSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }).toLowerCase(),
    password: z.string().min(1, { message: "Password is required." }),
    rememberMe: z.boolean().optional(),
});

// CORRECT: Named export 'POST'
export async function POST(request: NextRequest) {
    const tenantSubdomainFromHeader = request.headers.get('x-tenant-id');
    console.log("[API /api/auth/login] Received request. x-tenant-id header:", tenantSubdomainFromHeader);

    try {
        if (!tenantSubdomainFromHeader) {
            console.error("[API /api/auth/login] Error: Tenant information (x-tenant-id header) is missing.");
            return NextResponse.json(
                { success: false, message: "Tenant context is missing." },
                { status: 400 }
            );
        }

        let body;
        try {
            body = await request.json();
            console.log("[API /api/auth/login] Request body:", body);
        } catch (error) {
            console.error("[API /api/auth/login] Error parsing JSON body:", error);
            return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 });
        }

        const validationResult = loginUserSchema.safeParse(body);
        if (!validationResult.success) {
            console.warn("[API /api/auth/login] Validation failed:", validationResult.error.flatten().fieldErrors);
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed. Please check your input.",
                    errors: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { email, password } = validationResult.data;

        const tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });

        if (!tenant) {
            console.error(`[API /api/auth/login] Tenant with subdomain '${tenantSubdomainFromHeader}' not found.`);
            return NextResponse.json(
                { success: false, message: `Organization '${tenantSubdomainFromHeader}' not found.` },
                { status: 404 }
            );
        }
        console.log(`[API /api/auth/login] Authenticating for tenant: ${tenant.name} (ID: ${tenant.id})`);

        const user = await prisma.user.findUnique({
            where: {
                tenantId_email: {
                    tenantId: tenant.id,
                    email: email,
                },
            },
        });

        if (!user) {
            console.warn(`[API /api/auth/login] User not found: ${email} for tenant ${tenant.name}`);
            return NextResponse.json(
                { success: false, message: "Invalid email or password." },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn(`[API /api/auth/login] Invalid password for user: ${email}`);
            return NextResponse.json(
                { success: false, message: "Invalid email or password." },
                { status: 401 }
            );
        }

        console.log(`[API /api/auth/login] User authenticated: ${user.email}`);

        // --- SUCCESSFUL LOGIN ---
        // TODO: Implement proper session creation and cookie setting here.
        // The cookie should be scoped to: domain: `${tenantSubdomainFromHeader}.${getHostnameWithoutPort(SERVER_ROOT_DOMAIN)}` (from middleware)

        const response = NextResponse.json(
            {
                success: true,
                message: "Login successful!",
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                // The redirectTo path should be relative to the current domain (the tenant's subdomain)
                redirectTo: `/dashboard` // Or /${tenantSubdomainFromHeader}/dashboard if your dashboard routes are structured that way
            },
            { status: 200 }
        );

        // Example: If using 'cookies-next' or similar for setting cookies in Route Handlers
        // import { setCookie } from 'cookies-next';
        // setCookie('session_token', 'your_jwt_or_session_id', { req: request, res: response, httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 });

        return response;

    } catch (error) {
        console.error("[API /api/auth/login] UNHANDLED ERROR:", error);
        return NextResponse.json(
            { success: false, message: "An internal server error occurred during login." },
            { status: 500 }
        );
    }
}

// If you needed a GET handler for this route (e.g., to get CSRF token, though not common for basic login):
// export async function GET(request: NextRequest) {
//   return NextResponse.json({ message: "This is the login endpoint. Use POST to authenticate." });
// }