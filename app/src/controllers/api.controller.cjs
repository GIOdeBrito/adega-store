
const { httpPostJson } = require('../helpers/http.cjs');

module.exports = class {

	static time (req, res)
	{
		res.json({ time: new Date().toISOString() });
	}

	static async login (req, res)
	{
		const response = await httpPostJson({
			method: 'POST',
			hostname: process.env.ENVIRONMENT === "development" ? 'backend-service-dev' : 'backend-service-release',
			port: 8080,
			path: '/api/v1/user/credentials/loginattempt',
		});

		res.json({ time: new Date().toISOString() });
	}

};
