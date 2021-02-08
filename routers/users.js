
const express = require("express");
const router = express.Router();

let userHandlers = require('../controllers/users.js');

router.route("/signup").post(userHandlers.register);
router.route("/login").post(userHandlers.sign_in);

module.exports = router;