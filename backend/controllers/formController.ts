import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: "postgres://postgres:postgres@host.docker.internal:5432/norsk_bokleser",
    },
  },
});

export const postBookRequest: RequestHandler = async (req, res, next) => {
  try {
    const { title, author, details, contactEmail } = req.body;
    const emailLogType = "request";
    const detailsToLog = `Title: ${title}, Author: ${author}, Details: ${details}`;

    const emailLog = await db.emailLog.create({
      data: {
        type: emailLogType,
        details: detailsToLog,
        contact_email: contactEmail,
      },
    });

    res.status(200).json(emailLog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postIssueReport: RequestHandler = async (req, res, next) => {
  try {
    const { details, contactEmail } = req.body;
    const emailLogType = "report";
    const detailsToLog = `Details: ${details}`;

    const emailLog = await db.emailLog.create({
      data: {
        type: emailLogType,
        details: detailsToLog,
        contact_email: contactEmail,
      },
    });

    res.status(200).json(emailLog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
