import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Booking model', () => {
  let booking;

  beforeEach(async () => {
    await truncate();

    booking = await factories.booking();
  });

  it('should generate a booking from the factory', async () => {
    assert.isOk(booking.id);
  });

  it('should truncate the booking table with each test', async () => {
    const count = await models.Booking.count();

    assert.equal(count, 1);
  });

  describe('Booking attributes', () => {
    it('should have integer for ID', () => {
      assert.isNumber(booking.id);
    });

    it('should have integer for Airline Index', () => {
      assert.isNumber(booking.airlineIndex);
    });

    it('should have integer for Airline Index', () => {
      assert.isNumber(booking.airlineIndex);
    });

    it('should have timestamp for Dates', () => {
      assert.isNumber(booking.departureDateTime);
    });
  });
});
