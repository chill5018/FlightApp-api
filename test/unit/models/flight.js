
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Flight model', () => {
  let airline;
  let origin;
  let destination;

  beforeEach(async () => {
    await truncate();

    airline = await factories.airline();
    origin = await factories.airport();
    destination = await factories.airport();
  });

  after(async () => {
    await truncate();
  });

  it('should create Flight as LL + NNN(N) number format', (done) => {
    const flightData = {
      airlineIndex: airline.id,
      flightNumber: 'KLM-2345',
      departureDateTime: '2018-10-22T21:37:12.012Z',
      arrivalDateTime: '2018-10-23T21:37:12.012Z',
      destinationIndex: destination.id,
      originIndex: origin.id,
    };

    models.Flight.create(flightData).then((result) => {
      assert.isOk(result);
      done();
    });
  });

  it('should throw error when Flight number has the wrong format', (done) => {
    const flightData = {
      airlineIndex: airline.id,
      flightNumber: 'KL-M45',
      departureDateTime: '2018-10-22T21:37:12.012Z',
      arrivalDateTime: '2018-10-23T21:37:12.012Z',
      destinationIndex: destination.id,
      originIndex: origin.id,
    };

    models.Flight.create(flightData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation is on flightNumber failed');
      done();
    });
  });

  it('should create departure time as date', (done) => {
    const flightData = {
      airlineIndex: airline.id,
      flightNumber: 'KLM-2345',
      departureDateTime: '2018-10-22T21:37:12.012Z',
      arrivalDateTime: '2018-10-23T21:37:12.012Z',
      destinationIndex: destination.id,
      originIndex: origin.id,
    };

    models.Flight.create(flightData).then((result) => {
      assert.isOk(result);
      done();
    });
  });

  it('should throw error when departure time is not date', (done) => {
    const flightData = {
      airlineIndex: airline.id,
      flightNumber: 'KLM-2345',
      departureDateTime: 'tomorrow',
      arrivalDateTime: '2018-10-23T21:37:12.012Z',
      destinationIndex: destination.id,
      originIndex: origin.id,
    };

    models.Flight.create(flightData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation isDate on departureDateTime failed');
      done();
    });
  });

  it('should create arrival time as date', (done) => {
    const flightData = {
      airlineIndex: airline.id,
      flightNumber: 'KLM-2345',
      departureDateTime: '2018-10-22T21:37:12.012Z',
      arrivalDateTime: '2018-10-23T21:37:12.012Z',
      destinationIndex: destination.id,
      originIndex: origin.id,
    };

    models.Flight.create(flightData).then((result) => {
      assert.isOk(result);
      done();
    });
  });

  it('should throw error when arrival time is not date', (done) => {
    const flightData = {
      airlineIndex: airline.id,
      flightNumber: 'KLM-2345',
      departureDateTime: '2018-10-23T21:37:12.012Z',
      arrivalDateTime: 'tomorrow',
      destinationIndex: destination.id,
      originIndex: origin.id,
    };

    models.Flight.create(flightData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation isDate on arrivalDateTime failed');
      done();
    });
  });
});
