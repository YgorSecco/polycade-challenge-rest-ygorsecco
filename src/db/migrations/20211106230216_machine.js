exports.up = (knex, Promise) => {
	return knex.schema.createTable('machine', (table) => {
		table.increments();
		table.string('machine-id').notNullable().unique();
		table.string('name').notNullable();
		table.string('pm-id').references('pm-id').inTable('pricing-model');

	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('machine');
};

