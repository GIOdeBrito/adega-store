
/*
@Author: Giordano de Brito
@Description: Here is the routing logic for serving the
ESJ view files.
*/

const { Router, Request, Response } = require('express');
const path = require('path');

const TestApiModel = require('./models/test-api-model.cjs');

const router = Router();

router.get('/', function (req, res)
{
	res.render('index');
});

/* Serve modals */

router.get('/api/v1/modal', function (req, res)
{
	let name = req.query?.name;

	if(!name)
	{
		res.status(400).send('Name not specified');
	}

	res.render('modals/' + name);
});

/* Test view */

router.get('/test', function(req, res)
{
	let model = new TestApiModel('Api Test V1', 'aaaaabbbb');

	res.render('test-api', { model: model });
});

module.exports = router;
