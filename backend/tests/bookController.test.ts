jest.mock("@prisma/client", () => {
  const mockFindMany = jest.fn();
  const mockFindUniqueOrThrow = jest.fn();
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        book: {
          findUniqueOrThrow: mockFindUniqueOrThrow,
          findMany: mockFindMany,
        },
        chapter: {
          findMany: mockFindMany,
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

  beforeEach(() => {
    mockFindUniqueOrThrow = new PrismaClient().book
      .findUniqueOrThrow as jest.Mock;
    mockFindUniqueOrThrow.mockReset();
  });

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
