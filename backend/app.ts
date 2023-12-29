import express, { Express, Request } from "express";
import cors, { CorsOptionsDelegate, CorsRequest } from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();

const privateKeyPath = path.join(__dirname, "../../certs/privkey.pem");
const certificatePath = path.join(__dirname, "../../certs/cert.pem");
const caPath = path.join(__dirname, "../../certs/chain.pem");

const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const certificate = fs.readFileSync(certificatePath, "utf8");
const ca = fs.readFileSync(caPath, "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

const api = require("./routes/api");
const app: Express = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://norsk-bokleser.vercel.app",
  "http://norsk-bokleser.vercel.app",
];

const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = (
  req,
  callback
) => {
  const origin = req.headers.origin;

  let corsOptions;

  if (!origin || allowedOrigins.includes(origin)) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use("/", api);

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});

const http = require("http");
const httpApp = express();

httpApp.get("*", (req, res) => {
  res.redirect("https://" + req.headers.host + req.url);
});

http.createServer(httpApp).listen(80, () => {
  console.log("HTTP Server running on port 80");
});
