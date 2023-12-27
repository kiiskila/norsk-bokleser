import { RequestHandler, Request, Response, NextFunction } from "express";
import { Book, PrismaClient, Chapter } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const db = new PrismaClient();

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
