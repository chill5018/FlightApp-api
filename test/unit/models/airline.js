import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Airline model', () => {
  let airline;

  beforeEach(async () => {
    await truncate();

    //airline = await factories.airline();
  });

  it('should create Airline Name as String', async () => {
    const airlineData = {
      name: 'Airline',
    };

    const result = models.Airline.create(airlineData);
    assert.isOk(result);
  });

  
  it('should throw error when Airline Name is number', async () => {
    const airlineData = {
      name: 123,
    };

    models.Airline.create(airlineData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation is on name failed');
    });
  });

  it('should truncate the airlines table with each test', async () => {
    const count = await models.Airline.count();

    assert.equal(count, 0);
  });
});
