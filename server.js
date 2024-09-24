const http = require("http");
const fs = require("fs");
const url = require("url");
const { getGreeting } = require("./modules/utils");
const PORT = 8080;

http
  .createServer((req, res) => {
    let urlString = url.parse(req.url, true);
    let path = urlString.pathname;

    if (path === "/COMP4537/labs/3/getDate/") {
      let name = urlString.query["name"];
      let message = getGreeting(name);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<div style="color: blue;">${message}</div>`);
    } else if (path === "/COMP4537/labs/3/writeFile/") {
      let text = urlString.query["text"];

      fs.appendFile("file.txt", text + "\n", (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("Error writing to file");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("Text appended to file");
        }
      });
    } else if (path.startsWith("/COMP4537/labs/3/readFile/")) {
      let fileName = path.split("/").pop();

      console.log(fileName);
      fs.readFile(fileName, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(fileName + "404 Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      });
    }
  })
  .listen(PORT);
