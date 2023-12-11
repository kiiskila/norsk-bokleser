import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const api = require("./routes/api");
const app: Express = express();
const port = 8080;
const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: "postgres://postgres:postgres@host.docker.internal:5432/norsk_bokleser",
    },
  },
});

app.use("/", api);

const seedDatabase = async () => {
  if ((await db.book.count()) === 0) {
    await db.book.createMany({
      data: [
        {
          id: 1,
          slug: "book-number-one",
          title: "Book Number One",
          author: ["Author 1", "Author 2"],
          isbn: "1338878921", //0747532745
          cover_art:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
          published_date: new Date("2022-12-25"),
        },
        {
          id: 2,
          slug: "book-number-two",
          title: "Book Number Two",
          author: ["Author 3", "Author 4"],
          isbn: "0747532745",
          cover_art:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
          published_date: new Date("1999-02-11"),
        },
      ],
    });
  }
};
seedDatabase();

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
