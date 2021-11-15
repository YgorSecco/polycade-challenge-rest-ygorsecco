const Router = require('koa-router');
const pmQueries = require('../db/queries/pricingModels');
const queries = require('../db/queries/machines');
const {handleError} = require('pg/lib/native/query');

const router = new Router();
const BASE_URL = '/machines';

router.get(BASE_URL + '/:machineId/prices', async (ctx) => {
	try {
		const machine = await queries.getMachinePrices(ctx.params.machineId);
		const getDefaultPricing = await pmQueries.getPrices('default_pricing');
		// assign prices to data return
		if (machine.length) {
			let pmId = machine[0]['pm-id'];
			if (pmId) {
				const price = await pmQueries.getPrices(pmId);
				if (price.length) {
					machine[0]['prices'] = price;
				} else {
					machine[0]['prices'] = getDefaultPricing;
				}
			} else {
				machine[0]['prices'] = getDefaultPricing;
			}
			ctx.body = {
				data: machine
			};
		} else {
			ctx.status = 404;
			ctx.body = {
				message: 'Not Found'
			};
		}

	} catch (err) {
		ctx.status = 400;
		ctx.body = {
			message: err.message || 'Sorry, an error has occurred.'
		};
	}
});

router.delete(BASE_URL + '/:machineId/prices/:pmId', async (ctx) => {
	try {
		const machine = await queries.deleteMachinePrice(ctx.params.machineId, ctx.params.pmId, 'delete');
		console.log(machine);
		if (machine.length) {
			ctx.body = {
				data: machine
			};
		} else {
			throw new Error('404');
		}
	} catch (err) {
		console.log(err.message);
		if (err.message === '404') {
			ctx.status = 404;
			ctx.body = {
				message: 'Not Found'
			};
		} else {
			ctx.status = 400;
			ctx.body = {
				message: err.message || 'Sorry, an error has occurred.'
			};
		}
	}
});

router.put(BASE_URL + '/:machineId/prices/:pmId', async (ctx) => {
	try {
		const machine = await queries.updateMachinePrice(ctx.params.machineId, ctx.params.pmId, 'put');
		if (machine.length) {
			ctx.body = {
				data: machine
			};
		} else {
			throw new Error('404');
		}
	} catch (err) {
		if (err.message === '404' || err.code === '23503') {
			ctx.status = 404;
			ctx.body = {
				message: 'Not Found'
			};
		} else {
			ctx.status = 400;
			ctx.body = {
				message: err.message || 'Sorry, an error has occurred.'
			};
		}
	}
});

module.exports = router;
