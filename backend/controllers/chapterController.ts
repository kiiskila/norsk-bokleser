import { RequestHandler, Request, Response, NextFunction } from "express";
import { Book, PrismaClient, Chapter } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Initialize Prisma Client
const db = new PrismaClient();

/**
 * getChapter is a RequestHandler that fetches a specific chapter of a book from the database.
 * It uses the book slug and chapter number provided in the request parameters.
 *
 * It responds with the chapter data if found, otherwise it handles the errors.
 */
export const getChapter: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch the book using the slug from the request parameters
    const book: Book = await db.book.findUniqueOrThrow({
      where: {
        slug: req.params.bookSlug,
      },
    });

    // Fetch the chapter using the book id and chapter number from the request parameters
    const chapter: Chapter = await db.chapter.findFirstOrThrow({
      where: {
        book_id: book.id,
        number: parseInt(req.params.chapterId),
      },
    });

    // Respond with the chapter data
    res.status(200).json(chapter);
  } catch (error) {
    // Handle errors
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
