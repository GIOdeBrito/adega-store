
module.exports = class {

	static index (req, res)
	{
		const viewData = {
			title: "Home"
		};

		res.render('index', viewData);
	}

};
