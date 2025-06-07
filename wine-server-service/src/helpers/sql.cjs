
const sqlite3 = require('sqlite3');

/* Returns the first result of the query */
async function queryFirst (query, params = [])
{
	const db = new sqlite3.Database('./database.db');

	return new Promise((resolve, reject) =>
	{
		db.get(query, params, (err, row) =>
		{
			resolve(row);
		});
	});

	db.close();
}

module.exports = {
	queryFirst
};
