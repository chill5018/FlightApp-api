import { assert } from 'chai';

import models from 'server/models';
import truncate from 'test/truncate';

describe('Airline model', () => {
  before(async () => {
    await truncate();
  });

  after(async () => {
    await truncate();
  });

  it('should create Airline Name as String', (done) => {
    const airlineData = {
      name: 'Airline',
    };

    models.Airline.create(airlineData).then((result) => {
      assert.isOk(result);
      done();
    });
  });


  it('should throw error when Airline Name is number', (done) => {
    const airlineData = {
      name: 123,
    };

    models.Airline.create(airlineData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation is on name failed');
      done();
    });
  });
});
