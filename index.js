const path = require("path");
const dotenv = require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const project = require("./src/model/project");

dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vyxxsts.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/getProjects", async (req, res, next) => {
  try {
    const response = await project.find();
    setTimeout(() => {
      res.status(200).send(response);
    }, 200);
    // res.status(200).send(rteresponse);
  } catch (error) {
    console.log("error: ", error);
  }
});

app.use("/", (req, res, next) => {
  res.send("Hello, Welcome to the app and server is running");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Coonected to mongodb");
    app.listen(process.env.PORT || 8080, "0.0.0.0");
  })
  .catch((err) => console.log(err));
