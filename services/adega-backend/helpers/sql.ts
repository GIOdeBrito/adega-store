
const sqlite3 = require('sqlite3');

/* Returns the first result of the query */
async function queryFirst (query: string, params?: Array<string | number>)
{
	const db = new sqlite3.Database('./database.db');

	return new Promise((resolve, reject) =>
	{
		db.get(query, params, (err: Error | null, row: any) =>
		{
			resolve(row);
		});
	});

	db.close();
}

export {
	queryFirst
}
