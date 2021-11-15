process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/index');


describe('routes : index', () => {
	it('should return hello world json', (done) => {
		chai.request(server)
			.get('/')
			.end((err, res) => {
				should.not.exist(err);
				res.status.should.equal(200);
				res.type.should.equal('application/json');
				res.body.message.should.equal('hello world');
				done();
			});

	});
});


