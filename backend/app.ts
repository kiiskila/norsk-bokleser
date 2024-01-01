import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import NodeCache from "node-cache";
import { setupHttpsServer, setupHttpServer } from "./middleware/server";
import cacheMiddleware from "./middleware/cacheMiddleware";
import { corsOptionsDelegate, limiter } from "./utils/config";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app: Express = express();

// Set the server port (443 for production, 8080 for development)
const port = process.env.NODE_ENV === "production" ? 443 : 8080;

// Initialize a cache with a default TTL of 100 seconds and a check period of 120 seconds
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Apply CORS middleware with configured options
app.use(cors(corsOptionsDelegate));

// Enable Express to parse JSON payloads
app.use(express.json());

// Apply rate limiting middleware to all incoming requests
app.use(limiter);

// Apply caching middleware to cache responses
app.use(cacheMiddleware(myCache));

// Import and use API routes
const api = require("./routes/api");
app.use("/", api);

// Start the server
if (process.env.NODE_ENV === "production") {
  // In production, set up HTTPS and HTTP servers
  setupHttpsServer(app);
  setupHttpServer();
} else {
  // In development, start an HTTP server
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}
