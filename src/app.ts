
/*
@Author: Giordano de Brito
@Description: The main store-express application source.
*/

import express, { Express, Response, Request } from "express";
import path from "path";

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));

app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use('/src', express.static(path.join(__dirname, '../dist/frontend')));

import viewsRouter from "./views.pages";
import staticRouter from "./static.pages";

app.use(viewsRouter);
app.use(staticRouter);

const PORT: number = 8080;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

