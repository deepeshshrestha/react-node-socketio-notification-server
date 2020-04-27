(function (db) {
  const mysql = require("mysql");

  db.connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
})(module.exports);
