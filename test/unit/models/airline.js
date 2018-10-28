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

  it('Airline ID is number', async () => {
    assert.isNumber(airline.id);
  });

  it('Airline Name is String', async () => {
    assert.isString(airline.name);
  });
  

  it('should truncate the airlines table with each test', async () => {
    const count = await models.Airline.count();

    assert.equal(count, 1);
  });
});
