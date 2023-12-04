import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Testing...");
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
