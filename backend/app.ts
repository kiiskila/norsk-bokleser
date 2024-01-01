import express, { Express, Request, Response } from "express";
import cors, { CorsOptionsDelegate, CorsRequest } from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";
import http from "http";
import rateLimit from "express-rate-limit";

dotenv.config();

const app: Express = express();
const isProduction = process.env.NODE_ENV === "production";
const port = isProduction ? 443 : 8080; // Use 443 for production and 8080 for local development

// HTTPS setup for production
let httpsServer;
if (isProduction) {
  const privateKeyPath = path.join(__dirname, "../../certs/privkey.pem");
  const certificatePath = path.join(__dirname, "../../certs/cert.pem");
  const caPath = path.join(__dirname, "../../certs/chain.pem");

  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const certificate = fs.readFileSync(certificatePath, "utf8");
  const ca = fs.readFileSync(caPath, "utf8");

  const credentials = { key: privateKey, cert: certificate, ca: ca };
  httpsServer = https.createServer(credentials, app);
}

// CORS setup
const allowedOrigins = [
  "https://norsk-bokleser.vercel.app",
  "http://localhost:5173",
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

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

// Apply the rate limiter to all requests
app.use(limiter);

// API routes
const api = require("./routes/api");
app.use("/", api);

// Start the server
if (isProduction) {
  httpsServer!.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
} else {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// HTTP to HTTPS redirect (for production)
if (isProduction) {
  const httpApp = express();
  httpApp.get("*", (req: Request, res: Response) => {
    res.redirect("https://" + req.headers.host + req.url);
  });

  http.createServer(httpApp).listen(80, () => {
    console.log("HTTP Server running on port 80");
  });
}
