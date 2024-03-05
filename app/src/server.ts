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
  res.redirect("http://http://44.218.136.154:5000/");
});

// https
var keyPath = path.join(rootDir + "/F63369EE89B8762C73F6D5370722D843.txt");
const file = readFileSync(keyPath);
app.get("/.well-known/pki-validation/", (req, res) => {
  res.sendFile(keyPath);
});

const PORT = process.env.PORT || 8080;
serv.listen(PORT);
console.log("Server listening on port " + PORT);
