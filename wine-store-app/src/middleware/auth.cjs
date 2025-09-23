
module.exports = (req, res, next) =>
{
	console.log("Auth completed!!");

	next();
};
