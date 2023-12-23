jest.mock("@prisma/client", () => {
  const mockFindMany = jest.fn();
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        book: {
          findMany: mockFindMany,
        },
      };
    }),
  };
});

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getBookList } from "../controllers/bookListController";

describe("getBookList", () => {
  let mockFindMany: jest.Mock;

  beforeEach(() => {
    mockFindMany = new PrismaClient().book.findMany as jest.Mock;
    mockFindMany.mockReset();
  });

  it("should return a list of books", async () => {
    const mockBooks = [
      {
        id: 1,
        slug: "test-book-1",
        title: "Test Book 1",
        author: ["Author 1"],
        isbn: "1234567890",
        cover_art: "url-to-cover-art-1",
        published_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        slug: "test-book-2",
        title: "Test Book 2",
        author: ["Author 2"],
        isbn: "0987654321",
        cover_art: "url-to-cover-art-2",
        published_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockFindMany.mockResolvedValue(mockBooks);

    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    await getBookList(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockBooks);
  });

  it("should handle an empty book list", async () => {
    mockFindMany.mockResolvedValue([]);

    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getBookList(mockReq, mockRes, jest.fn());

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });

  it("should handle an empty book list", async () => {
    mockFindMany.mockResolvedValue([]);

    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getBookList(mockReq, mockRes, jest.fn());

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });

  it("should handle unexpected errors", async () => {
    const unexpectedError = new Error("Unexpected error");

    mockFindMany.mockRejectedValue(unexpectedError);

    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await expect(getBookList(mockReq, mockRes, jest.fn())).rejects.toThrow(
      "Unexpected error"
    );
  });
});
