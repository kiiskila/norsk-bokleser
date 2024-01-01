import { CorsOptionsDelegate, CorsRequest } from "cors";
import rateLimit from "express-rate-limit";

// CORS Configuration
const allowedOrigins = [
  "https://norsk-bokleser.vercel.app",
  "http://localhost:5173",
];

export const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = (
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

  callback(null, corsOptions);
};

// Rate Limiter Configuration
export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
});
