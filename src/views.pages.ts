
/*
@Author: Giordano de Brito
@Description: Here is the routing logic for serving the
ESJ view files.
*/

import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', function(req: Request, res: Response): void
{
	res.render('index');
});

import TestApiModel from './models/test-api-model';

router.get('/test', function(req: Request, res: Response): void
{
	let model: TestApiModel = new TestApiModel('Api Test V1', 'aaaaabbbb');

	res.render('test-api', { model: model });
});

export default router;


