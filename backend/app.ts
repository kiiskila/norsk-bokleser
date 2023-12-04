import express, { Express, Request, Response } from "express";

const api = require("./routes/api");
const app: Express = express();
const port = 8080;

app.use("/", api);

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
