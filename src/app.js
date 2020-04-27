const express = require("express");
const logger = require("morgan");
const cor = require("cors");

const app = express();

app.use(cor());
app.options("*", cor());

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`hello world`);
  res.end();
});

module.exports = app;
