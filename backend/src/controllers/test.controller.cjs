
const container = require('../services/container.cjs');

module.exports = class {

	static async databaseQuery (req, res)
	{
		const rows = await container.get('postgresdb').query("SELECT * FROM users");

		res.send(rows.rows);
	}

	static version (req, res)
	{
		res.send({ api: "v1", version: "1.0.0" });
	}

};

