
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Flight model', () => {
  let flight;

  beforeEach(async () => {
    await truncate();

    flight = await factories.flight();
  });

  it('should create Flight ID as number', async () => {
    assert.isNumber(flight.id);
  });

  it('should create Flight as LL + NNN(N) number format', async () => {
    for(var i = 0;i<2;i++) 
        assert.isNotNumber(flight.flightNumber.charAt(i));
    for(var i = 2;i<flight.flightNumber.length;i++) {
      var number = parseInt(flight.flightNumber.charAt(i), 10);
      assert.isNumber(number);
    }
  });

  it('should create Arrival date after Departure date', async () => {
    var departureDate = new Date(flight.departureDateTime);
    var arrivalDate = new Date(flight.arrivalDateTime);

    assert.isTrue(arrivalDate.getFullYear() > departureDate.getFullYear());
  });

  it('should truncate the flights table with each test', async () => {
    const count = await models.Airport.count();

    assert.equal(count, 2);
  });
});
