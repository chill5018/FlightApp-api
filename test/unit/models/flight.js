
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Flight model', () => {
  let flight;
  let airline;
  let origin;
  let destination;

  beforeEach(async () => {
    await truncate();

    airline = await factories.airline();
    origin = await factories.airport();
    destination = await factories.airport();
    //flight = await factories.flight();
  });

  it('should create Flight as LL + NNN(N) number format', async () => {
    const flightData = {
        airlineIndex: airline.id,
        flightNumber: 'KLM-2345',
        departureDateTime: '2018-10-22T21:37:12.012Z',
        arrivalDateTime: '2018-10-23T21:37:12.012Z',
        destinationIndex: destination.id,
        originIndex: origin.id,
    };

    const result = models.Flight.create(flightData);
    assert.isOk(result);
  });

  it('should throw error when Flight number has the wrong format', async () => {
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
    });
  });

  it('should create departure time as date', async () => {
    const flightData = {
        airlineIndex: airline.id,
        flightNumber: 'KLM-2345',
        departureDateTime: '2018-10-22T21:37:12.012Z',
        arrivalDateTime: '2018-10-23T21:37:12.012Z',
        destinationIndex: destination.id,
        originIndex: origin.id,
    };

    const result = models.Flight.create(flightData);
    assert.isOk(result);
  });

  it('should throw error when departure time is not date', async () => {
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
    });
  });

  it('should create arrival time as date', async () => {
    const flightData = {
        airlineIndex: airline.id,
        flightNumber: 'KLM-2345',
        departureDateTime: '2018-10-22T21:37:12.012Z',
        arrivalDateTime: '2018-10-23T21:37:12.012Z',
        destinationIndex: destination.id,
        originIndex: origin.id,
    };

    const result = models.Flight.create(flightData);
    assert.isOk(result);
  });

  it('should throw error when arrival time is not date', async () => {
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
    });
  });

  it('should truncate the flights table with each test', async () => {
    const count = await models.Flight.count();

    assert.equal(count, 0);
  });
});
