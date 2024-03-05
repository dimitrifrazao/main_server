import express, { Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import http from "http";

const app: express.Application = express();
var serv = new http.Server(app);

const rootDir = path.resolve(__dirname, "../../");
const appDir = path.resolve(__dirname, "../");

app.get("/", (req, res) => {
  // Redirect to wordle
  //res.redirect("http://44.218.136.154:5000/");
  res.sendFile(keyPath);
});

// https
var keyPath = path.join(rootDir + "/FD1670CBC30720C3DA3C64F05E424289.txt");
const file = readFileSync(keyPath);
app.get(
  "/.well-known/pki-validation/FD1670CBC30720C3DA3C64F05E424289.txt",
  (req, res) => {
    res.sendFile(keyPath);
  }
);

app.get("/", (req, res) => {
  // Redirect to wordle
  //res.redirect("http://44.218.136.154:5000/");
  res.sendFile(keyPath);
});

const PORT = process.env.PORT || 8080;
serv.listen(PORT);
console.log("Server listening on port " + PORT);
