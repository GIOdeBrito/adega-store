
/* Test microsservice */

const express = require("express");
const app = express();

app.get("/api/v1/test", function(req, res)
{
    res.send({ api: "v1", appdir: __dirname, time: new Date().toString() });
});

app.get("/api/v1/message", function(req, res)
{
    res.send({ message: "This comes from a microsservice" });
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Test service is listening on port ${PORT}`));
