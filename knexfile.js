// Update with your config settings.

const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
	test: {
		client: 'pg',
		connection: 'postgres://postgres:010203@localhost:5432/polycade_rest_test',
		migrations: {
			directory: path.join(BASE_PATH, 'migrations')
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds')
		}
	},
	development: {
		client: 'pg',
		connection: 'postgres://postgres:010203@localhost:5432/polycade_rest',
		migrations: {
			directory: path.join(BASE_PATH, 'migrations')
		},
		seeds: {
			directory: path.join(BASE_PATH, 'seeds')
		}
	}
};
