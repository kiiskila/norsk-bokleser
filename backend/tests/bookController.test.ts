// Mocking the Prisma Client to intercept database calls in the test environment.
jest.mock("@prisma/client", () => {
  // Mock functions for different Prisma Client methods.
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

// Test suite for book-related functionalities.
describe("getBook", () => {
  let mockFindUniqueOrThrow: jest.Mock;
  let mockChapterFindMany: jest.Mock;

  // Resetting mocks before each test to ensure clean test environment.
  beforeEach(() => {
    const prisma = new PrismaClient();
    mockFindUniqueOrThrow = prisma.book.findUniqueOrThrow as jest.Mock;
    mockChapterFindMany = prisma.chapter.findMany as jest.Mock;

    mockFindUniqueOrThrow.mockReset();
    mockChapterFindMany.mockReset();
  });

  // Tests for the 'getBook' functionality.
  describe("getBook", () => {
    it("Should return a book for valid slug", async () => {
      // Mock expected response.
      const expectedBook = { id: 1, title: "Test Book", slug: "test-book" };
      mockFindUniqueOrThrow.mockResolvedValue(expectedBook);

      // Mocking Express.js request and response objects.
      const mockReq = {
        params: { bookSlug: "test-book" },
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      // Call the function and assert responses.
      await bookController.getBook(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedBook);
    });
  });

  // Tests for the 'getBookWithChapters' functionality.
  describe("getBookWithChapters", () => {
    it("Should return a book with chapters for valid slug", async () => {
      // Mock expected responses for book and chapters.
      const expectedBook = { id: 1, title: "Test Book", slug: "test-book" };
      const expectedChapters = [{ id: 1, number: 1, title: "Chapter 1" }];

      mockFindUniqueOrThrow.mockResolvedValue(expectedBook);
      mockChapterFindMany.mockResolvedValue(expectedChapters);

      // Mocking Express.js request and response objects.
      const mockReq = {
        params: { bookSlug: "test-book" },
      } as unknown as Request;
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      // Call the function and assert responses including chapters.
      await bookController.getBookWithChapters(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        book: expectedBook,
        chapters: expectedChapters,
      });
    });
  });
});
