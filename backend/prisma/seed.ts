import { randBetweenDate, randBook } from "@ngneat/falso";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { normalizeString } from "../utils/helpers";

const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: "postgresql://postgres:postgres@localhost:5432/norsk_bokleser",
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
      await db.book.upsert({
        where: { id: i },
        create: {
          slug: normalizeString(book.title),
          title: book.title,
          author: [book.author],
          isbn: faker.commerce.isbn(10),
          cover_art: faker.image.url(),
          published_date: randBetweenDate({
            from: new Date("01/01/1900"),
            to: new Date(),
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        update: {},
      });
    }

    console.log(`Database has been seeded.`);
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
