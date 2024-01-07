import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { EmailService } from "../services/emailService";

// Initialize Prisma Client
const db = new PrismaClient();

/**
 * postBookRequest is a RequestHandler that handles the submission of book requests.
 * It logs the report details and contact email to the database, and sends an email notification.
 *
 * It responds with the logged report data if successful, otherwise it handles the errors.
 */
export const postBookRequest: RequestHandler = async (req, res, next) => {
  try {
    // Extract details and contact email from the request body
    const { title, author, details, contactEmail } = req.body;
    const emailLogType = "request";
    const detailsToLog = `Title: ${title}, Author: ${author}, Details: ${details}`;

    // Log the report details and contact email to the database
    const emailLog = await db.emailLog.create({
      data: {
        type: emailLogType,
        details: detailsToLog,
        contact_email: contactEmail,
      },
    });

    // Send an email notification
    await EmailService.sendEmail({
      to: process.env.RECEIVER_EMAIL || "",
      from: process.env.SENDER_EMAIL || "",
      subject: "New Book Request",
      text: `A new book request has been made.\nTitle: ${title}\nAuthor: ${author}\nDetails: ${details}\nContact Email: ${contactEmail}`,
    });

    // Respond with the logged report data
    res.status(200).json(emailLog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * postIssueReport is a RequestHandler that handles the submission of issue reports.
 * It logs the report details and contact email to the database, and sends an email notification.
 *
 * It responds with the logged report data if successful, otherwise it handles the errors.
 */
export const postIssueReport: RequestHandler = async (req, res, next) => {
  console.log("in the report");
  try {
    // Extract details and contact email from the request body
    const { details, contactEmail } = req.body;
    const emailLogType = "report";
    const detailsToLog = `Details: ${details}`;

    // Log the report details and contact email to the database
    const emailLog = await db.emailLog.create({
      data: {
        type: emailLogType,
        details: detailsToLog,
        contact_email: contactEmail,
      },
    });

    // Send an email notification
    await EmailService.sendEmail({
      to: process.env.RECEIVER_EMAIL || "",
      from: process.env.SENDER_EMAIL || "",
      subject: "New Issue Report",
      text: `A new issue report has been made.\nDetails: ${details}\nContact Email: ${contactEmail}`,
    });

    // Respond with the logged report data
    res.status(200).json(emailLog);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};
