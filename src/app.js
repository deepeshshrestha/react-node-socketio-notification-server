const express = require("express");
const logger = require("morgan");
const cor = require("cors");

const userRoute = require("./users/userRoute");

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

app.use("/api/users", userRoute);

module.exports = app;
