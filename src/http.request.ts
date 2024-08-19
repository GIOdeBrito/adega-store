
/*
@Author: Giordano de Brito
@Description: Here lies some basic Web request functions.
Since I do not have a SSL certificate, I had to stick to HTTP.
*/

import http from "http";

function httpGet (options: Object): Promise<string>
{
	return new Promise((resolve, reject) =>
	{
		let result: string[] = [];

		const req: http.ClientRequest = http.request(options, (res: http.IncomingMessage) =>
		{
			//console.log(res.statusCode);

			res.setEncoding('utf8');
			res.on('data', (chunk: string) =>
			{
				result.push(chunk);
			});

			res.on('end', () =>
			{
				resolve(result.join(''));
			});
		});

		req.on('error', (err: any) =>
		{
			reject(err.message);
		});

		req.end();
	});
}

function httpPost (): void
{
	// No post logic for now :P
}

export {
	httpGet,
	httpPost
}

