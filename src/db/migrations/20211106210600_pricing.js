exports.up = (knex, Promise) => {
	return knex.schema.createTable('pricing', (table) => {
		table.increments();
		table.string('pm_id').notNullable().unique();
		table.string('price').notNullable();
		table.string('name').notNullable();
		table.string('value').notNullable();
		table.string('pricing_id').notNullable();
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('pricing');
};

