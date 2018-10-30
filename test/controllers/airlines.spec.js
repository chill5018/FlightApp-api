const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Airlines controller', function() {
    it('should list ALL airlines on /airlines GET', function(done) {
        chai.request(server)
            .get('/api/airlines')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should add a SINGLE airline on /airlines POST', function(done) {
        chai.request(server)
            .post('/api/airlines')
            .send({ 'name': 'Air Canada' })
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('updatedAt');
                res.body.should.have.property('createdAt');
                res.body.name.should.equal('Air Canada');
                done();
            });
    });
});