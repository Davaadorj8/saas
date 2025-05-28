import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchUserCount = async (): Promise<number> => {
  console.log('Mock fetchUserCount called');
  return new Promise(resolve => {
    setTimeout(() => {
      const count = Math.floor(Math.random() * 1000) + 500;
      resolve(count);
    }, 700);
  });
};

// You can add other user-related service functions here