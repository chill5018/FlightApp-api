import truncate from 'test/truncate';

const chaiHttp = require('chai-http');

const chai = require('chai');

const server = require('../../app');

chai.should();
chai.use(chaiHttp);

const { Airline } = require('../../server/models');

describe('Airlines controller', () => {
  beforeEach(async () => {
    await truncate();

    await Airline.bulkCreate([
      { name: 'Air France' },
      { name: 'Air Canada' },
    ], { returning: true });
  });

  afterEach(async () => {
    await truncate();
  });

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

  it('should return 400 on /airlines POST if the name is not defined', (done) => {
    chai.request(server)
      .post('/api/airlines')
      .send({ })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('errors');
        res.body.errors[0].message.should.equal('Airline.name cannot be null');
        done();
      });
  });
});
