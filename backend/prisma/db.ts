import { PrismaClient } from "@prisma/client";

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
}

const prisma: PrismaClient = global.prisma;
export default prisma;
