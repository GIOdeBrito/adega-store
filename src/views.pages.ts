
/*
@Author: Giordano de Brito
@Description: Here is the routing logic for serving the
ESJ view files.
*/

import { Router, Request, Response } from 'express';

const router = Router();

router.get('/test', function(req: Request, res: Response): void
{
	let model: Object =
	{
		title: 'Api Test V1',
		response: 'aaaaabbbb'
	};

	res.render('test-api', model);
});

export default router;
