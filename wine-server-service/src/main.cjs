
const express = require("express");
const app = express();

// DI register of services
const DependencyContainer = require('./services/dependencyContainer.cjs');
const diContainer = new DependencyContainer();

const PostgresDB = require('./database/postgres-db.cjs');

diContainer.singleton('postgresdb', () => new PostgresDB({
	host: 'database-dev',
	port: 5432,
	user: process.env.POSTGRES_DB_LOGIN,
	password: process.env.POSTGRES_DB_PASSWD,
	database: process.env.POSTGRES_DB_NAME
}));

app.use(express.json());

app.use(function (req, res, next)
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Looks for next route that matches
	next();
});

app.get("/api/v1/db", async function (req, res)
{
	const db = diContainer.get('postgresdb');

	const rows = await db.query("SELECT * FROM users");

	res.send(rows.rows);
});

app.get("/api/v1/version", function (req, res)
{
	res.send({ api: "v1", version: "1.0.0" });
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
