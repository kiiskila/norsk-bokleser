import { PrismaClient } from "@prisma/client";

/**
 * This file initializes and exports a singleton instance of PrismaClient.
 *
 * PrismaClient is used to interact with your database via Prisma. The singleton pattern
 * ensures that only one instance of PrismaClient is used throughout the application,
 * which helps in managing database connections efficiently.
 */

// Check if a global instance of PrismaClient already exists. This is particularly
// useful in a development environment like Next.js where module state can be
// preserved between hot reloads, which prevents multiple instances of PrismaClient.
if (!global.prisma) {
  // Initialize a new PrismaClient instance if it doesn't exist.
  global.prisma = new PrismaClient({
    // Enable logging for various levels including query, info, warn, and error.
    // This is helpful for debugging and understanding how Prisma interacts with the database.
    log: ["query", "info", "warn", "error"],
  });
}

// Retrieve the existing or newly created PrismaClient instance.
const prisma: PrismaClient = global.prisma;

// Export the PrismaClient instance for use throughout the application.
export default prisma;
