(function (db) {
  const database = require("./databaseConnection");
  const conn = database.connection;

  db.query = (query) => {
    return new Promise((resolve, reject) => {
      conn.query(`USE ${process.env.DB_NAME}`, (err, result) => {
        conn.query(query, (err, result) => {
          resolve(result);
          console.log(err);
          reject(err);
        });
      });
    });
  };
})(module.exports);
