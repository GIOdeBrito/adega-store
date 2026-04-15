
const express = require("express");
const router = express.Router();
const TestController = require("../controllers/test.controller.cjs");

if(process.env.ENVIRONMENT === "development")
{
	router.get("/test/db", TestController.databaseQuery);
	router.get("/test/version", TestController.version);
}

router.get("/hello", (req, res) => {

	res.send("hello");
});

module.exports = router;
