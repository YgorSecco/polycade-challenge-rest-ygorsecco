process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/index');
const knex = require('../src/db/connection');

// machine tests
describe('GET /machines/:machineId/prices', () => {
	it('should return all prices for a specific machine, 99ade105-dee1-49eb-8ac4-e4d272f89fba', (done) => {
		chai.request(server)
			.get('/machines/99ade105-dee1-49eb-8ac4-e4d272f89fba/prices')
			.end((err, res) => {
				res.status.should.equal(200);
				res.type.should.equal('application/json');
				res.body.data[0].should.include.keys(
					'pm-id', 'name', 'prices'
				);
				done();
			});
	});
	it('should throw an error if the machine does not exist, test_do_not_exist', (done) => {
		chai.request(server)
			.get('/machines/test_do_not_exist/prices')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
	it('should return the default pricing if the machine has no pricing model configured', (done) => {
		chai.request(server)
			.get('/machines/4111947a-6c58-4977-90fa-2caaaef88648/prices')
			.end((err, res) => {
				res.status.should.equal(200);
				res.type.should.equal('application/json');
				res.body.data[0].should.include.keys(
					'name', 'prices'
				);
				done();
			});
	});
});

describe('DELETE /machines/:machineId/prices/:pmId', () => {
	it('should return the machine with the pricing model unassigned', (done) => {
		knex('machine')
			.select('*')
			.then((machine) => {
				const machineObject = machine.pop();
				const machineId = machineObject['machine-id'];
				const pmId = machineObject['pm-id'];
				chai.request(server)
					.delete(`/machines/${machineId}/prices/${pmId}`)
					.end((err, res) => {
						res.status.should.equal(200);
						res.type.should.equal('application/json');
						res.body.data[0].should.include.keys(
							'id', 'name'
						);
						done();
					});
			});
	});
	it('should throw an error if the machine does not exist', (done) => {
		chai.request(server)
			.delete('/machines/test_do_not_exist/prices/123')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
	it('should throw an error if the pricing model does not exist', (done) => {
		chai.request(server)
			.delete('/machines/4111947a-6c58-4977-90fa-2caaaef88648/prices/999999')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
});

describe('PUT /machines/:machineId/prices/:pmId', () => {
	it('should return the machine that was updated', (done) => {
		knex('pricing-model').select('*').then((pm) => {
			knex('machine')
				.select('*')
				.then((machine) => {
					const pmObject = pm.pop();
					const pmId = pmObject['pm-id'];
					const machineObject = machine.pop();
					const machineId = machineObject['machine-id'];
					chai.request(server)
						.put(`/machines/${machineId}/prices/${pmId}`)
						.send({
							name: pmId
						})
						.end((err, res) => {
							res.status.should.equal(200);
							res.type.should.equal('application/json');
							res.body.data[0].should.include.keys(
								'id', 'pm-id', 'name', 'pm-id'
							);
							done();
						});
				});
		});
	});
	it('should throw an error if the pricing model does not exist', (done) => {
		knex('machine')
			.select('*')
			.then((machine) => {
				const machineObject = machine.pop();
				const machineId = machineObject['machine-id'];
				chai.request(server)
					.put(`/machines/${machineId}/prices/test_do_not_exist`)
					.send({
						name: 'testput123'
					})
					.end((err, res) => {
						res.status.should.equal(404);
						res.type.should.equal('application/json');
						res.body.message.should.eql('Not Found');
						done();
					});
			});
	});
	it('should throw an error if the machine does not exist', (done) => {
		knex('pricing-model').select('*').then((pm) => {
			const pmObject = pm.pop();
			const pmId = pmObject['pm-id'];
			chai.request(server)
				.put(`/machines/test_do_not_exist/prices/${pmId}`)
				.send({
					name: pmId
				})
				.end((err, res) => {
					res.status.should.equal(404);
					res.type.should.equal('application/json');
					res.body.message.should.eql('Not Found');
					done();
				});
		});
	});
});
