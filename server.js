// Import modul-modul yang diperlukan
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";

// Fungsi untuk membaca data dari file dan menguraikannya sebagai JSON
function getDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error membaca data dari file:", error);
    return [];
  }
}

// Fungsi untuk menulis data ke file sebagai JSON
function writeDataToFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Data berhasil ditulis ke file");
  } catch (error) {
    console.error("Error menulis data ke file:", error);
  }
}

// Dapatkan nama file dan direktori saat ini
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

// Buat aplikasi Express
const app = express();

// Tentukan nama host dan port
const hostname = "127.0.0.1";
const port = 5000;

// Tentukan path ke file kamus
const dictionary = _dirname + "/public/dictionary.json";

// Array dalam memori untuk menyimpan data buku
let books = [];

// Gunakan middleware untuk menguraikan permintaan JSON
app.use(express.json());
app.use(express.json());
app.use(express.static(_dirname + "/public"));
app.use(bodyParser.json());

// Tangani permintaan GET untuk path root
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.sendFile(_dirname + "/public/index.html");
});

// Tangani permintaan GET untuk path "/dictionary"
app.get("/dictionary", (req, res) => {
  const data = getDataFromFile(dictionary);
  res.json(data);
});

// Tangani permintaan GET untuk path "/bookmark"
app.get("/bookmark", (req, res) => {
  res.statusCode = 200;
  res.sendFile(_dirname + "/public/bookmark.html");
});

// Tangani permintaan DELETE untuk menghapus buku berdasarkan kode
app.delete("/:kode", (req, res) => {
  const kodeBuku = parseInt(req.params.kode);
  books = books.filter((book) => book.kode !== kodeBuku);
  res.send(`Buku dengan kode ${kodeBuku} berhasil dihapus`);
  const data = getDataFromFile(dictionary);
  const newData = data.filter((book) => book.kode !== kodeBuku);

  if (data.length !== newData.length) {
    writeDataToFile(dictionary, newData);
    res.json({ message: "Data berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Data tidak ditemukan" });
  }
});

// Tangani permintaan POST untuk menambahkan buku baru
app.post("/", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).send(`Buku baru berhasil ditambahkan`);
  const newData = req.body;
  const data = getDataFromFile(dictionary);
  data.push(newData);
  writeDataToFile(dictionary, data);
  res.status(201).json({ message: "Data berhasil ditambahkan" });
});

// Contoh implementasi rute PUT untuk memperbarui buku berdasarkan kode
app.put("/:kode", (req, res) => {
  const kodeBuku = parseInt(req.params.kode);
  const updatedBook = req.body;

  // Temukan indeks buku dengan kode yang diberikan
  const bookIndex = books.findIndex((book) => book.kode === kodeBuku);

  if (bookIndex !== -1) {
    // Perbarui buku dalam array
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };

    const data = getDataFromFile(dictionary);
    const newData = data.map((book) =>
      book.kode === kodeBuku ? { ...book, ...updatedBook } : book
    );

    writeDataToFile(dictionary, newData);
    res.send(`Buku dengan kode ${kodeBuku} berhasil diperbarui`);
  } else {
    res.status(404).send(`Buku dengan kode ${kodeBuku} tidak ditemukan`);
  }
});

// Contoh implementasi rute PUT untuk memperbarui judul dalam kamus
app.put("/dictionary/:Judul", (req, res) => {
  const Judul = req.params.Judul;
  const updatedTitle = req.body.Judul;
  const data = getDataFromFile(dictionary);
  const dataIndex = data.findIndex((item) => item.Judul === Judul);

  if (dataIndex !== -1) {
    data[dataIndex].Judul = updatedTitle;

    writeDataToFile(dictionary, data);
    res.json({ message: "Judul berhasil diperbarui" });
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
});

// Mulai server
app.listen(port, () => {
  console.log(`Server berjalan di ${hostname}:${port}`);
});
