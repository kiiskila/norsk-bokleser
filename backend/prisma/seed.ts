import { randBetweenDate, randBook } from "@ngneat/falso";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { normalizeString } from "../utils/helpers";
const lorem = require("lorem-ipsum-norwegian");

const dbUrl = process.env.DB_HOST || process.env.DATABASE_URL;

const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

const main = async () => {
  await seedBooks();
};

const seedBooks = async () => {
  try {
    await db.book.deleteMany({});
    const fakeBooks = randBook({
      length: 20,
    });

    for (let i = 0; i < fakeBooks.length; i++) {
      const book = fakeBooks[i];

      if (
        (await db.book.count({
          where: { slug: normalizeString(book.title) },
        })) > 0
      ) {
        break;
      }
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

      seedChapters(newBook.id);
    }

    console.log(`Database has been seeded.`);
  } catch (error) {
    throw error;
  }
};

const seedChapters = async (book_id: number) => {
  try {
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

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
