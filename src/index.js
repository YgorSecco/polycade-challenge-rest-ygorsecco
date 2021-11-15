import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

// routes
const indexRoutes = require('./routes/index');
const pmRoutes = require('./routes/pricingModels');
const machineRoutes = require('./routes/machines');

const app = new Koa();
const PORT = process.env.PORT || 8013;
const router = new Router();

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(pmRoutes.routes());
app.use(machineRoutes.routes());


const server =
	app.listen(PORT, () =>
		console.log(`Server listening on port ${PORT}`)
	);


module.exports = server;
