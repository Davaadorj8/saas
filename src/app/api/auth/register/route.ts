// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Define the expected request body schema using Zod
const registerUserSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters." })
        .max(100, { message: "Name must be 100 characters or less." })
        .trim(), // Add trim for good measure
    email: z.string()
        .email({ message: "Invalid email address." })
        .toLowerCase(), // Process email as lowercase
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." }),
    tenantContext: z.string().optional(), // Sent from client, can be used for logging/verification if needed
                                          // but x-tenant-id header is primary source of truth for tenant.
});

export async function POST(request: NextRequest) {
    const tenantSubdomainFromHeader = request.headers.get('x-tenant-id');
    console.log("[API /api/auth/register] Received request. x-tenant-id header:", tenantSubdomainFromHeader);

    try {
        // 1. Validate Tenant Context from Header
        if (!tenantSubdomainFromHeader) {
            console.error("[API /api/auth/register] Error: Tenant information (x-tenant-id header) is missing.");
            return NextResponse.json(
                { success: false, message: "Tenant information is missing. Registration cannot proceed." },
                { status: 400 } // Bad Request: Missing critical header for context
            );
        }

        // 2. Parse and Validate Request Body
        let body;
        try {
            body = await request.json();
            console.log("[API /api/auth/register] Request body:", body);
        } catch (error) {
            console.error("[API /api/auth/register] Error parsing JSON body:", error);
            return NextResponse.json({ success: false, message: "Invalid JSON body provided." }, { status: 400 });
        }

        const validationResult = registerUserSchema.safeParse(body);
        if (!validationResult.success) {
            console.warn("[API /api/auth/register] Validation failed:", validationResult.error.flatten().fieldErrors);
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed. Please check the provided data.",
                    errors: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 } // Bad Request: Validation errors
            );
        }

        // Note: validationResult.data.email will be lowercase due to .toLowerCase() in schema
        const { name, email, password } = validationResult.data;
        // const tenantContextFromBody = validationResult.data.tenantContext; // Available if needed

        // Optional: Verify tenantContextFromBody matches tenantSubdomainFromHeader if both are present
        // if (tenantContextFromBody && tenantContextFromBody !== tenantSubdomainFromHeader) {
        //     console.warn(`[API /api/auth/register] Mismatch: tenantContext in body ('${tenantContextFromBody}') vs x-tenant-id header ('${tenantSubdomainFromHeader}'). Using header.`);
        // }

        // 3. Find the Tenant in the database using the subdomain from the HEADER
        const tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });

        if (!tenant) {
            console.error(`[API /api/auth/register] Error: Tenant with subdomain '${tenantSubdomainFromHeader}' not found in database.`);
            return NextResponse.json(
                { success: false, message: `Organization '${tenantSubdomainFromHeader}' not found. Cannot register.` },
                { status: 404 } // Not Found: Tenant doesn't exist
            );
        }
        console.log(`[API /api/auth/register] Found tenant: ${tenant.name} (ID: ${tenant.id})`);

        // 4. Check if user already exists for this tenant
        const existingUser = await prisma.user.findUnique({
            where: {
                tenantId_email: { // Using the @@unique([tenantId, email]) compound index
                    tenantId: tenant.id,
                    email: email, // email is already lowercased by Zod schema
                },
            },
        });

        if (existingUser) {
            console.warn(`[API /api/auth/register] User with email '${email}' already exists for tenant '${tenant.name}'.`);
            return NextResponse.json(
                { success: false, message: "A user with this email already exists for this organization." },
                { status: 409 } // Conflict: User already exists
            );
        }

        // 5. Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`[API /api/auth/register] Password hashed for user '${email}'.`);

        // 6. Create the new user
        const defaultUserRole = "member"; // Consider making this configurable or based on tenant type

        const newUser = await prisma.user.create({
            data: {
                name: name.trim(), // Ensure name is also trimmed server-side
                email: email,      // Already lowercased
                password: hashedPassword,
                role: defaultUserRole,
                tenantId: tenant.id,
                // phoneNumber: body.phoneNumber, // If you add phoneNumber to Zod schema and form
            },
            select: { // Only return non-sensitive fields
                id: true,
                email: true,
                name: true,
                role: true,
            }
        });
        console.log(`[API /api/auth/register] New user created: ${newUser.email} (ID: ${newUser.id}) for tenant ${tenant.name}`);

        // 7. Return success response
        // TODO: Consider sending a verification email here in a real application
        return NextResponse.json(
            {
                success: true,
                message: "Account created successfully! Please proceed to login.",
                user: newUser,
                redirectTo: `/login` // Client will handle redirect on the same tenant subdomain
            },
            { status: 201 } // Created
        );

    } catch (error) {
        console.error("[API /api/auth/register] UNHANDLED ERROR:", error);
        // Check if it's a Prisma-specific error for more tailored responses, though generic 500 is often okay.
        // if (error instanceof Prisma.PrismaClientKnownRequestError) { ... }
        return NextResponse.json(
            { success: false, message: "An unexpected internal server error occurred during registration." },
            { status: 500 } // Internal Server Error
        );
    }
}