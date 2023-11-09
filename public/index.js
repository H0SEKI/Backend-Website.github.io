import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/public/index.html");
});
app.get("/logo", (req, res) => {
  res.sendFile(_dirname + "/ig.png");
});

app.get("/mahasiswa", (req, res) => {
  res.send("Route GET Mahasiswa");
});
app.get("/mahasiswa/:id", (req, res) => {
  res.send(`Route GET Mahasiswa dengan ID ${req.params.id}`);
});
app.post("/mahasiswa", (req, res) => {
  res.send("Route POST Mahasiswa");
});
app.put("/mahasiswa/:id", (req, res) => {
  // SQL
  // UPDATE harga_barang FROM tblBarang WHILE id = req.params.id
  res.send("Route PUT Mahasiswa");
});
app.delete("/mahasiswa/:id", (req, res) => {
  // SQL
  // DELETE FROM tblBarang WHERE id = req.params.id
  res.send("Route DELETE Mahasiswa");
});

app.listen(port, () => {
  console.log(`Server running ${hostname}:${port}`);
});
