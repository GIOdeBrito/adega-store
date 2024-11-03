

async function httpPost (url: string, bodydata: object): Promise<string | Error>
{
	let dataobject = JSON.stringify({ ...bodydata });

	let xmlreq: XMLHttpRequest = new XMLHttpRequest();
	xmlreq.open("POST", url, true);
	xmlreq.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

	return new Promise((resolve, reject) =>
	{
		xmlreq.onload = (res: ProgressEvent) =>
		{
			const request = res.target as XMLHttpRequest;

			resolve(request.responseText);
		};

		xmlreq.onerror = () => reject(new Error("POST failed"));

		xmlreq.send(dataobject);
	});
}

async function httpGet (url: string): Promise<string | object>
{
	let response = await fetch(url);

	try {
		return await response.json();
	}
	catch {
		return await response.text();
	}
}

export {
	httpPost,
	httpGet
}
