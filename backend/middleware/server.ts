import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

const setupHttpsServer = (app: express.Application) => {
  const privateKeyPath = path.join(__dirname, "../../certs/privkey.pem");
  const certificatePath = path.join(__dirname, "../../certs/cert.pem");
  const caPath = path.join(__dirname, "../../certs/chain.pem");

  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const certificate = fs.readFileSync(certificatePath, "utf8");
  const ca = fs.readFileSync(caPath, "utf8");

  const credentials = { key: privateKey, cert: certificate, ca: ca };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
};

const setupHttpServer = () => {
  const httpApp = express();
  httpApp.get("*", (req, res) => {
    res.redirect("https://" + req.headers.host + req.url);
  });

  http.createServer(httpApp).listen(80, () => {
    console.log("HTTP Server running on port 80");
  });
};

export { setupHttpsServer, setupHttpServer };
