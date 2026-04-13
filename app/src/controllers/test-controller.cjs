
const { httpGet } = require('../helpers/http.cjs');

class TestController
{
	static messageSender (req, res)
	{
		res.send("This is from a controller!");
	}

	static async backendVersion (req, res)
	{
		const options =
		{
			hostname: 'adega-backend-main',
			port: 8080,
			path: '/api/v1/version',
			method: 'GET'
		};

		try
		{
			let respRaw = await httpGet(options);
			res.send(respRaw);
		}
		catch(ex)
		{
			res.send(ex.Message);
			console.log(ex);
		}
	}
}

module.exports = TestController;
