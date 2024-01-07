import { CorsOptionsDelegate, CorsRequest } from "cors";
import rateLimit from "express-rate-limit";

/**
 * Configuration for Cross-Origin Resource Sharing (CORS).
 * Specifies a list of allowed origins for security and control.
 */
const allowedOrigins = [
  // Production origins
  "https://norsk-bokleser.vercel.app",
  "https://bokhjelp.me",
  "http://bokhjelp.me",
  "www.bokhjelp.me",
  "76.76.21.21",
  // Local development origin
  "http://localhost:5173",
];

/**
 * CORS Options Delegate
 * Dynamically provides CORS configuration based on the request origin.
 *
 * @param {CorsRequest} req - The HTTP request object.
 * @param {Function} callback - Callback function to pass the CORS options.
 */
export const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = (
  req,
  callback
) => {
  // Extract the origin of the request
  const origin = req.headers.origin;
  let corsOptions;

  // Enable CORS if the request origin is in the allowed list or not provided (for server-to-server requests)
  if (!origin || allowedOrigins.includes(origin)) {
    corsOptions = { origin: true };
  } else {
    // Disable CORS for disallowed origins
    corsOptions = { origin: false };
  }

  // Execute the callback with the CORS configuration
  callback(null, corsOptions);
};

/**
 * Rate Limiter Configuration
 * Limits the number of requests an individual IP address can make in a set time window.
 * Helps protect against denial-of-service attacks and other brute-force attacks.
 */
export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // Duration of rate limiting window: 10 minutes
  max: 1000, // Maximum number of requests allowed from an IP during the window
});
