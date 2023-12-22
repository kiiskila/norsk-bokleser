import { RequestHandler, Request, Response, NextFunction } from "express";
import { Book, PrismaClient, Chapter } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
  try {
    const book = await db.book.findUniqueOrThrow({
      where: {
        slug: req.params.bookSlug,
      },
    });
    res.status(200).json(book);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // Handle not found error
        res.status(404).json({ message: "Book not found" });
      } else {
        // Handle other potential errors
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};

export const getBookWithChapters: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book: Book = await db.book.findUniqueOrThrow({
      where: {
        slug: req.params.bookSlug,
      },
    });
    const chapters: Chapter[] = await db.chapter.findMany({
      where: {
        book_id: book.id,
      },
      orderBy: { number: "asc" },
    });

    res.status(200).json({ book: book, chapters: chapters });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // Handle not found error
        res.status(404).json({ message: "Book not found" });
      } else {
        // Handle other potential errors
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};

export const getChapter: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book: Book = await db.book.findUniqueOrThrow({
      where: {
        slug: req.params.bookSlug,
      },
    });

    const chapter: Chapter = await db.chapter.findFirstOrThrow({
      where: {
        book_id: book.id,
        number: parseInt(req.params.chapterId),
      },
    });

    res.status(200).json(chapter);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // Handle not found error
        res.status(404).json({ message: "Book not found" });
      } else {
        // Handle other potential errors
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};
