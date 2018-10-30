const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../app');

const should = chai.should();
const { Airline } = require('../../server/models');

chai.use(chaiHttp);

beforeEach((done) => {
  Airline.bulkCreate([
    { name: 'Air France' },
    { name: 'Air Canada' },
  ]).then(() => done());
});

afterEach((done) => {
  // We need `where {}` if we want to
  // remove all the records from the DB
  Airline.destroy({ where: {}, force: true }).then(done());
});

describe('Airlines controller', () => {
  it('should list ALL airlines on /airlines GET', (done) => {
    chai.request(server)
      .get('/api/airlines')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('updatedAt');
        res.body[0].should.have.property('createdAt');
        res.body[0].name.should.equal('Air France');
        res.body[1].name.should.equal('Air Canada');
        done();
      });
  });

  it('should add a SINGLE airline on /airlines POST', (done) => {
    chai.request(server)
      .post('/api/airlines')
      .send({ name: 'Wizz Air' })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('updatedAt');
        res.body.should.have.property('createdAt');
        res.body.name.should.equal('Wizz Air');
        done();
      });
  });
});
