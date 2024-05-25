
/*
@Author: Giordano de Brito
@Description: The main store-express application source.
*/

import express, { Express, Response, Request } from "express";
import path from "path";

const app: Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

import viewsRouter from "./views.pages";
import staticRouter from "./static.pages";

app.use(viewsRouter);
app.use(staticRouter);

const PORT: number = 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

