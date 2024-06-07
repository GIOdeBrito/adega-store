
class TestApiModel
{
	private _title: string;
	private _response: string;

	constructor (title: string, response: string)
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

export default TestApiModel;
