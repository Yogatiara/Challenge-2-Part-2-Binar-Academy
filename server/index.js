const http = require('http');
const fs = require('fs');

const PORT = 3000;
const HOST = "localhost";
const HOST_URL = `http://${HOST}:${PORT}`
const server = http.createServer((req, res) => {

  res.writeHead(200, {
    'Content-Type': [
      "text/css",
      "image/png",
      "image/svg+xml",
      "text/html",
      "text/javascript",
    ]
  });

  const url = req.url;

  switch (url) {
    case '/find-car':
      res.write("halaman cari mobil");
      res.end();
      break;
    default:
      fs.readFile('public/index.example.html', (error, data) => {
        if (error) {
          res.writeHead(404);
          res.write('error: file not found');
        } else {
          res.write(data);
        }
        res.end();
      })
      break;
  }
})

server.listen(PORT, () => {
  console.log(`Localhost is running : ${HOST_URL}`)
})
