exports.up = (knex, Promise) => {
	return knex.schema.createTable('pricing-model', (table) => {
		table.increments();
		table.string('pm-id').notNullable().unique();
		table.string('name');
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('prices');
};

