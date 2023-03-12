import { PrismaClient } from "@prisma/client";

/**
 * * Single and global prisma instance
 * ! Instance will be stored as global variable only in dev environment
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
