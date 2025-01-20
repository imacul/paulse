import { PrismaClient } from "@prisma/client";

// Augment the global namespace to include the prisma client
declare global {
  // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
    }

    // Use a single PrismaClient instance during development to avoid multiple instances
    const prismadb = global.prisma || new PrismaClient();
    if (process.env.NODE_ENV !== "production") global.prisma = prismadb;

    export default prismadb;