const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
//import body parser
const bodyParser = require("body-parser");
//import route tindakan
const tindakanRouter = require("./routes/tindakans");
const authRouter = require("./routes/auth");

const session = require("express-session");

// app.use(
//   session({
//     secret: "rahasia",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Middleware untuk mengizinkan CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

app.use("/api/tindakans", tindakanRouter);
app.use("/api/auth", authRouter.routes);

app.listen(port, () => {
  console.log(`connected on localhost:${port}`);
});
