const { Client } = require("pg");

const connection = new Client({
  user: "postgres",
  host: "localhost",
  database: "form_ecg",
  password: "j43l4nur",
  port: 5432,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Sudah Connect!");
});
module.exports = connection;
