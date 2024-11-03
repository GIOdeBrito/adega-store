
import express, { Express, Request, Response } from "express";
const app = express();

import { authUser } from "./helpers/auth";

app.use(express.json());

app.use(function (req: Request, res: Response, next: Function)
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Looks for next route that matches
	next();
});

app.get("/api/v1/version", function (req: Request, res: Response)
{
	res.send({ api: "v1", version: "1.0.0" });
});

app.post("/api/v1/user-auth", async function (req: Request, res: Response)
{
	let body = req.body;

	let dbresponse = await authUser(body.pwd as string);

	res.send({ api: "v1", result: dbresponse });
});

const PORT: number = 8080;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
