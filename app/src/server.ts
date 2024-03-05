import express, { Request, Response } from "express";
import cors from "cors";
import { readFileSync } from "fs";
import path from "path";
import https from "https";
import http from "http";

const app: express.Application = express();
app.use(cors());

const rootDir = path.resolve(__dirname, "../../");
const appDir = path.resolve(__dirname, "../");

app.get("/", (req, res) => {
  const remotePort = req.connection.remotePort;
  if (remotePort === HTTP_PORT) {
    console.log("redirecting to https");
    res.redirect("https://44.218.136.154");
  } else {
    res.send({ test: "works" });
  }
});

// https
var keyPath = path.join(rootDir + "/ssl/private.key");
var certPath = path.join(rootDir + "/ssl/certificate.crt");
const key = readFileSync(keyPath);
const cert = readFileSync(certPath);
const cred = {
  key,
  cert,
};

app.get("/wordle", (req, res) => {
  // Redirect to wordle
  res.redirect("https://44.218.136.154:5000/");
});
app.get("/iogame", (req, res) => {
  // Redirect to wordle
  res.redirect("https://44.218.136.154:3000/");
});

const HTTPS_PORT = 8443;
const httpsServer = https.createServer(cred, app);
httpsServer.listen(HTTPS_PORT);
console.log("https server listening on port " + HTTPS_PORT);

const HTTP_PORT = 8080;
const httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT);
console.log("http server listening on port " + HTTP_PORT);
