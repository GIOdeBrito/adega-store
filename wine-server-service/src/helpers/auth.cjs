

const { queryFirst } = require("./sql.cjs");

async function authUser (hash)
{
	let params = [
		hash
	];

	let row = await queryFirst("SELECT * FROM USERS WHERE UPWD = ?", params);

	if(typeof row === "object")
	{
		return true;
	}

	return false;
}

module.exports = authUser;
