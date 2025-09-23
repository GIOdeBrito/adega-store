
class HomeController
{
	static index (req, res)
	{
		const viewData = {
			title: "Home"
		};

		res.render('index', viewData);
	}
}

module.exports = HomeController;
