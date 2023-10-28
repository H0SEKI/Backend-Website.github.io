const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 5000;

const server = http.createServer((req, res) => {
  // res.write ("Hello There!")
  // res.end()
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    const data = fs.readFileSync("index.html");
    res.write(hostname + ":" + port + req.url);
    res.end(data);
  } else if (req.url === "/bookmark") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    const data = fs.readFileSync("bookmark.html");
    res.write(hostname + ":" + port + req.url);
    res.end(data);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running ${hostname}:${port}`);
});
