
/*
@Author: Giordano de Brito
@Description: The main store-express application source.
*/

const express = require("express");
const path = require("path");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));

app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use('/src', express.static(path.join(__dirname, '../public/src')));

const viewsRouter = require("./views.pages.cjs");
const staticRouter = require("./static.pages.cjs");

app.use(viewsRouter);
app.use(staticRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

