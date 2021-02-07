const express = require("express");
const router = express.Router();
const users = require("./users");
const projects = require("./projects");

router.use("/auth", users);
router.use("/projects", projects);

module.exports = router;