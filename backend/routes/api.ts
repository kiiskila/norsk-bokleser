import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const bookListController = require("../controllers/bookListController");

// Health status call
router.get("/", async (req: Request, res: Response) => {
  try {
    res.send("Server is healthy");
  } catch (error) {
    res.send(error);
  }
});

router.get("/books", bookListController.getBookList);

router.get("/book/:bookId", bookController.getBook);

module.exports = router;