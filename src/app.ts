
import express, { Express, Request, Response } from "express";
import path from "path";
import { httpGet, httpPost } from './http.request';

const app: Express = express();

const PORT: number = 3000;

// Serves static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/raw', async function(req: Request, res: Response)
{
	let options: Object = {
		hostname: 'store-express-api-test',
		port: 3001,
		path: '/api/v1/test',
		method: 'GET'
	};

	let respRaw = await httpGet(options);
	//let respRaw = httpPost();
    res.send(respRaw);
});

app.listen(PORT, () => `App running on port ${PORT}`);

