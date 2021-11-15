process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/index');
const knex = require('../src/db/connection');


// pricing model tests
describe('GET /pricing-models', () => {
	it('should return all pricing models', (done) => {
		chai.request(server)
			.get('/pricing-models')
			.end((err, res) => {
				res.status.should.equal(200);
				res.type.should.equal('application/json');
				res.body.data[0].should.include.keys(
					'id', 'pm-id', 'name'
				);
				done();
			});
	});
});

describe('GET /pricing-models/:pmId', () => {
	it('should respond with a single pricing model, default_pricing', (done) => {
		chai.request(server)
			.get('/pricing-models/default_pricing')
			.end((err, res) => {
				res.status.should.equal(200);
				res.type.should.equal('application/json');
				res.body.data[0].should.include.keys(
					'id', 'pm-id', 'name', 'prices'
				);
				done();
			});
	});
	it('should throw an error if the pricing_model does not exist, test_do_not_exist', (done) => {
		chai.request(server)
			.get('/pricing-models/test_do_not_exist')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
});

describe('POST /pricing-models', () => {
	it('should return the pricing model that was added', (done) => {
		chai.request(server)
			.post('/pricing-models/')
			.send({
				'pm-id': 'testpost123',
				name: 'testpost123'
			})
			.end((err, res) => {
				res.status.should.equal(201);
				res.type.should.equal('application/json');
				res.body.data[0].should.include.keys(
					'pm-id'
				);
				done();
			});
	});
	it('should throw an error if the payload is malformed', (done) => {
		chai.request(server)
			.post('/pricing-models/')
			.send({
				name: 'test123'
			})
			.end((err, res) => {
				res.status.should.equal(400);
				res.type.should.equal('application/json');
				should.exist(res.body.message);
				done();
			});
	});
});


describe('PUT /pricing-models', () => {
	it('should return the pricing model that was updated', (done) => {
		knex('pricing-model')
			.select('*')
			.then((pm) => {
				const pmObject = pm.pop();
				const pmId = pmObject['pm-id'];
				chai.request(server)
					.put(`/pricing-models/${pmId}`)
					.send({
						name: 'testput123'
					})
					.end((err, res) => {
						res.status.should.equal(200);
						res.type.should.equal('application/json');
						res.body.data[0].should.include.keys(
							'id', 'pm-id', 'name'
						);
						done();
					});
			});
	});
	it('should throw an error if the pricing model does not exist', (done) => {
		chai.request(server)
			.put('/pricing-models/test_do_not_exist')
			.send({
				name: 'testput123'
			})
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('That pricing model does not exist.');
				done();
			});
	});
});

describe('DELETE /pricing-models/:pmId', () => {
	it('should return the pricing model that was deleted', (done) => {
		knex('pricing-model')
			.select('*')
			.then((pm) => {
				const pmObject = pm.pop();
				const pmId = pmObject['pm-id'];
				chai.request(server)
					.delete(`/pricing-models/${pmId}`)
					.end((err, res) => {
						res.status.should.equal(200);
						res.type.should.equal('application/json');
						res.body.data[0].should.include.keys(
							'id', 'pm-id', 'name'
						);
						done();
					});
			});
	});
	it('should throw an error if the pricing model does not exist', (done) => {
		chai.request(server)
			.delete('/pricing-models/test_do_not_exist')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
});

// price tests
describe('GET /pricing-models/:pm-id/prices', () => {
	it('should return all prices for a specific pricing model, default_pricing', (done) => {
		chai.request(server)
			.get('/pricing-models/default_pricing/prices')
			.end((err, res) => {
				res.status.should.equal(200);
				res.type.should.equal('application/json');
				res.body.data[0].should.include.keys(
					'id', 'price', 'name', 'value', 'pm-id'
				);
				done();
			});
	});
	it('should throw an error if the pricing_model does not exist, test_do_not_exist', (done) => {
		chai.request(server)
			.get('/pricing-models/test_do_not_exist/prices')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
});

describe('POST /pricing-models/:pm-id/prices', () => {
	it('should return the price that was added', (done) => {
		chai.request(server)
			.post(`/pricing-models/default_pricing/prices/`)
			.send({
				price: 1337,
				name: 'test123',
				value: 1337,
			})
			.end((err, res) => {
				res.status.should.equal(201);
				res.type.should.equal('application/json');
				res.body.data[0].should.include.keys(
					'id', 'price', 'name', 'value', 'pm-id'
				);
				done();
			});
	});
	it('should throw an error if the payload is malformed', (done) => {
		chai.request(server)
			.post('/pricing-models/default_pricing/prices/')
			.send({
				name: 'test123'
			})
			.end((err, res) => {
				res.status.should.equal(400);
				res.type.should.equal('application/json');
				should.exist(res.body.message);
				done();
			});
	});
	it('should throw an error if the pricing_model does not exist, test_do_not_exist', (done) => {
		chai.request(server)
			.post('/pricing-models/test_do_not_exist/prices')
			.send({
				price: 1337,
				name: 'test123',
				value: 1337,
			})
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
});

describe('DELETE /pricing-models/:pmId/prices/:price-id', () => {
	it('should return the price that was deleted', (done) => {
		knex('price')
			.select('*')
			.then((price) => {
				const priceObject = price.pop();
				const pmId = priceObject['pm-id'];
				const priceId = priceObject['id'];
				chai.request(server)
					.delete( `/pricing-models/${pmId}/prices/${priceId}`)
					.end((err, res) => {
						res.status.should.equal(200);
						res.type.should.equal('application/json');
						res.body.data[0].should.include.keys(
							'id', 'price', 'name', 'value', 'pm-id'
						);
						done();
					});
			});
	});
	it('should throw an error if the pricing_model does not exist, test_do_not_exist', (done) => {
		chai.request(server)
			.delete('/pricing-models/test_do_not_exist/prices/123')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
	it('should throw an error if the price does not exist, 999999', (done) => {
		chai.request(server)
			.delete('/pricing-models/default_pricing/prices/999999')
			.end((err, res) => {
				res.status.should.equal(404);
				res.type.should.equal('application/json');
				res.body.message.should.eql('Not Found');
				done();
			});
	});
});

