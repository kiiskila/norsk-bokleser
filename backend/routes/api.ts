import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const bookListController = require("../controllers/bookListController");
const chapterController = require("../controllers/chapterController");

// Health status call
router.get("/", async (req: Request, res: Response) => {
  try {
    res.send("Server is healthy");
  } catch (error) {
    res.send(error);
  }
});

router.get("/books", bookListController.getBookList);

router.get("/book/:bookSlug", bookController.getBook);

router.get("/read/:bookSlug", bookController.getBookWithChapters);

router.get("/read/:bookSlug/:chapterId", chapterController.getChapter);

module.exports = router;
