const knex = require('../connection');


function getAllPricingModels () {
	return knex('pricing-model')
		.select('*');
}

function getSinglePricingModel (pmid) {
	return knex('pricing-model')
		.where({'pm-id': pmid.toString()});
}

function addPricingModel (pm) {
	return knex('pricing-model')
		.insert(pm)
		.returning('*');
}

function updatePricingModel (pmid, pm) {
	return knex('pricing-model')
		.update(pm)
		.where({'pm-id': pmid.toString()})
		.returning('*');
}

function deletePricingModel (pmid) {
	try {
		return knex('pricing-model')
			.del()
			.where({'pm-id': pmid.toString()})
			.returning('*');
	} catch {
		return 404;
	}
}

function addPrice (pmid, price) {
	try {
		price['pm-id'] = pmid.toString();
		return knex('price')
			.insert(price)
			.returning('*');
	} catch {
		return 404;
	}
}

function getPrices (pmid) {
	return knex('price')
		.select('*')
		.where({'pm-id': pmid.toString()});
}

function deletePrice (pmid, priceid) {
	try {
		return knex('price')
			.del()
			.where({'pm-id': pmid.toString()})
			.andWhere({id: parseInt(priceid)})
			.returning('*');
	} catch {
		return 404;
	}
}


module.exports = {
	getAllPricingModels,
	getSinglePricingModel,
	addPricingModel,
	updatePricingModel,
	deletePricingModel,
	getPrices,
	deletePrice,
	addPrice
};
