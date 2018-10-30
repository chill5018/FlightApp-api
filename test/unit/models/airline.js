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

  it('should create Airline ID as number', async () => {
    assert.isNumber(airline.id);
  });

  it('should create Airline Name as String', async () => {
    assert.isString(airline.name);
  });

  it('should truncate the airlines table with each test', async () => {
    const count = await models.Airline.count();

    assert.equal(count, 1);
  });
});
