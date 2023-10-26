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
  const user = await connection.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  // Jika pengguna tidak ditemukan
  if (user.length === 0) {
    return res.status(401).json({ message: "Login gagal" });
  }

  // Periksa apakah token pengguna telah diblokir
  const userToken = user.rows[0].token;
  if (blockedTokens.includes(userToken)) {
    return res.status(403).json({
      message: "Token tidak valid: Token pengguna telah diblokir",
    });
  }
  console.log(user.rows[0].password);
  // Ambil password hash dari hasil query
  const userPassword = user.rows[0].password;

  // Periksa kata sandi dengan Bcrypt
  const passwordMatch = await bcrypt.compareSync(password, userPassword);

  if (passwordMatch) {
    // Buat token baru
    const token = jwt.sign({ username: user.rows[0].username }, "rahasia", {
      expiresIn: "1h",
    });

    res.json({ message: "login berhasil", token });
  } else {
    res.status(401).json({ message: "Login gagal" });
  }
});

router.post("/logout", (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).json({ message: "Token tidak ada" });
  }

  // Validasi token
  jwt.verify(token, "rahasia", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" });
    }

    if (blockedTokens.includes(token)) {
      // Hapus token dari daftar blockedTokens
      const index = blockedTokens.indexOf(token);
      if (index > -1) {
        blockedTokens.splice(index, 1);
      }
      return res.json({ message: "Logout berhasil" });
    } else {
      return res
        .status(403)
        .json({ message: "Token tidak ada dalam daftar diblokir" });
    }
  });
});

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: "Token diperlukan" });

  jwt.verify(token, "rahasia", (err, user) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res
          .status(403)
          .json({ message: "Token tidak valid: Token tidak dapat diproses" });
      }
      if (err.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ message: "Token tidak valid: Token telah kedaluwarsa" });
      }
      return res.status(403).json({ message: "Token tidak valid" });
    }
    req.user = user;
    next();
  });
}
module.exports = {
  routes: router,
  verifyToken,
};
