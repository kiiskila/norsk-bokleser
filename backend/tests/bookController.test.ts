jest.mock("@prisma/client", () => {
  const mockBookFindMany = jest.fn();
  const mockChapterFindMany = jest.fn();
  const mockFindUniqueOrThrow = jest.fn();
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        book: {
          findUniqueOrThrow: mockFindUniqueOrThrow,
          findMany: mockBookFindMany,
        },
        chapter: {
          findMany: mockChapterFindMany,
        },
      };
    }),
  };
});

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bookController from "../controllers/bookController";

describe("getBook", () => {
  let mockFindUniqueOrThrow: jest.Mock;
  let mockChapterFindMany: jest.Mock;

  beforeEach(() => {
    const prisma = new PrismaClient();
    mockFindUniqueOrThrow = prisma.book.findUniqueOrThrow as jest.Mock;
    mockChapterFindMany = prisma.chapter.findMany as jest.Mock;

    mockFindUniqueOrThrow.mockReset();
    mockChapterFindMany.mockReset();
  });

  describe("getBook", () => {
    it("Should return a book for valid slug", async () => {
      const expectedBook = { id: 1, title: "Test Book", slug: "test-book" };

      mockFindUniqueOrThrow.mockResolvedValue(expectedBook);

      const mockReq = {
        params: { bookSlug: "test-book" },
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();
      await bookController.getBook(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedBook);
    });
  });

  describe("getBookWithChapters", () => {
    it("Should return a book with chapters for valid slug", async () => {
      const expectedBook = { id: 1, title: "Test Book", slug: "test-book" };
      const expectedChapters = [{ id: 1, number: 1, title: "Chapter 1" }];

      mockFindUniqueOrThrow.mockResolvedValue(expectedBook);
      mockChapterFindMany.mockResolvedValue(expectedChapters);

      const mockReq = {
        params: { bookSlug: "test-book" },
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await bookController.getBookWithChapters(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        book: expectedBook,
        chapters: expectedChapters,
      });
    });
  });
});
