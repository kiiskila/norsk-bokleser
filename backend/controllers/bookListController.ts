import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import db from "../prisma/db";

export const getBookList: RequestHandler = async (req, res, next) => {
  try {
    const { search, sortBy, sortOrder = "asc" } = req.query;

    const query = db.book.findMany({
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
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      next(error);
    }
  }
};
