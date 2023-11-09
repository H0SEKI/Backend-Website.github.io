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

// Sample JSON API endpoint
app.get("/api/data", (req, res) => {
  const jsonData = { message: "Hello, this is your API data!" };
  res.json(jsonData);
});

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/index.html");
});
app.get("/bookmark", (req, res) => {
  res.sendFile(_dirname + "/bookmark.html");
});
app.get("/login", (req, res) => {
  res.sendFile(_dirname + "/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(_dirname + "/register.html");
});

app.listen(port, () => {
  console.log(`Server running ${hostname}:${port}`);
});
