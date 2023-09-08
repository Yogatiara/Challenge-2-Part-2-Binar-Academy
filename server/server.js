const http = require('http');
const fs = require('fs');
const path = require("path");
const url = require("url");
const PORT = 3000;
const HOST = "localhost"; const HOST_URL = `http://${HOST}:${PORT}`

const PUBLIC_DIRECTORY = path.join(__dirname, "../public");


http.createServer((req, res) => {

  switch (req.url) {
    case "/":
      req.url = "/pages/landingPage.html";
      break;
    case "/cars":
      req.url = '/pages/findCar.html'
      break;
    default:
      req.url = req.url;

  }
  const parseURL = url.parse(req.url);
  const pathName = `${parseURL.pathname}`;
  const extension = path.parse(pathName).ext;
  const absolutePath = path.join(PUBLIC_DIRECTORY, pathName);

  const contentTypes = {
    ".css": "text/css",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".html": "text/html",
    ".js": "text/javascript",
  };

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("File not found");
    } else {
      res.setHeader("Content-Type", contentTypes[extension] || "text/plain");
      res.end(data);
    }
  });
}
).listen(PORT);

console.log(`Localhost is running : ${HOST_URL}`)