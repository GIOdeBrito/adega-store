
/*
@Author: Giordano de Brito
@Description: Here is the routing logic for serving the
ESJ view files.
*/

import express, { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

router.get('/', function (req: Request, res: Response): void
{
	res.render('index');
});

/* Serve modals */

router.get('/api/v1/modal', function (req: Request, res: Response): void
{
	let name = req.query?.name as string;

	if(!name)
	{
		res.status(400).send('Name not specified');
	}

	res.render('modals/' + name);
});

/* Test view */

import TestApiModel from './models/test-api-model';

router.get('/test', function(req: Request, res: Response): void
{
	let model: TestApiModel = new TestApiModel('Api Test V1', 'aaaaabbbb');

	res.render('test-api', { model: model });
});

export default router;


