
import https from "https";

export function httpGet (url: string): Promise<any>
{
	/*return new Promise((resolve, reject) =>
    {
        https.get(url, res =>
        {
            let data: Buffer[] = [];

            res.on('data', chunk =>
            {
                data.push(chunk);
            });

            res.on('end', () =>
            {
                resolve(Buffer.concat(data).toString());
            });

			res.on('error', err =>
			{
				reject(err.message)
			});
        })
        .on('error', (err) =>
        {
            reject(err.message);
        });
    });*/

	return new Promise((resolve, reject) =>
    {
		let result: string = '';

		const req = https.request(url, (res) =>
		{
		    console.log(res.statusCode);

		    res.setEncoding('utf8');
		    res.on('data', (chunk) =>
			{
		        result += chunk;
		    });

		    res.on('end', () =>
			{
		        resolve(result);
		    });
		});

		req.on('error', (err) =>
		{
		    reject(err.message);
		});

		req.end();
	});
}

export function httpPost (): string
{
	return "tome";
}

