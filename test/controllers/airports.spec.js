const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../app');

const should = chai.should();
const { Airport } = require('../../server/models');

chai.use(chaiHttp);

describe('Airports controller', () => {
  beforeEach((done) => {
    Airport.bulkCreate([
      { name: 'Copenhagen Airport', code: 'CPH' },
      { name: 'John F. Kennedy International Airport', code: 'JFK' },
    ]).then(() => done());
  });

  afterEach((done) => {
    // We need `where {}` if we want to
    // remove all the records from the DB
    Airport.destroy({ where: {}, force: true, cascade: true }).then(done());
  });

  it('should list ALL airports on /airports GET', (done) => {
    chai.request(server)
      .get('/api/airports')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('code');
        res.body[0].should.have.property('updatedAt');
        res.body[0].should.have.property('createdAt');
        res.body[0].name.should.equal('Copenhagen Airport');
        res.body[0].code.should.equal('CPH');
        res.body[1].name.should.equal('John F. Kennedy International Airport');
        res.body[1].code.should.equal('JFK');
        done();
      });
  });

  it('should add a SINGLE airport on /airports POST', (done) => {
    chai.request(server)
      .post('/api/airports')
      .send({ name: 'Toronto Pearson International Airport', code: 'YYZ' })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('code');
        res.body.should.have.property('updatedAt');
        res.body.should.have.property('createdAt');
        res.body.name.should.equal('Toronto Pearson International Airport');
        res.body.code.should.equal('YYZ');
        done();
      });
  });
});
