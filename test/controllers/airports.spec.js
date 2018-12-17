import truncate from 'test/truncate';

const chaiHttp = require('chai-http');

const chai = require('chai');

const server = require('../../app');

chai.should();
chai.use(chaiHttp);

const { Airport } = require('../../server/models');

describe('Airports controller', () => {
  beforeEach(async () => {
    await truncate();

    await Airport.bulkCreate([
      { name: 'Copenhagen Airport', code: 'CPH' },
      { name: 'John F. Kennedy International Airport', code: 'JFK' },
    ], { returning: true });
  });

  afterEach(async () => {
    await truncate();
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

  it('should return 400 on /airport POST if the code is not defined', (done) => {
    chai.request(server)
      .post('/api/airports')
      .send({ name: 'Toronto Pearson International Airport' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('errors');
        res.body.errors[0].message.should.equal('Airport.code cannot be null');
        done();
      });
  });
});
