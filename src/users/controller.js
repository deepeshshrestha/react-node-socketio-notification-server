require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { query } = require("../helper/databaseHelper");

const JWTSECRET = process.env.JWT_SECRET;

const registration = async (req, res) => {
  const data = query(`SELECT * FROM users WHERE email = '${req.body.email}';`);
  const result = await data;
  if (Object.keys(result).length === 0) {
    if (req.body.password === req.body.confirmPassword) {
      const salt = await bcrypt.genSalt(1);
      const hash = await bcrypt.hash(req.body.password, salt);
      const x = await query(`INSERT INTO users (name,email,role,password) 
                            VALUES ('${req.body.name}','${req.body.email}','${req.body.role}','${hash}');`);
      if (x.affectedRows == 1) {
        res.status(200).send({
          title: "user registration",
          message: "user registration successful",
          statusCode: 200,
          success: true,
          load: {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: hash,
          },
        });
      }
    } else {
      res.status(400).send({
        title: "user registration",
        message: "user registration unsuccessful",
        statusCode: 400,
        success: false,
        load: {
          error: "password does not match confirm password",
        },
      });
    }
  } else {
    res.status(409).send({
      title: "user registration",
      message: "user registration unsuccessful",
      statusCode: 409,
      success: false,
      load: {
        error: "email in use",
      },
    });
  }
};

module.exports = { registration };
