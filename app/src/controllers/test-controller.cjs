
const { httpGet } = require('../helpers/http.cjs');

module.exports = class {

	static messageSender (req, res)
	{
		res.send("This is from a controller!");
	}

	static async backendVersion (req, res)
	{
		const response = await httpGet({
			hostname: process.env.ENVIRONMENT === "development" ? 'backend-service-dev' : 'backend-service',
			port: 8080,
			path: '/api/v1/test/version',
			method: 'GET'
		});

		res.set('Content-Type', 'application/json');
		res.send(response);
	}

};
