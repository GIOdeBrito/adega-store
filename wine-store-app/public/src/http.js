
/**
* Makes a POST request.
* @param {string} url
* @param {object} bodydata
* @returns {string}
*/
async function httpPost (url, bodydata)
{
	let dataobject = JSON.stringify({ ...bodydata });

	let xmlreq = new XMLHttpRequest();
	xmlreq.open("POST", url, true);
	xmlreq.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	return new Promise((resolve, reject) =>
	{
		xmlreq.onload = (res) =>
		{
			const request = res.target;

			resolve(request.responseText);
		};

		xmlreq.onerror = () => reject(new Error("POST failed"));

		xmlreq.send(dataobject);
	});
}

/**
* Makes a GET request.
* @param url
* @returns {object | string}
*/
async function httpGet (url)
{
	let response = await fetch(url);

	try
	{
		return await response.json();
	}
	catch
	{
		return await response.text();
	}
}

export {
	httpPost,
	httpGet
}
