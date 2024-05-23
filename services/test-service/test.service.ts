

import express, { Express, Request, Response } from "express";
const app = express();

const PORT: number = 3001;

app.get("/api/v1/test", function(req: Request, res: Response)
{
    res.send({ api: "v1", appdir: __dirname, time: new Date().toString() });
});

app.get("/api/v1/message", function(req: Request, res: Response)
{
    res.send({ message: "This come from a microsservice" });
});

app.listen(PORT, () => `Test service is listening on port ${PORT}`);
