import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
  try {
    const books: Array<object> = await db.book.findMany();
    res.status(200).json(books);
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
    throw error;
  }
};
