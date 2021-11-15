const knex = require('../connection');

function getMachinePrices (machineId) {
	return knex('machine')
		.where({'machine-id': machineId.toString()});
}

function deleteMachinePrice (machineId, pmId) {
	try {
		return knex('machine')
			.update({
				'pm-id': null
			})
			.where({'machine-id': machineId.toString()})
			.andWhere('pm-id', pmId.toString())
			.returning('*');
	} catch {
		return 404;
	}
}

function updateMachinePrice (machineId, pmId, method) {
	let newPmId;
	if (method === 'put') {
		newPmId = pmId.toString();
	} else if (method === 'delete') {
		newPmId = null;
	}
	try {
		return knex('machine')
			.update({
				'pm-id': newPmId.toString()
			})
			.where({'machine-id': machineId.toString()})
			.returning('*');
	} catch {
		return 404;
	}
}


module.exports = {
	getMachinePrices,
	deleteMachinePrice,
	updateMachinePrice
};
