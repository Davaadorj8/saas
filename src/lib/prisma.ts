// src/lib/prisma.ts
import { PrismaClient } from '@/generated/prisma'; // This path is now valid
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: ReturnType<typeof initializePrisma> | undefined;
}

const initializePrisma = () => {
  console.log("Initializing Prisma Client (from ./src/generated/prisma) with Accelerate.");
  return new PrismaClient({
    // datasourceUrl: process.env.DATABASE_URL // Optional: explicit
  }).$extends(withAccelerate());
};

const prisma = global.prisma || initializePrisma();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;