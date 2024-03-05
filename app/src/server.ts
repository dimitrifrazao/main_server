import express, { Request, Response } from "express";
import cors from "cors";
import { readFileSync } from "fs";
import path from "path";
import http from "http";
import https from "https";

const app: express.Application = express();
app.use(cors());

var serv = new http.Server(app);
const PORT = process.env.PORT || 8080;
serv.listen(PORT);
console.log("http server listening on port " + PORT);

const rootDir = path.resolve(__dirname, "../../");
const appDir = path.resolve(__dirname, "../");

app.get("/", (req, res) => {
  res.redirect("http://44.218.136.154:5000/");
});

// https
var keyPath = path.join(rootDir + "/private.key");
var certPath = path.join(rootDir + "/certificate.crt");
const key = readFileSync(keyPath);
const cert = readFileSync(certPath);
const cred = {
  key,
  cert,
};

app.get("/wordle", (req, res) => {
  // Redirect to wordle
  res.redirect("http://44.218.136.154:5000/");
});
app.get("/iogame", (req, res) => {
  // Redirect to wordle
  res.redirect("http://44.218.136.154:3000/");
});

const HTTPS_PORT = 8443;
const httpsServer = https.createServer(cred, app);
httpsServer.listen(HTTPS_PORT);
console.log("https server listening on port " + HTTPS_PORT);
