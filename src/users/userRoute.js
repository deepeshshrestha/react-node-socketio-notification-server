const express = require("express");
const { registration, loginVerification } = require("./controller");
const databaseHandler = require("../helper/databaseHelper");

const router = express.Router();

router.post("/register", (req, res) => {
  registration(req, res);
});

module.exports = router;
