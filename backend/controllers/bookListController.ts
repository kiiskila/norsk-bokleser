import { RequestHandler, Request, Response, NextFunction } from "express";

export const getBookList: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json(["Book 1", "Book 2", "Book 3", "Book 4"]);
};
