const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

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

//import body parser
const bodyParser = require("body-parser");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//import route tindakan
const tindakanRouter = require("./routes/tindakans");
app.use("/api/tindakans", tindakanRouter);

app.listen(port, () => {
  console.log(`connected on localhost:${port}`);
});
