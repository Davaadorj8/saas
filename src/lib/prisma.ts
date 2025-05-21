// src/lib/prisma.ts
// This version is for when 'prisma/schema.prisma' has NO 'output' line in 'generator client',
// meaning Prisma Client is generated to the default 'node_modules/.prisma/client'.

import { PrismaClient } from '@prisma/client'; // Imports from default location
import { withAccelerate } from '@prisma/extension-accelerate';

// This global variable is used to preserve the PrismaClient instance across hot reloads in development.
declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: ReturnType<typeof initializePrisma> | undefined;
}

const initializePrisma = () => {
  console.log("Initializing Prisma Client (from default @prisma/client) with Accelerate.");
  // Ensure your DATABASE_URL environment variable is set to your Prisma Accelerate connection string
  // if you are using Accelerate. If not using Accelerate, it should be your direct DB connection string.
  return new PrismaClient({
    // datasourceUrl: process.env.DATABASE_URL // Typically not needed if DATABASE_URL in .env is correctly set
  }).$extends(withAccelerate()); // Remove .$extends(withAccelerate()) if not using Accelerate
};

// Use the existing instance if available (in development), otherwise create a new one.
const prisma = global.prisma || initializePrisma();

// In development, assign the new instance to the global variable.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;