require("dotenv").config();
const { Client } = require("pg");

const connection = new Client({
  user: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Sudah Connect!");
});
module.exports = connection;
