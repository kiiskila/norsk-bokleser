import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: "postgres://postgres:postgres@host.docker.internal:5432/norsk_bokleser",
    },
  },
});

export const getBookList: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const books: Array<object> = await db.book.findMany();
  res.status(200).json(books);
};
