const http = require('http');
const fs = require('fs');
const path = require("path");
const url = require("url");
const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

const PORT = 3000;
const HOST = "localhost";
const HOST_URL = `http://${HOST}:${PORT}`
const server = http.createServer((req, res) => {


  // req.url = pathName;
  // console.log(req.url);

  const render = (pathName) => {
    const parseURL = url.parse(pathName);
    console.log(parseURL);
    const path_name = `${parseURL.pathname}`;
    const extension = path.parse(path_name).ext;
    const absolutePath = path.join(PUBLIC_DIRECTORY, path_name);

    const contentTypes = {
      ".css": "text/css",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".html": "text/html",
      ".js": "text/javascript",
    };

    fs.readFile(absolutePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('error: file not found');
      } else {
        res.setHeader("Content-Type", contentTypes[extension] || "text/plain");
        res.end(data);
      }
    });

  }

  const URL = req.url;
  switch (URL) {
    case '/':
      req.url = '/index.example.html';
      render(req.url)
      break;
    case '/find-car':
      req.url = '/pages/findCar.html';
      render(req.url)
      break;
    default:
      req.url = req.url;
      render(req.url)
  }
})

server.listen(PORT, () => {
  console.log(`Localhost is running : ${HOST_URL}`)
})
