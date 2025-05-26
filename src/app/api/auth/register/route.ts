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
        .trim(),
    email: z.string()
        .email({ message: "Invalid email address." })
        .toLowerCase(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." }),
    phoneNumber: z.string()
        .min(7, { message: "Phone number seems too short."}) // Basic min length validation
        .max(20, { message: "Phone number seems too long."}) // Basic max length validation
        .regex(/^\+?[0-9\s-()]*$/, { message: "Invalid characters in phone number."}) // Basic character validation
        .optional() // Make it optional
        .or(z.literal('')), // Allow empty string, then we can treat it as null/undefined
    tenantContext: z.string().optional(),
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
                { status: 400 }
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
                { status: 400 }
            );
        }

        const { name, email, password, phoneNumber } = validationResult.data;
        // Prepare phoneNumber: store null if it's an empty string or undefined.
        const sanitizedPhoneNumber = (phoneNumber && phoneNumber.trim() !== '') ? phoneNumber.trim() : null;


        // 3. Find the Tenant in the database using the subdomain from the HEADER
        const tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomainFromHeader },
        });

        if (!tenant) {
            console.error(`[API /api/auth/register] Error: Tenant with subdomain '${tenantSubdomainFromHeader}' not found in database.`);
            return NextResponse.json(
                { success: false, message: `Organization '${tenantSubdomainFromHeader}' not found. Cannot register.` },
                { status: 404 }
            );
        }
        console.log(`[API /api/auth/register] Found tenant: ${tenant.name} (ID: ${tenant.id})`);

        // 4. Check if user already exists for this tenant
        const existingUser = await prisma.user.findUnique({
            where: {
                tenantId_email: {
                    tenantId: tenant.id,
                    email: email,
                },
            },
        });

        if (existingUser) {
            console.warn(`[API /api/auth/register] User with email '${email}' already exists for tenant '${tenant.name}'.`);
            return NextResponse.json(
                { success: false, message: "A user with this email already exists for this organization." },
                { status: 409 }
            );
        }

        // 5. Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`[API /api/auth/register] Password hashed for user '${email}'.`);

        // 6. Create the new user
        const defaultUserRole = "member";

        const newUser = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email,
                password: hashedPassword,
                role: defaultUserRole,
                tenantId: tenant.id,
                phoneNumber: sanitizedPhoneNumber, // Add the sanitized phone number here
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phoneNumber: true, // Optionally return phoneNumber if needed by client post-registration
            }
        });
        console.log(`[API /api/auth/register] New user created: ${newUser.email} (ID: ${newUser.id}, Phone: ${newUser.phoneNumber || 'N/A'}) for tenant ${tenant.name}`);

        // 7. Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Account created successfully! Please proceed to login.",
                user: newUser,
                redirectTo: `/login`
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("[API /api/auth/register] UNHANDLED ERROR:", error);
        return NextResponse.json(
            { success: false, message: "An unexpected internal server error occurred during registration." },
            { status: 500 }
        );
    }
}