import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import db from "../prisma/db";

/**
 * getBookList is a RequestHandler that fetches a list of books from the database.
 * It supports optional query parameters:
 * - search: to filter books by title or author (case insensitive)
 * - sortBy: to sort the results by a specific field
 * - sortOrder: to specify the sort direction (default is "asc")
 *
 * It responds with the list of books if found, otherwise it handles the errors.
 */
export const getBookList: RequestHandler = async (req, res, next) => {
  try {
    const { search, sortBy, sortOrder = "asc" } = req.query;

    // Construct the query
    const query = db.book.findMany({
      where: {
        disabled: false, // Only include books that are not disabled
        ...(search && {
          OR: [
            { title: { contains: search as string, mode: "insensitive" } },
            { author: { has: search as string } },
          ],
        }),
      },
      orderBy: sortBy ? { [sortBy as string]: sortOrder } : undefined,
    });

    // Execute the query
    const books = await query;
    res.status(200).json(books);
  } catch (error) {
    // Handle Prisma errors
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      next(error);
    }
  }
};
