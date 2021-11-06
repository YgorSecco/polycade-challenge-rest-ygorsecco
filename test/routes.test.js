process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../src/index');

describe('routes : index', () => {
	it('should return hello world json', (done) => {
		chai.request(server).get('/').end((err, res) => {
			should.not.exist(err);
			res.status.should.eql(200);
			res.type.should.eql('application/json');
			res.body.status.should.equal('success');
			res.body.message.should.eql('hello world');
			done();
		});

	});
});


