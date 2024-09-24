const path = require("path");
const dotenv = require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const project = require("./src/models/project");
const authRoutes = require("./src/routes/auth");
const dashboardRoutes = require("./src/routes/dashboard");
const User = require("./src/models/user");

dotenv.config();

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? `mongodb://localhost:27017/empiric-leap`
    : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vyxxsts.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
// const MONGODB_URI = `mongodb://localhost:27017/empiric-leap`

console.log("MONGODB_URI : ", MONGODB_URI);

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/user", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res, next) => {
  res.send("Hello, Welcome to the app and server is running");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Coonected to mongodb");
    app.listen(process.env.PORT || 8080, "0.0.0.0");
  })
  .catch((err) => console.log(err));
