
/**
@fileoverview Main application entrypoint.

@author Giordano de Brito
@version 1.0.0
@date 2025-09-23
@description: This script is responsible for loading and setting up the entire application.
*/

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();

// Set view engine and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Set static folders
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use('/src', express.static(path.join(__dirname, '../public/src')));
app.use('/style', express.static(path.join(__dirname, '../public/style')));
app.use(expressLayouts);
app.set('layout', 'layout/page');

const pagesRouter = require("./routes/page-routes.cjs");
const testRouter = require("./routes/test-routes.cjs");

app.use(pagesRouter);
app.use(testRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

