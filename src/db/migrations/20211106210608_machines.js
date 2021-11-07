exports.up = (knex, Promise) => {
	return knex.schema.createTable('machines', (table) => {
		table.increments();
		table.string('id').notNullable().unique();
		table.string('name').notNullable();
		table.string('pricing_id').notNullable();
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('machines');
};

