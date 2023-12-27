import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const db = new PrismaClient();

export const getBookList: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sortBy, sortOrder = "asc" } = req.query;

    let query = db.book.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search as string, mode: "insensitive" } },
              { author: { has: search as string } },
            ],
          }
        : {},
      orderBy: sortBy ? { [sortBy as string]: sortOrder } : undefined,
    });

    const books = await query;
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
