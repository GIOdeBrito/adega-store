
const express = require("express");
const app = express();

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

const PORT = 8080;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
