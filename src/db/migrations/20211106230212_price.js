exports.up = (knex, Promise) => {
	return knex.schema.createTable('price', (table) => {
		table.increments();
		table.string('price-id').notNullable();
		table.string('price').notNullable();
		table.string('name').notNullable();
		table.string('value').notNullable();
		table.string('pm-id').notNullable().references('pm-id').inTable('pricing-model');
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('pricing');
};

