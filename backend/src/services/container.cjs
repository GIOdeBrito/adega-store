
const DependencyContainerClass = require('./dependencyContainer.cjs');
const PostgresDB = require('../database/postgres-db.cjs');

const container = new DependencyContainerClass();

container.singleton('postgresdb', () => new PostgresDB({
	host: 'database',
	port: 5432,
	user: process.env.POSTGRES_DB_LOGIN,
	password: process.env.POSTGRES_DB_PASSWD,
	database: process.env.POSTGRES_DB_NAME
}));

module.exports = container;
