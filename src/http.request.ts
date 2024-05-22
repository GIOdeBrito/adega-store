
import https from "https";

export function httpGet (url: string): Promise<any>
{
    return new Promise((resolve, reject) => 
    {
        https.get(url, (res) =>
        {
            let data = String();

            res.on('data', (chunk) =>
            {
                data += chunk;
            });

            res.on('end', () =>
            {
                resolve(data);
            });
        })
        .on('error', (err) => 
        {
            reject(err);
        });
    });
}

export function httpPost (): any
{

}

