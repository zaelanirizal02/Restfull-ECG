const express = require("express");
const app = express(); // Inisialisasi aplikasi Express
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blockedTokens = [];

//import express validator
const { body, validationResult } = require("express-validator");
//import database
const connection = require("../config/pg-database");
//
const bodyParser = require("body-parser");
const { Connection } = require("pg");
app.use(bodyParser.json());

// Sisipkan penggunaan router di sini
app.use("/auth", router);

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //periksa apakah pengguna sudah terdaftar
  const existingUser = await connection.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  // console.log(existingUser);

  if (existingUser.rows.length > 0) {
    if (existingUser.rows[0].username === username) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }
  }

  // Hash kata sandi sebelum menyimpannya
  const hashedPassword = await bcrypt.hash(password, 10);

  //tambahkan pengguna baru ke database
  await connection.query(
    "INSERT INTO users (username, password) VALUES ($1,$2)",
    [username, hashedPassword]
  );

  res.json({ message: "Registrasi berhasil" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Cari pengguna berdasarkan username
  const userLogin = await connection.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  // Jika pengguna tidak ditemukan
  if (userLogin.rows.length === 0) {
    return res.status(401).json({ message: "Login gagal" });
  }

  // Periksa apakah token pengguna telah diblokir
  const userToken = userLogin.rows[0]?.token; // Gunakan "?." untuk mengatasi undefined
  if (blockedTokens.includes(userToken)) {
    return res.status(403).json({
      message: "Token tidak valid: Token pengguna telah diblokir",
    });
  }

  // Ambil password hash dari hasil query
  const userPassword = userLogin.rows[0].password;

  // Periksa kata sandi dengan Bcrypt
  const passwordMatch = await bcrypt.compareSync(password, userPassword);

  if (passwordMatch) {
    // Buat token baru
    const token = jwt.sign({ userId: userLogin.rows[0].id }, "rahasia", {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "login berhasil",

      data: {
        accessToken: token,
        user: {
          userId: userLogin.rows[0].id,
          username: userLogin.rows[0].username,
        },
      },
    });
  } else {
    res.status(401).json({ message: "Login gagal" });
  }
});

router.post("/logout", verifyToken, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const tokenSplit = token && token.split(" ")[1];

    const check = await connection.query("SELECT * FROM blockTokens");
    if (check.rows.length < 1) {
      await connection.query(
        "INSERT INTO blockTokens (token, user_id) VALUES ($1,$2)",
        [tokenSplit, req.userId]
      );

      res.status(201).json({
        message: "successful logout 1",
      });
    }

    if (check.rows[0].token != tokenSplit) {
      await connection.query("UPDATE blockTokens SET id = $1, token = $2 ", [
        req.userId,
        tokenSplit,
      ]);
      res.status(201).json({
        message: "successful logout 2",
      });
    }
  } catch (error) {}
});

async function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  const checkToken = await connection.query(
    "SELECT * FROM blockTokens where token = $1",
    [token]
  );
  if (!token) return res.status(401).json({ message: "Token diperlukan" });

  // console.log(checkToken);

  if (checkToken.rows.length && checkToken) {
    res.status(404).json({
      message: "token diperlukan login ulang",
    });
  }

  jwt.verify(token, "rahasia", (err, decode) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({
          message: "Token tidak valid: Token tidak dapat diproses",
        });
      }
      if (err.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ message: "Token tidak valid: Token telah kedaluwarsa" });
      }
      return res.status(403).json({ message: "Token tidak valid" });
    }
    req.userId = decode.userId;
    next();
  });
}
module.exports = {
  routes: router,
  verifyToken,
};
