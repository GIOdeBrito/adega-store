

import { queryFirst } from "./sql";

async function authUser (hash: string): Promise<boolean>
{
	let params = [
		hash
	];

	let row = await queryFirst("SELECT * FROM USERS WHERE UPWD = ?", params);

	console.log(row);


	if(typeof row === "object")
	{
		return true;
	}

	return false;
}

export {
	authUser
}
