import truncate from 'test/truncate';

const chaiHttp = require('chai-http');

const chai = require('chai');

const server = require('../../app');

chai.should();
chai.use(chaiHttp);

const { Airport, Flight, Airline } = require('../../server/models');

describe('Flights controller', () => {
  let airlineData;
  let airportsData;
  beforeEach((done) => {
    Airline.create({ name: 'KLM' }).then((airline) => {
      Airport.bulkCreate([
        { name: 'Copenhagen Airport', code: 'CPH' },
        { name: 'John F. Kennedy International Airport', code: 'JFK' },
      ], { returning: true })
        .then((airports) => {
          airlineData = airline;
          airportsData = airports;
          Flight.bulkCreate([
            {
              airlineIndex: airline.id,
              flightNumber: 'KLM-2345',
              departureDateTime: '2018-10-22T21:37:12.012Z',
              arrivalDateTime: '2018-10-23T21:37:12.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'KLM-2346',
              departureDateTime: '2018-10-29T21:37:12.012Z',
              arrivalDateTime: '2018-10-30T21:37:12.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
          ]).then(() => done());
        });
    });
  });

  afterEach(async () => {
    await truncate();
  });

  it('should list ALL flights on /flights GET', (done) => {
    chai.request(server)
      .get('/api/flights')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('airlineIndex');
        res.body[0].should.have.property('flightNumber');
        res.body[0].should.have.property('departureDateTime');
        res.body[0].should.have.property('arrivalDateTime');
        res.body[0].should.have.property('destinationIndex');
        res.body[0].should.have.property('originIndex');
        res.body[0].should.have.property('updatedAt');
        res.body[0].should.have.property('createdAt');
        res.body[0].flightNumber.should.equal('KLM-2345');
        res.body[1].flightNumber.should.equal('KLM-2346');
        done();
      });
  });

  it('should add a SINGLE airline on /flights POST', (done) => {
    chai.request(server)
      .post('/api/flights')
      .send(
        {
          airlineIndex: airlineData.id,
          flightNumber: 'KLM-2347',
          departureDateTime: '2018-10-22T21:37:12.012Z',
          arrivalDateTime: '2018-10-23T21:37:12.012Z',
          destinationIndex: airportsData[0].id,
          originIndex: airportsData[1].id,
        }
      ).end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('airlineIndex');
        res.body.should.have.property('flightNumber');
        res.body.should.have.property('departureDateTime');
        res.body.should.have.property('arrivalDateTime');
        res.body.should.have.property('destinationIndex');
        res.body.should.have.property('originIndex');
        res.body.should.have.property('updatedAt');
        res.body.should.have.property('createdAt');
        res.body.flightNumber.should.equal('KLM-2347');
        done();
      });
  });
});
