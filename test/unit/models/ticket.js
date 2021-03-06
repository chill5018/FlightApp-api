
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Ticket model', () => {
  let flight;

  beforeEach(async () => {
    await truncate();

    flight = await factories.flight();
  });

  it('should create Ticket price as float', async () => {
    const ticket = {
      price: 689.99,
      departureFlight: flight.id,
    };

    const result = await models.Ticket.create(ticket);
    assert.isOk(result);
  });

  it('should throw error when Ticket price is int', async () => {
    const ticket = {
      price: 689,
      departureFlight: flight.id,
    };

    models.Ticket.create(ticket).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation isFloat on name failed');
    });
  });


  it('should throw error when Ticket price is string', async () => {
    const ticket = {
      price: '689',
      departureFlight: flight.id,
    };

    models.Ticket.create(ticket).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation isFloat on name failed');
    });
  });

  describe('Boundary Value Analysis', () => {
    it('should throw error when Ticket price is negative', async () => {
      const ticket = {
        price: -1.0,
        departureFlight: flight.id,
      };

      models.Ticket.create(ticket).catch((response) => {
        const [error] = response.errors;
        assert.equal(error.type, 'Validation error');
        assert.equal(error.message, 'Ticket Price cannot be less than zero');
      });
    });

    it('should accept a Ticket price of zero', async () => {
      const ticket = {
        price: 0.0,
        departureFlight: flight.id,
      };

      const result = await models.Ticket.create(ticket);
      assert.isOk(result);
    });

    it('should accept a Ticket price of 1.0', async () => {
      const ticket = {
        price: 1.0,
        departureFlight: flight.id,
      };

      const result = await models.Ticket.create(ticket);
      assert.isOk(result);
    });
  });
});
