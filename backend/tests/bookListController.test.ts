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

describe("bookListController", () => {
  let mockBookFindMany: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    mockBookFindMany = require("../prisma/db").default.book
      .findMany as jest.Mock;
    mockBookFindMany.mockReset();
  });

  describe("getBookList", () => {
    it("Should return a list of books", async () => {
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
  });
});
