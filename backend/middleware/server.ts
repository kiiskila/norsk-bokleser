import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

/**
 * Sets up an HTTPS server.
 *
 * This function configures and starts an HTTPS server using SSL/TLS certificates.
 * It listens on port 443, which is the default port for HTTPS traffic.
 *
 * @param {express.Application} app - The Express application to attach to the HTTPS server.
 */
const setupHttpsServer = (app: express.Application) => {
  // Define paths to the SSL certificate files
  const privateKeyPath = path.join(__dirname, "../../certs/privkey.pem");
  const certificatePath = path.join(__dirname, "../../certs/cert.pem");
  const caPath = path.join(__dirname, "../../certs/chain.pem");

  // Read the SSL certificate files
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const certificate = fs.readFileSync(certificatePath, "utf8");
  const ca = fs.readFileSync(caPath, "utf8");

  // Create credentials object
  const credentials = { key: privateKey, cert: certificate, ca: ca };

  // Create and start HTTPS server
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
};

/**
 * Sets up an HTTP server that redirects all traffic to HTTPS.
 *
 * This function creates an HTTP server that listens on port 80.
 * All incoming requests are redirected to the HTTPS server.
 * This is a common practice to ensure all traffic uses encryption.
 */
const setupHttpServer = () => {
  const httpApp = express();

  // Redirect all incoming HTTP requests to HTTPS
  httpApp.get("*", (req, res) => {
    res.redirect("https://" + req.headers.host + req.url);
  });

  // Create and start HTTP server
  http.createServer(httpApp).listen(80, () => {
    console.log("HTTP Server running on port 80");
  });
};

export { setupHttpsServer, setupHttpServer };
