router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Cari pengguna berdasarkan username
  const user = await connection.oneOrNone(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  // Jika pengguna tidak ditemukan
  if (!user) {
    return res.status(401).json({ message: "Login gagal" });
  }

  // Periksa kata sandi dengan Bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign({ username: user.username }, "rahasia", {
      expiresIn: "1h",
    });

    res.json({ message: "Login berhasil", token });
  } else {
    res.status(401).json({ message: "Login gagal" });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.sendStatus(401).json({ message: "Token tidak valid" });

  jwt.verify(token, "rahasia", (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
