exports.up = (knex, Promise) => {
	return knex.schema.createTable('prices', (table) => {
		table.increments();
		table.string('price_id').notNullable().unique();
		table.string('name');
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('prices');
};

