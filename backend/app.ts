import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const api = require("./routes/api");
const app: Express = express();
const port = 8080;

const corsOptions = {
  origin:
    process.env.CORS_ORIGIN ||
    "http://localhost:3000" ||
    "https://norsk-bokleser.vercel.app" ||
    "http://norsk-bokleser.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", api);

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
