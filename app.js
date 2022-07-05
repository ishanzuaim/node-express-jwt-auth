const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mlzmf.mongodb.net/node-auth`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(auth);

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");

  res.cookie("newUser", false);
  res.cookie("isEmployee", true, { httpOnly: true });

  res.send("cookie delivered");
});

app.get("/read-cookies", (req, res) => {
  console.log(cookies);

  res.json(cookies);
});
