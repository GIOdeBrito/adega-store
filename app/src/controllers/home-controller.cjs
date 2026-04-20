
module.exports = class {

	static index (req, res)
	{
		res.render('index', {
			title: "Home"
		});
	}

	static about (req, res)
	{
		res.render('about', {
			title: "About"
		});
	}

	static store (req, res)
	{
		res.render('store', {
			title: "Store"
		});
	}
};
