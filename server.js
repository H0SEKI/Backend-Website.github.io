import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const app = express();
const hostname = "127.0.0.1";
const port = 5000;

// Serve static files (like CSS) from the "public" directory
app.use(express.static(_dirname + "/public"));

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.sendFile(_dirname + "/public/index.html");
});
app.get("/bookmark", (req, res) => {
  res.statusCode = 200;
  res.sendFile(_dirname + "/public/bookmark.html");
});
app.get("/login", (req, res) => {
  res.statusCode = 200;
  res.sendFile(_dirname + "/public/login.html");
});
app.get("/register", (req, res) => {
  res.statusCode = 200;
  res.sendFile(_dirname + "/public/register.html");
});

app.listen(port, () => {
  console.log(`Server running ${hostname}:${port}`);
});
