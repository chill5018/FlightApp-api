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
    Airline.create({ name: 'SAS' }).then((airline) => {
      Airport.bulkCreate([
        { name: 'Copenhagen Airport Kastrup', code: 'CPH' },
        { name: 'John F. Kennedy International Airport', code: 'JFK' },
      ], { returning: true })
        .then((airports) => {
          airlineData = airline;
          airportsData = airports;
          Flight.bulkCreate([
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2345',
              departureDateTime: '2018-12-01T06:11:11.012Z',
              arrivalDateTime: '2018-12-01T18:11:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2346',
              departureDateTime: '2018-12-01T08:11:11.012Z',
              arrivalDateTime: '2018-12-01T20:11:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2348',
              departureDateTime: '2018-12-01T12:11:11.012Z',
              arrivalDateTime: '2018-12-01T23:59:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2347',
              departureDateTime: '2018-12-01T10:11:11.012Z',
              arrivalDateTime: '2018-12-01T22:11:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2351',
              departureDateTime: '2018-12-24T06:11:11.012Z',
              arrivalDateTime: '2018-12-24T18:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2352',
              departureDateTime: '2018-12-24T08:11:11.012Z',
              arrivalDateTime: '2018-12-24T20:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2353',
              departureDateTime: '2018-12-24T10:11:11.012Z',
              arrivalDateTime: '2018-12-24T22:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2354',
              departureDateTime: '2018-12-24T12:11:11.012Z',
              arrivalDateTime: '2018-12-24T23:59:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2355',
              departureDateTime: '2018-12-25T12:11:11.012Z',
              arrivalDateTime: '2018-12-25T23:59:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2356',
              departureDateTime: '2018-12-25T10:11:11.012Z',
              arrivalDateTime: '2018-12-25T22:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2357',
              departureDateTime: '2018-12-06T10:11:11.012Z',
              arrivalDateTime: '2018-12-06T22:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2358',
              departureDateTime: '2018-12-08T09:11:11.012Z',
              arrivalDateTime: '2018-12-08T20:00:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2358',
              departureDateTime: '2018-12-08T09:11:11.012Z',
              arrivalDateTime: '2018-12-08T20:00:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2358',
              departureDateTime: '2018-12-08T09:11:11.012Z',
              arrivalDateTime: '2018-12-08T20:00:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id
            },
          ], { returning: true }).then(() => done());
        });
    });
  });

  afterEach(async () => {
    await truncate();
  });

  it('should list ALL flights on /flights GET when there as no query params', (done) => {
    chai.request(server)
      .get('/api/flights')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(14);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('airlineIndex');
        res.body[0].should.have.property('flightNumber');
        res.body[0].should.have.property('departureDateTime');
        res.body[0].should.have.property('arrivalDateTime');
        res.body[0].should.have.property('destinationIndex');
        res.body[0].should.have.property('originIndex');
        res.body[0].should.have.property('updatedAt');
        res.body[0].should.have.property('createdAt');
        res.body[0].flightNumber.should.equal('SAS-2345');
        res.body[1].flightNumber.should.equal('SAS-2346');
        done();
      });
  });

  it('should list flights on /flights GET that match query params', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&arrivalCity=JFK&departureDate=2018-12-01&returnDate=2018-12-24')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(16);
        res.body[0].should.have.property('departureFlight');
        res.body[0].should.have.property('returnFlight');
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
