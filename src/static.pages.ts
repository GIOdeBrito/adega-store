
/*
@Author: Giordano de Brito
@Description: This script handles routing for static pages.
*/

import { Router, Request, Response } from 'express';
import { httpGet } from './http.request';

const router = Router();

router.get('/raw2', async function(req: Request, res: Response): Promise<void>
{
	let options: Object =
	{
		hostname: 'store-express-api-test',
		port: 3001,
		path: '/api/v1/test',
		method: 'GET'
	};

	let respRaw: string = await httpGet(options);
	res.send(respRaw);
});

export default router;

