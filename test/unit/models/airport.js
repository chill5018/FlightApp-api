import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Airport model', () => {
  let airport;

  beforeEach(async () => {
    await truncate();

    //airport = await factories.airport();
  });

  it('should create model when ID is number', async () => {
    const airportData = {
      id: 1,
      name: 'Airport',
      code: 'ABC',
    };

    const result = models.Airport.create(airportData);
    assert.isOk(result);
  });

  it('should create Airport Name as String', async () => {
    const airportData = {
      id: 1,
      name: 'Airport',
      code: 'ABC',
    };

    const result = models.Airport.create(airportData);
    assert.isOk(result);
  });

  
  it('should throw error when Airport Name contains numbers', async () => {
    const airportData = {
      id: 1,
      name: 'Airp124ort',
      code: 'ABC',
    };

    models.Airport.create(airportData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation is on name failed');
    });
  });

  it('should create model when 3-char code is passed', async () => {
    const airportData = {
      id: 1,
      name: 'Airport',
      code: 'ABC',
    };

    const result = models.Airport.create(airportData);
    assert.isOk(result);
  });

  it('should throw error when 2-char code is passed', async () => {
    const airportData = {
      name: 'Airport',
      code: 'AB',
    };

    models.Airport.create(airportData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation len on code failed');
    });
  });

  it('should throw error when 4-char code is passed', async () => {
    const airportData = {
      name: 'Airport',
      code: 'ABCD',
    };

    models.Airport.create(airportData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation len on code failed');
    });
  });

  it('should truncate the airports table with each test', async () => {
    const count = await models.Airport.count();

    assert.equal(count, 0);
  });
});
