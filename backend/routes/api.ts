import { Request, Response } from "express";

// Importing required modules
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const bookListController = require("../controllers/bookListController");
const chapterController = require("../controllers/chapterController");
const translateController = require("../controllers/translateController");
const formController = require("../controllers/formController");

/**
 * Health status call
 * This route is used to check if the server is running and healthy.
 * It responds with "Server is healthy" if the server is running.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    res.send("Server is healthy");
  } catch (error) {
    res.send(error);
  }
});

/**
 * Get book list
 * This route is used to fetch the list of all books.
 */
router.get("/books", bookListController.getBookList);

/**
 * Get book
 * This route is used to fetch a specific book by its slug.
 */
router.get("/book/:bookSlug", bookController.getBook);

/**
 * Get book with chapters
 * This route is used to fetch a specific book along with its chapters by its slug.
 */
router.get("/read/:bookSlug", bookController.getBookWithChapters);

/**
 * Get chapter
 * This route is used to fetch a specific chapter of a book by the book's slug and the chapter's id.
 */
router.get("/read/:bookSlug/:chapterId", chapterController.getChapter);

/**
 * Post translate text
 * This route poasts a text to be translated.
 */
router.post("/translate", translateController.getTranslation);

/**
 * Post form request
 * This route is used to log and send an email of a book request.
 */
router.post("/forms/request", formController.postBookRequest);

/**
 * Post form report
 * This route is used to log and send an email of an issue report.
 */
router.post("/forms/report", formController.postIssueReport);

module.exports = router;
