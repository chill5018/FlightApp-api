import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Airline model', () => {
  let airline;

  beforeEach(async () => {
    await truncate();

    airline = await factories.airline();
  });

  it('should generate an airline from the factory', async () => {
    assert.isOk(airline.id);
  });

  it('should truncate the airlines table with each test', async () => {
    const count = await models.Airline.count();

    assert.equal(count, 1);
  });
});
