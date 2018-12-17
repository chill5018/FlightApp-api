import truncate from 'test/truncate';

const chaiHttp = require('chai-http');

const chai = require('chai');

const server = require('../../app');

chai.should();
chai.use(chaiHttp);

const { Airport, Flight, Airline, Ticket } = require('../../server/models');

describe('Tickets controller', () => {
  let flightsData;

  before((done) => {
    Airline.create({ name: 'KLM' }).then((airline) => {
      Airport.bulkCreate([
        { name: 'Copenhagen Airport', code: 'CPH' },
        { name: 'John F. Kennedy International Airport', code: 'JFK' },
      ], { returning: true })
        .then((airports) => {
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
            {
              airlineIndex: airline.id,
              flightNumber: 'KLM-2347',
              departureDateTime: '2018-10-23T21:37:12.012Z',
              arrivalDateTime: '2018-10-24T21:37:12.012Z',
              destinationIndex: airports[0].id,
              originIndex: airports[1].id,
            },
            {
              airlineIndex: airline.id,
              flightNumber: 'KLM-2348',
              departureDateTime: '2018-10-30T21:37:12.012Z',
              arrivalDateTime: '2018-10-31T21:37:12.012Z',
              destinationIndex: airports[1].id,
              originIndex: airports[0].id,
            },
          ], { returning: true }).then((flights) => {
            flightsData = flights;
            Ticket.bulkCreate([
              {
                price: 689.99,
                departureFlight: flights[0].id,
              },
              {
                price: 679.99,
                departureFlight: flights[1].id,
              },
              {
                price: 679.99,
                departureFlight: flights[2].id,
                returnFlight: flights[3].id,
              },
            ], { returning: true }).then(() => done());
          });
        });
    });
  });

  after(async () => {
    await truncate();
  });

  it('should list ALL tickets on /tickets GET', (done) => {
    chai.request(server)
      .get('/api/tickets')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('price');
        res.body[0].should.have.property('departureFlight');
        res.body[0].should.have.property('updatedAt');
        res.body[0].should.have.property('createdAt');
        res.body[0].price.should.equal(689.99);
        res.body[2].should.have.property('departureFlight');
        res.body[2].should.have.property('returnFlight');
        done();
      });
  });

  it('should add a SINGLE ticket with only departureFlight on /tickets POST', (done) => {
    chai.request(server)
      .post('/api/tickets')
      .send(
        {
          price: 789.99,
          departureFlightId: flightsData[0].id,
        }
      ).end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('price');
        res.body.should.have.property('departureFlight');
        res.body.should.have.property('updatedAt');
        res.body.should.have.property('createdAt');
        res.body.price.should.equal(789.99);
        done();
      });
  });

  it('should add a SINGLE ticket with departureFlight and returnFlight on /tickets POST', (done) => {
    chai.request(server)
      .post('/api/tickets')
      .send(
        {
          price: 789.99,
          departureFlightId: flightsData[0].id,
          returnFlightId: flightsData[1].id,
        }
      ).end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('price');
        res.body.should.have.property('departureFlight');
        res.body.should.have.property('returnFlight');
        res.body.should.have.property('updatedAt');
        res.body.should.have.property('createdAt');
        res.body.price.should.equal(789.99);
        done();
      });
  });

  it('should return 400 on /tickets POST if the price is not defined', (done) => {
    chai.request(server)
      .post('/api/tickets')
      .send(
        {
          departureFlightId: flightsData[0].id,
          returnFlightId: flightsData[1].id,
        }
      )
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('errors');
        res.body.errors[0].message.should.equal('Ticket.price cannot be null');
        done();
      });
  });
});
