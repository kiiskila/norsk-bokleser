import { randBetweenDate, randBook } from "@ngneat/falso";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { normalizeString } from "../utils/helpers";
const lorem = require("lorem-ipsum-norwegian");

/**
 * Database Seeding Script
 * ------------------------
 * This script seeds the database with initial data for books and chapters.
 * It uses Prisma Client for database operations.
 *
 * The script generates data using:
 * - @ngneat/falso: For generating random book data.
 * - @faker-js/faker: For generating miscellaneous fake data.
 * - lorem-ipsum-norwegian: For generating Norwegian text.
 */

const dbUrl = process.env.DB_HOST || process.env.DATABASE_URL;

// Initialize Prisma Client with custom configuration
const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

// Main function to execute the seeding process
const main = async () => {
  await seedBooks();
};

/**
 * Seed Books
 * Seeds the database with book records.
 * Generates 20 fake book records and their corresponding chapters.
 */
const seedBooks = async () => {
  try {
    // Delete all existing records in the 'book' table
    await db.book.deleteMany({});

    // Generate 20 fake books
    const fakeBooks = randBook({ length: 20 });

    // Loop through the fake books and add them to the database
    for (let i = 0; i < fakeBooks.length; i++) {
      const book = fakeBooks[i];

      // Check if the book already exists in the database
      if (
        (await db.book.count({
          where: { slug: normalizeString(book.title) },
        })) > 0
      ) {
        continue;
      }

      // Create a new book record in the database
      let newBook = await db.book.create({
        data: {
          slug: normalizeString(book.title),
          title: book.title,
          author: [book.author],
          isbn: faker.commerce.isbn(10),
          cover_art: faker.image.url(),
          published_date: randBetweenDate({
            from: new Date("01/01/1900"),
            to: new Date(),
          }),
          summary_english: faker.commerce.productDescription(),
          summary_norwegian: lorem(1),
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // Seed chapters for the new book
      seedChapters(newBook.id);
    }

    console.log(`Database has been seeded.`);
  } catch (error) {
    throw error;
  }
};

/**
 * Seed Chapters
 * @param {number} book_id - The ID of the book to which the chapters belong.
 * Seeds a random number (between 1 and 20) of chapters for each book.
 */
const seedChapters = async (book_id: number) => {
  try {
    // Generate a random number of chapters for the given book
    for (let i = 1; i <= faker.number.int({ min: 1, max: 20 }); i++) {
      await db.chapter.create({
        data: {
          book_id: book_id,
          number: i,
          title: faker.number.int(10) > 2 ? faker.company.name() : null,
          body: lorem(20),
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

// Execute main function and handle any errors
main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
