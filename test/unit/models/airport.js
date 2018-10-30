import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Airport model', () => {
  let airport;

  beforeEach(async () => {
    await truncate();

    airport = await factories.airport();
  });

  it('should create Airport ID as number', async () => {
    assert.isNumber(airport.id);
  });

  it('should create Airport Name as String', async () => {
    assert.isString(airport.name);
    for(var i =0; i < airport.name.length;i++) assert.isNotNumber(airport.name.charAt(i)); 
  });

  it('should create Airport code as 3 char string', async () => {
    assert.isString(airport.code);
    assert.lengthOf(airport.code, 3);
    for(var i =0; i < airport.code.length;i++) assert.isNotNumber(airport.code.charAt(i)); 

  });

  it('should truncate the airports table with each test', async () => {
    const count = await models.Airport.count();

    assert.equal(count, 1);
  });
});
