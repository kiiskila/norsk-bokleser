// Mocking the Prisma Client for testing the database interactions.
jest.mock("@prisma/client", () => {
  const mockBookFindMany = jest.fn();
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        book: {
          findMany: mockBookFindMany,
        },
      };
    }),
  };
});

import { Request, Response } from "express";
import * as bookListController from "../controllers/bookListController";

// Test suite for the bookListController.
describe("bookListController", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;
  let mockBookFindMany: jest.Mock;

  // Setup before each test: resetting modules and initializing mocks.
  beforeEach(() => {
    jest.resetModules();
    mockBookFindMany = require("../prisma/db").default.book
      .findMany as jest.Mock;
    mockBookFindMany.mockReset();

    // Setting up mock Express request and response objects.
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockBookFindMany = require("../prisma/db").default.book
      .findMany as jest.Mock;
    mockBookFindMany.mockReset();
  });

  // Test for the 'getBookList' controller method.
  describe("getBookList", () => {
    it("Should return a list of books", async () => {
      // Mocking expected book data.
      const expectedBooks = [
        {
          id: 1,
          slug: "test-book-1",
          title: "Test Book 1",
          author: ["Author 1"],
          isbn: "1234567890",
          cover_art: "url-to-cover-art-1",
          published_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          slug: "test-book-2",
          title: "Test Book 2",
          author: ["Author 2"],
          isbn: "0987654321",
          cover_art: "url-to-cover-art-2",
          published_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockBookFindMany.mockResolvedValue(expectedBooks);

      // Performing the test with mock request, response, and expecting results.
      const mockReq = {
        query: {},
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await bookListController.getBookList(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedBooks);
    });

    it("Should handle search and sorting parameters", async () => {
      // Mocking expected book data for search and sorting test.
      const expectedBooks = [
        { id: 3, title: "Search Book", author: "Author 3" },
      ];

      mockBookFindMany.mockResolvedValue(expectedBooks);

      const mockReq = {
        query: {
          search: "Search",
          sortBy: "title",
          sortOrder: "desc",
        },
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await bookListController.getBookList(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedBooks);
    });

    it("Should handle database errors correctly", async () => {
      mockBookFindMany.mockRejectedValue(new Error("Database error"));

      mockReq.query = {};
      await bookListController.getBookList(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it("Should handle database errors correctly", async () => {
      mockBookFindMany.mockRejectedValue(new Error("Database error"));

      mockReq.query = {};
      await bookListController.getBookList(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it("Should return an empty array if no books are found", async () => {
      // Handling the scenario where no books are found.
      mockBookFindMany.mockResolvedValue([]);

      mockReq.query = {};
      await bookListController.getBookList(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([]);
    });
  });
});
