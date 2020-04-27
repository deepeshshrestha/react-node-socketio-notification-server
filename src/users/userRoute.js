const express = require("express");
const { registration, loginVerification } = require("./controller");
const databaseHandler = require("../helper/databaseHelper");

const router = express.Router();

router.post("/register", (req, res) => {
  registration(req, res);
});

router.post("/login", (req, res) => {
  loginVerification(req, res);
});

router.get("/allUsers", async (req, res) => {
  const result = await databaseHandler.query(`SELECT * FROM users;`);
  res.status(200).send(result);
});

module.exports = router;
