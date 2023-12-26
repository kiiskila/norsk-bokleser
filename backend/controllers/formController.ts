import { RequestHandler } from "express";

export const postBookRequest: RequestHandler = async (req, res, next) => {
  try {
    const params = req.params.preTranslatedText;
    console.log(params);

    res.status(200).json({ hey: "hello" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postIssueReport: RequestHandler = async (req, res, next) => {
  try {
    const params = req.params.preTranslatedText;
    console.log(params);

    res.status(200).json({ bye: "goodbye" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
