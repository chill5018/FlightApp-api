import { assert } from 'chai';

import models from 'server/models';
import {DatabaseError, UniqueConstraintError} from 'sequelize';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Airport model', () => {
  let airport;

  beforeEach(async () => {
    await truncate();

    airport = await factories.airport();
  });

  it('should create model when ID is number', async () => {
    const airportData = {
      id : 1,
      name: 'Airport',
      code: 'ABC',
    };

    var result = models.Airport.create(airportData);
    assert.isOk(result);
  });

  it('should throw error when ID is string', async () => {
    const airportData = {
      id : '11',
      name: 'Airport',
      code: 'ABC',
    };

    assert.throws(() => {models.Airport.create(airportData)}, UniqueConstraintError, 'Error thrown');
  });

  it('should throw error when ID is float', async () => {
    const airportData = {
      id : 1.1,
      name: 'Airport',
      code: 'ABC',
    };

    assert.throws(() => {models.Airport.create(airportData)}, DatabaseError, 'Error thrown');
  });


  it('should create Airport Name as String', async () => {
    assert.isString(airport.name);
    for(var i =0; i < airport.name.length;i++) assert.isNotNumber(airport.name.charAt(i)); 
  });

  it('should create model when 3-char code is passed', async () => {
    const airportData = {
      id : 1,
      name: 'Airport',
      code: 'ABC',
    };

    var result = models.Airport.create(airportData);
    assert.isOk(result);
  });

  it('should throw error when 2-char code is passed', async () => {
    const airportData = {
      id : 1,
      name: 'Airport',
      code: 'AB',
    };

    assert.throws(() => {models.Airport.create(airportData)}, DatabaseError, 'Error thrown');
  });

  it('should throw error when 4-char code is passed', async () => {
    const airportData = {
      id : 1,
      name: 'Airport',
      code: 'ABCD',
    };

    assert.throws(() => {models.Airport.create(airportData)}, DatabaseError, 'Error thrown');
  });

  it('should truncate the airports table with each test', async () => {
    const count = await models.Airport.count();

    assert.equal(count, 1);
  });
});
