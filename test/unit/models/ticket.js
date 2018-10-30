
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Ticket model', () => {
  let ticket;

  beforeEach(async () => {
    await truncate();

    ticket = await factories.ticket();
  });

  it('should create Ticket ID as number', async () => {
    assert.isNumber(ticket.id);
  });

  it('should create Ticket price as number', async () => {
    assert.isNumber(ticket.price);
  }); 
  
  it('should create Flight ID as number', async () => {
    assert.isNumber(ticket.flightIndex);
  }); 
  
  it('should truncate the tickets table with each test', async () => {
    const count = await models.Ticket.count();

    assert.equal(count, 1);
  });
});
