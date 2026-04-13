
const express = require("express");
const app = express();
const container = require('./services/container.cjs');

app.use((req, res, next) => {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(express.json());

const v1Routes = require('./routes/index-v1.cjs');
app.use('/api/v1', v1Routes);

process.on('SIGTERM', async () => {

	await container.get('postgresdb').dispose();
	process.exit(0);
});

process.on('SIGINT', async () => {

	await container.get('postgresdb').dispose();
	process.exit(0);
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
