
import express, { Express, Request, Response } from "express";
import path from "path";

import { httpGet } from './http.request.js';

const app: Express = express();

// Serves static files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => "App running on port 3000");

app.get('/raw', async function(req: Request, res: Response)
{
    let respRaw = await httpGet("https://solid-disco-pg5r49r5vv4frqwj-3001.app.github.dev/api/v1/test");
    res.send(respRaw);
});

