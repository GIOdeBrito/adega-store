
const express = require("express");
const app = express();

const authUser = require("./helpers/auth.cjs");

app.use(express.json());

app.use(function (req, res, next)
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Looks for next route that matches
	next();
});

app.get("/api/v1/version", function (req, res)
{
	res.send({ api: "v1", version: "1.0.0" });
});

app.post("/api/v1/user-auth", async function (req, res)
{
	let body = req.body;

	let dbresponse = await authUser(body.pwd);

	res.send({ api: "v1", result: dbresponse });
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
