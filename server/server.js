const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + "/views/";
const app = express();

app.use(express.static(path));

app.get("/registration", function (req, res) {
  res.sendFile(path + "index.html");
});

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/registration", function (req, res) {
  console.log(req.body);
  setTimeout(() => {
    res.send("Registration successful").status(200);
  }, 2000);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
