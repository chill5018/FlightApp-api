
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Ticket model', () => {
  let ticket;
  let flight;

  beforeEach(async () => {
    await truncate();

    flight = await factories.flight();
  });

  it('should create Ticket price as float', async () => {
    const ticket =  {
      price: 689.99,
      flightIndex: flight.id,
    };

    const result = models.Ticket.create(ticket);
    assert.isOk(result);
  });

  it('should throw error when Ticket price is int', async () => {
    const ticket =  {
      price: 689,
      flightIndex: flight.id,
    };

    models.Ticket.create(ticket).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation isFloat on name failed');
    });
  });

  
  it('should throw error when Ticket price is string', async () => {
    const ticket =  {
      price: '689',
      flightIndex: flight.id,
    };

    models.Ticket.create(ticket).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation isFloat on name failed');
    });
  });

  it('should truncate the tickets table with each test', async () => {
    const count = await models.Ticket.count();

    assert.equal(count, 0);
  });
});
