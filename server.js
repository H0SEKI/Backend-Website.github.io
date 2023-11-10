import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from 'body-parser';


function getDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data from file:", error);
    return [];
  }
}

function writeDataToFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Data written to file successfully");
  } catch (error) {
    console.error("Error writing data to file:", error);
  }
}


const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const app = express();
const hostname = "127.0.0.1";
const port = 5000;
const dictionary = _dirname + "/public/dictionary.json";

let books = [];

app.use(express.json());
app.use(express.static(_dirname + "/public"));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.statusCode = 200;
  res.sendFile(_dirname + "/public/index.html");
});


app.get('/dictionary', (req, res) => {
  const data = getDataFromFile(dictionary);
  res.json(data);
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
  const data = getDataFromFile(dictionary);
  const newData = data.filter((book) => book.kode !== kodeBuku);

  if (data.length !== newData.length) {
    writeDataToFile(dictionary, newData);
    res.json({ message: 'Data deleted successfully' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});


app.post("/", (req, res) => {
  const newData = req.body;
  const data = getDataFromFile(dictionary);
  data.push(newData);
  writeDataToFile(dictionary, data);
  res.status(201).json({ message: 'Data added successfully' });
});


app.put("/:kode", (req, res) => {
  const kodeBuku = parseInt(req.params.kode);
  const updatedBook = req.body;
  const bookIndex = books.findIndex((book) => book.kode === kodeBuku);

  if (bookIndex !== -1) {
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



app.put('/dictionary/:Judul', (req, res) => {
  const Judul = req.params.Judul;
  const updatedTitle = req.body.Judul;
  const data = getDataFromFile(dictionary);
  const dataIndex = data.findIndex((item) => item.Judul === Judul);

  if (dataIndex !== -1) {
    data[dataIndex].Judul = updatedTitle;

    writeDataToFile(dictionary, data);
    res.json({ message: 'Title updated successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running ${hostname}:${port}`);
});

