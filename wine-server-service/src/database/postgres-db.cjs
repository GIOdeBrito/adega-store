const { Pool } = require('pg');

class PostgresDB
{
	constructor ({ host, port, user, password, database, ssl = false }) {
		this.pool = new Pool({
			host,
			port: Number(port),
			user,
			password,
			database,
			ssl: ssl === true ? { rejectUnauthorized: false } : false,
			max: 20,
			idleTimeoutMillis: 30000,
			connectionTimeoutMillis: 2000
		});

		this.pool.on('error', (err) => {
			console.error('Unexpected error on idle client', err);
		});
	}

	async query (text, params = [])
	{
		const client = await this.pool.connect();
		try {
			const res = await client.query(text, params);
			return res;
		} finally {
			client.release();
		}
	}

	async begin ()
	{
		const client = await this.pool.connect();
		await client.query('BEGIN');
		return client;
	}

	async commit (client)
	{
		await client.query('COMMIT');
		client.release();
	}

	async rollback (client)
	{
		await client.query('ROLLBACK');
		client.release();
	}

	async exec (text, params = [])
	{
		const client = await this.begin();
		try {
			const res = await client.query(text, params);
			await this.commit(client);
			return res;
		} catch (err) {
			await this.rollback(client);
			throw err;
		}
	}

	async dispose() {
		await this.pool.end();
	}
}

module.exports = PostgresDB;

