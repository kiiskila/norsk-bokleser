import { RequestHandler, Request, Response, NextFunction } from "express";

export const getBook: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ book: "Book title", id: req.params.bookId });
  // Cover art
  // Book title
  // Book author
  // ISBN
  // Length
  // Words, pages
  // Chapters
};

export const getChapter: RequestHandler = (req, res, next: NextFunction) => {
  res.status(200).json({ chapter: "Chapter title", id: req.params.chapterId });
};
