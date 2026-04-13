
const express = require("express");
const router = express.Router();
const container = require('../services/container.cjs');

router.get("/db", async (req, res) => {

	const rows = await container.get('postgresdb').query("SELECT * FROM users");
	res.send(rows.rows);
});

router.get("/version", (req, res) => {

	res.send({ api: "v1", version: "1.0.0" });
});

module.exports = router;
