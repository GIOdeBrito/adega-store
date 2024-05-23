
import express, { Express, Request, Response } from "express";
import path from "path";
import { httpGet, httpPost } from './http.request';

const app: Express = express();

const PORT: number = 3000;

// Serves static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/raw', async function(req: Request, res: Response)
{
    let respRaw = await httpGet("http://store-express-api-test:3001/api/v1/test");
	//let respRaw = httpPost();
    res.send(respRaw);
});

app.listen(PORT, () => `App running on port ${PORT}`);

