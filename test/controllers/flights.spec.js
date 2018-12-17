import truncate from 'test/truncate';

const chaiHttp = require('chai-http');

const chai = require('chai');

const server = require('../../app');

const should = chai.should();
chai.use(chaiHttp);

const { Airport, Flight, Airline } = require('../../server/models');

describe('Flights controller', () => {
  let airlineData;
  let airportsData;
  let newFlightId;

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
              originIndex: airports[0].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2346',
              departureDateTime: '2018-12-01T08:11:11.012Z',
              arrivalDateTime: '2018-12-01T20:11:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2348',
              departureDateTime: '2018-12-01T12:11:11.012Z',
              arrivalDateTime: '2018-12-01T23:59:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2347',
              departureDateTime: '2018-12-01T10:11:11.012Z',
              arrivalDateTime: '2018-12-01T22:11:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2351',
              departureDateTime: '2018-12-24T06:11:11.012Z',
              arrivalDateTime: '2018-12-24T18:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2352',
              departureDateTime: '2018-12-24T08:11:11.012Z',
              arrivalDateTime: '2018-12-24T20:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2353',
              departureDateTime: '2018-12-24T10:11:11.012Z',
              arrivalDateTime: '2018-12-24T22:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2354',
              departureDateTime: '2018-12-24T12:11:11.012Z',
              arrivalDateTime: '2018-12-24T23:59:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2355',
              departureDateTime: '2018-12-25T12:11:11.012Z',
              arrivalDateTime: '2018-12-25T23:59:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2356',
              departureDateTime: '2018-12-25T10:11:11.012Z',
              arrivalDateTime: '2018-12-25T22:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2357',
              departureDateTime: '2018-12-06T10:11:11.012Z',
              arrivalDateTime: '2018-12-06T22:00:11.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2358',
              departureDateTime: '2018-12-08T09:11:11.012Z',
              arrivalDateTime: '2018-12-08T20:00:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2358',
              departureDateTime: '2018-12-08T09:11:11.012Z',
              arrivalDateTime: '2018-12-08T20:00:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'SAS-2358',
              departureDateTime: '2018-12-08T09:11:11.012Z',
              arrivalDateTime: '2018-12-08T20:00:11.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id,
            },
          ], { returning: true }).then((flights) => {
            newFlightId = flights[0].id;
            done();
          });
        });
    });
  });

  afterEach(async () => {
    await truncate();
  });

  it('should return `Invalid request` on /flights GET when there are no query params', (done) => {
    chai.request(server)
      .get('/api/flights')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('Invalid request');
        done();
      });
  });

  it('should return `Invalid request` on /flights GET when `departureCity` is missing from query params', (done) => {
    chai.request(server)
      .get('/api/flights?departureDate=2018-12-01&returnDate=2018-12-24')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('Invalid request');
        done();
      });
  });

  it('should return `Invalid request` on /flights GET when `departureDate` is missing from query params', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&returnDate=2018-12-24')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('Invalid request');
        done();
      });
  });

  it('should return `Invalid request` on /flights GET when `returnDate` is missing from query params', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&departureDate=2018-12-01')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('Invalid request');
        done();
      });
  });

  it('should list only `departureFlight` on /flights GET when returnDate is missing', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&arrivalCity=JFK&departureDate=2018-12-01')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        res.body[0].should.have.property('departureFlight');
        res.body[0].departureFlight.should.not.equal(null);
        res.body[0].should.have.property('returnFlight');
        should.equal(res.body[0].returnFlight, null);
        done();
      });
  });

  it('should list both `departure` and `return` flights on /flights GET when having all needed query params', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&arrivalCity=JFK&departureDate=2018-12-01&returnDate=2018-12-24')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(16);
        res.body[0].should.have.property('departureFlight');
        res.body[0].should.have.property('returnFlight');
        res.body[0].departureFlight.should.not.equal(null);
        res.body[0].returnFlight.should.not.equal(null);
        done();
      });
  });

  it('should have the right data format on /flights GET', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&arrivalCity=JFK&departureDate=2018-12-01&returnDate=2018-12-24')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(16);

        const [firstResult] = res.body;

        firstResult.should.have.property('departureFlight');
        firstResult.should.have.property('returnFlight');
        firstResult.departureFlight.should.be.a('object');
        firstResult.returnFlight.should.be.a('object');

        const { departureFlight, returnFlight } = firstResult;

        departureFlight.should.have.property('id');
        departureFlight.should.have.property('flightNumber');
        departureFlight.should.have.property('departureDateTime');
        departureFlight.should.have.property('arrivalDateTime');
        departureFlight.should.have.property('createdAt');
        departureFlight.should.have.property('updatedAt');
        departureFlight.should.have.property('airline');
        departureFlight.should.have.property('destination');
        departureFlight.should.have.property('origin');

        returnFlight.should.have.property('id');
        returnFlight.should.have.property('flightNumber');
        returnFlight.should.have.property('departureDateTime');
        returnFlight.should.have.property('arrivalDateTime');
        returnFlight.should.have.property('createdAt');
        returnFlight.should.have.property('updatedAt');
        returnFlight.should.have.property('airline');
        returnFlight.should.have.property('destination');
        returnFlight.should.have.property('origin');
        done();
      });
  });

  it('should have the right data format for included models on /flights GET', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&arrivalCity=JFK&departureDate=2018-12-01&returnDate=2018-12-24')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(16);

        const [firstResult] = res.body;
        firstResult.should.have.property('departureFlight');
        firstResult.should.have.property('returnFlight');
        firstResult.departureFlight.should.be.a('object');
        firstResult.returnFlight.should.be.a('object');

        const { departureFlight } = firstResult;

        // Airline
        departureFlight.airline.should.have.property('id');
        departureFlight.airline.should.have.property('name');

        // Destination
        departureFlight.destination.should.have.property('id');
        departureFlight.destination.should.have.property('name');
        departureFlight.destination.should.have.property('code');

        // Origin
        departureFlight.origin.should.have.property('id');
        departureFlight.origin.should.have.property('name');
        departureFlight.origin.should.have.property('code');
        done();
      });
  });

  it('should return the right data for included models on /flights GET', (done) => {
    chai.request(server)
      .get('/api/flights?departureCity=CPH&arrivalCity=JFK&departureDate=2018-12-01&returnDate=2018-12-24')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(16);

        const [firstResult] = res.body;
        firstResult.should.have.property('departureFlight');
        firstResult.should.have.property('returnFlight');
        firstResult.departureFlight.should.be.a('object');
        firstResult.returnFlight.should.be.a('object');

        const { departureFlight } = firstResult;
        const { airline, destination, origin } = departureFlight;

        // Airline
        airline.name.should.equal('SAS');

        // Destination
        destination.name.should.equal('John F. Kennedy International Airport');
        destination.code.should.equal('JFK');

        // Origin
        origin.name.should.equal('Copenhagen Airport Kastrup');
        origin.code.should.equal('CPH');
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

  it('should return 400 on /flights POST if airlineIndex is missing', (done) => {
    chai.request(server)
      .post('/api/flights')
      .send(
        {
          flightNumber: 'KLM-2347',
          departureDateTime: '2018-10-22T21:37:12.012Z',
          arrivalDateTime: '2018-10-23T21:37:12.012Z',
          destinationIndex: airportsData[0].id,
          originIndex: airportsData[1].id,
        }
      ).end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('errors');
        res.body.errors[0].message.should.equal('Flight.airlineIndex cannot be null');
        done();
      });
  });

  it('should return 404 on /flights/:id GET when id is not found', (done) => {
    chai.request(server)
      .get('/api/flights/0')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Flight not found');
        done();
      });
  });

  it('should return 400 on /flights/:id GET when id is not a valid value', (done) => {
    chai.request(server)
      .get('/api/flights/test')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('parent');
        res.body.should.have.property('original');
        res.body.should.have.property('sql');
        res.body.name.should.equal('SequelizeDatabaseError');
        done();
      });
  });

  it('should return 200 on /flights/:id GET when id is provided and exists', (done) => {
    chai.request(server)
      .get(`/api/flights/${newFlightId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('airlineIndex');
        res.body.should.have.property('flightNumber');
        res.body.should.have.property('departureDateTime');
        res.body.should.have.property('arrivalDateTime');
        res.body.should.have.property('destinationIndex');
        res.body.should.have.property('originIndex');
        res.body.should.have.property('createdAt');
        res.body.should.have.property('updatedAt');
        done();
      });
  });
});
