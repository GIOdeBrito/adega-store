
import express, { Express, Request, Response } from "express";
const app = express();

import { authUser } from "./helpers/auth";

app.get("/api/v1/user-auth", async function(req: Request, res: Response)
{
	let result = await authUser("gio106");

	res.send({ api: "v1", result: result });
});

const PORT: number = 8080;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
