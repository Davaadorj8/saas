import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      tenantId: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    tenantId: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    tenantId: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        tenantSubdomain: { label: "Organization Subdomain", type: "text" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password || !credentials.tenantSubdomain) {
          console.log('[NextAuth Authorize] Missing credentials data.');
          return null;
        }

        const { email, password, tenantSubdomain } = credentials;
        console.log(`[NextAuth Authorize] Attempting for: ${email} on tenant: ${tenantSubdomain}`);

        try {
          const tenant = await prisma.tenant.findUnique({
            where: { subdomain: tenantSubdomain.toLowerCase() },
          });

          if (!tenant) {
            console.log(`[NextAuth Authorize] Tenant not found: ${tenantSubdomain}`);
            throw new Error("Organization not found.");
          }

          const userFromDb = await prisma.user.findUnique({
            where: {
              tenantId_email: {
                tenantId: tenant.id,
                email: email.toLowerCase(),
              },
            },
          });

          if (!userFromDb) {
            console.log(`[NextAuth Authorize] User not found: ${email} for tenant ${tenant.name}`);
            throw new Error("Invalid email or password.");
          }

          const isPasswordValid = await bcrypt.compare(password, userFromDb.password);

          if (!isPasswordValid) {
            console.log(`[NextAuth Authorize] Invalid password for user: ${email}`);
            throw new Error("Invalid email or password.");
          }

          console.log(`[NextAuth Authorize] User authenticated: ${userFromDb.email} (Role: ${userFromDb.role}, Tenant: ${tenant.name})`);

          return {
            id: userFromDb.id,
            name: userFromDb.name,
            email: userFromDb.email,
            image: null,
            role: userFromDb.role,
            tenantId: tenant.id,
          };
        } catch (error: any) {
          console.error("[NextAuth Authorize] Error during authorization:", error.message);
          throw new Error(error.message || "An unexpected error occurred during authentication.");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.tenantId = user.tenantId;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };