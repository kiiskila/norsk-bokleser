import { RequestHandler, Request, Response, NextFunction } from "express";
import { Book, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Initialize Prisma Client
const db = new PrismaClient();

type PartialChapter = {
  id: number;
  number: number;
  title: string | null;
};

/**
 * getBook is a RequestHandler that fetches a book from the database
 * using the book slug provided in the request parameters.
 * It responds with the book data if found, otherwise it handles the errors.
 */
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

/**
 * getBookWithChapters is a RequestHandler that fetches a book and its chapters
 * from the database using the book slug provided in the request parameters.
 * It responds with the book and chapters data if found, otherwise it handles the errors.
 */
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
    const chapters: PartialChapter[] = await db.chapter.findMany({
      where: {
        book_id: book.id,
      },
      select: {
        id: true,
        number: true,
        title: true,
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
