const express = require("express");
const User = require("../models/user");
const isAuth = require("../middleware/isAuth");

const dashboardController = require("../controllers/dashboard");

const router = express.Router();

router.get("/getProjects", isAuth, dashboardController.getProjects);

module.exports = router;
