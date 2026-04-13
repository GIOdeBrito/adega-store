
class TestApiModel
{
	#_title;
	#_response;

	constructor (title, response)
	{
		this._title = title;
		this._response = response;
	}

	get title ()
	{
		return this._title;
	}

	get response ()
	{
		return this._response;
	}
}

module.exports = TestApiModel;
