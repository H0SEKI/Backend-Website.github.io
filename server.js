import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const app = express();
const hostname = "127.0.0.1";
const port = 5000;

// In-memory array to store book data
let books = [];

app.use(express.json()); // Parse JSON requests
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

app.delete("/:kode", (req, res) => {
  const kodeBuku = parseInt(req.params.kode);
  books = books.filter((book) => book.kode !== kodeBuku);
  res.send(`Buku dengan kode ${kodeBuku} berhasil dihapus`);
});

app.post("/", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).send(`Buku baru berhasil ditambahkan`);
});

// Example implementation for PUT route
app.put("/:kode", (req, res) => {
  const kodeBuku = parseInt(req.params.kode);
  const updatedBook = req.body;

  // Find the index of the book with the provided kode
  const bookIndex = books.findIndex((book) => book.kode === kodeBuku);

  if (bookIndex !== -1) {
    // Update the book in the array
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    res.send(`Buku dengan kode ${kodeBuku} berhasil diperbarui`);
  } else {
    res.status(404).send(`Buku dengan kode ${kodeBuku} tidak ditemukan`);
  }
});

app.listen(port, () => {
  console.log(`Server running ${hostname}:${port}`);
});

