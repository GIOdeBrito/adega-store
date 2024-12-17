
/*
@Author: Giordano de Brito
@Description: Here lies some basic Web request functions.
Since I do not have a SSL certificate, I had to stick to HTTP.
*/

const http = require("http");

function httpGet (options)
{
	return new Promise((resolve, reject) =>
	{
		let result = [];

		const req = http.request(options, (res) =>
		{
			//console.log(res.statusCode);

			res.setEncoding('utf8');

			res.on('data', (chunk) =>
			{
				result.push(chunk);
			});

			res.on('end', () =>
			{
				resolve(result.join(''));
			});
		});

		req.on('error', (err) =>
		{
			reject(err.message);
		});

		req.end();
	});
}

function httpPost ()
{
	// No post logic for now :P
}

module.exports = {
	httpGet,
	httpPost
};

