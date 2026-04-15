
const http = require("http");

function httpGet(options)
{
	return new Promise((resolve, reject) => {

		const req = http.request(options, (res) => {

			let result = '';

			res.setEncoding('utf8');

			res.on('data', (chunk) => {

				result += chunk;
			});
			res.on('end', () => {

				resolve(result);
			});
		});

		req.on('error', (err) => {

			reject(err.message);
		});

		req.end();
	});
}

function httpPostJson(options, data)
{
	const body = JSON.stringify(data);

	const postOptions = {
		...options,
		method: 'POST',
		headers: {
			...options.headers,
			'Content-Type': 'application/json'
		}
	};

	return new Promise((resolve, reject) => {

		const req = http.request(postOptions, (res) => {

			let result = '';
			res.setEncoding('utf8');
			res.on('data', chunk => result += chunk);
			res.on('end', () => resolve(result));
		});

		req.on('error', err => reject(err.message));
		req.write(body);
		req.end();
	});
}

module.exports = {
	httpGet,
	httpPostJson
};

