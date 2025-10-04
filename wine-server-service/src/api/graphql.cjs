
const { Router } = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = `
	type Query {
		hello: String
	}
`;

const root = {
	hello: () => "Hello Word"
};



module.exports = router;
