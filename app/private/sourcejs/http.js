
/**
 * Makes a POST request.
 * @param {string} url
 * @param {object} bodydata
 * @param {object} [options] - Additional fetch options
 * @returns {string}
 */
 async function httpPost(url, data, options = {})
 {
	 const json = JSON.stringify({ ...data });

	 const response = await fetch(url, {
		 method: "POST",
		 headers: { "Content-Type": "application/json; charset=UTF-8" },
		 body: json,
		 ...options
	 });

	 return await response.text();
 }

/**
 * Makes a GET request.
 * @param {string} url
 * @param {object} [options] - Fetch options (headers, etc.)
 * @returns {object | string}
 */
async function httpGet (url, options = {})
{
    let response = await fetch(url, options);
    try {
        return await response.json();
    } catch {
        return await response.text();
    }
}

export {
	httpPost,
	httpGet
}
