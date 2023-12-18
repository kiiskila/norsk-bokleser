import { RequestHandler, Request, Response, NextFunction } from "express";
import { Book, PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: "postgres://postgres:postgres@host.docker.internal:5432/norsk_bokleser",
    },
  },
});

export const getBook: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const book: Book = await db.book.findUniqueOrThrow({
    where: {
      slug: req.params.bookSlug,
    },
  });
  res.status(200).json(book);
};

export const getBookWithChapters: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const book: Book = await db.book.findUniqueOrThrow({
    where: {
      slug: req.params.bookSlug,
    },
  });
  res.status(200).json(book);
};

export const getChapter: RequestHandler = (req, res, next: NextFunction) => {
  res.status(200).json({ chapter: "Chapter title", id: req.params.chapterId });
};
