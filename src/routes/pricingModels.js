const Router = require('koa-router');
const queries = require('../db/queries/pricingModels');

const router = new Router();
const BASE_URL = '/pricing-models';

router.get(BASE_URL, async (ctx) => {
	try {
		const pm = await queries.getAllPricingModels();
		ctx.body = {
			data: pm
		};
	} catch (err) {
		console.log(err);
	}
});

router.get(BASE_URL + '/:pmId', async (ctx) => {
	try {
		const pm = await queries.getSinglePricingModel(ctx.params.pmId);
		const price = await queries.getPrices(ctx.params.pmId);
		// assign prices to data return
		if (pm.length) {
			if (price.length) {
				pm[0]['prices'] = price;
			} else {
				const default_price = await queries.getPrices('default_pricing');
				pm[0]['prices'] = default_price;
			}
			ctx.body = {
				data: pm
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

router.post(BASE_URL, async (ctx) => {
	try {
		const pm = await queries.addPricingModel(ctx.request.body);
		console.log(pm);
		if (pm.length) {
			ctx.status = 201;
			ctx.body = {
				data: pm
			};
		} else {
			ctx.status = 400;
			ctx.body = {
				message: 'Something went wrong. Could not add the pricing model.'
			};
		}
	} catch (err) {
		ctx.status = 400;
		ctx.body = {
			message: err.message || 'Sorry, an error has occurred.'
		};
	}
});

router.put(BASE_URL + '/:pmId', async (ctx) => {
	try {
		const pm = await queries.updatePricingModel(ctx.params.pmId, ctx.request.body);
		if (pm.length) {
			ctx.status = 200;
			ctx.body = {
				data: pm
			};
		} else {
			ctx.status = 404;
			ctx.body = {
				message: 'That pricing model does not exist.'
			};
		}
	} catch (err) {
		ctx.status = 400;
		ctx.body = {
			message: err.message || 'Sorry, an error has occurred.'
		};
	}
});

router.delete(BASE_URL + '/:pmId', async (ctx) => {
	try {
		const pm = await queries.deletePricingModel(ctx.params.pmId);
		if (pm.length) {
			ctx.body = {
				data: pm
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

router.get(BASE_URL + '/:pmId/prices', async (ctx) => {
	try {
		const pm = await queries.getPrices(ctx.params.pmId);
		if (pm.length) {
			ctx.body = {
				data: pm
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

router.post(BASE_URL + '/:pmId/prices', async (ctx) => {
	try {
		const price = await queries.addPrice(ctx.params.pmId, ctx.request.body);
		if (price.length) {
			ctx.status = 201;
			ctx.body = {
				data: price
			};
		} else {
			throw new Error('404');
		}
	} catch (err) {
		console.log(err);
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

router.delete(BASE_URL + '/:pmId/prices/:priceId', async (ctx) => {
	try {
		const price = await queries.deletePrice(ctx.params.pmId, ctx.params.priceId);
		if (price.length) {
			ctx.body = {
				data: price
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
