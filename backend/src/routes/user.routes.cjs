
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller.cjs");

router.get("/credentials/loginattempt", UserController.loginAttempt);

module.exports = router;
