
/*
@Author: Giordano de Brito
@Description: This script handles routing for static pages.
*/

const { Router, Request, Response } = require('express');
const { httpGet } = require('./http.request.cjs');

const router = Router();

router.get('/raw2', async function(req, res)
{
	const options =
	{
		hostname: 'adega-api-test',
		port: 3001,
		path: '/api/v1/test',
		method: 'GET'
	};

	let respRaw = await httpGet(options);

	res.send(respRaw);
});

module.exports = router;
