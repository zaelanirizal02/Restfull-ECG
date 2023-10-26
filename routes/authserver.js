const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

const users = [];

// REGISTER A USER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Nama dan kata sandi diperlukan" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: "Registrasi berhasil", user: newUser });
    console.log(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mendaftarkan pengguna" });
  }
});

module.exports = router;
