
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Flight model', () => {
  let flight;

  beforeEach(async () => {
    await truncate();

    airport = await factories.flight();
  });

  it('Flight ID is number', async () => {
    assert.isNumber(flight.id);
  });

  it('Flight number format is LL + NNN(N)', async () => {
    for(var i = 0;i<2;i++) 
        assert.isNotNumber(flight.flightNumber.charAt(i));
    for(var i = 2;i<flight.flightNumber.length;i++) 
        assert.isNumber(flight.flightNumber.charAt(i));
  });

  it('Arrival after Departure', async () => {
    var departureDate = new Date(flight.departureDate);
    var arrivalDate = new Date(flight.arrivalDateTime);

    assert.isTrue(arrivalDate > departureDate);
  });

  

  it('should truncate the airports table with each test', async () => {
    const count = await models.Airport.count();

    assert.equal(count, 1);
  });
});
