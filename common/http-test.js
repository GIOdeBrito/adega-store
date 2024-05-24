const http = require('http');

const options =
{
 	hostname: 'store-express-api-test',
 	port: 3001,
 	path: '/api/v1/test',
 	method: 'GET'
};

function httpGet (options)
{
	return new Promise((resolve, reject) =>
    {
		let result = '';

		const req = http.request(options, (res) =>
		{
		    console.log(res.statusCode);

		    //res.setEncoding('utf8');
		    res.on('data', (chunk) =>
			{
		        result += chunk;
		    });

		    res.on('end', () =>
			{
		        resolve(result);
		    });
		});

		req.on('error', (err) =>
		{
		    reject(err.message);
		});

		req.end();
	});
}


async function start ()
{
	let res = await httpGet(options);
	console.log(res);
}

start();
