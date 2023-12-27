import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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
