
import { assert } from 'chai';

import models from 'server/models';

import factories from 'test/factories';
import truncate from 'test/truncate';

describe('Flight model', () => {
  let ticket;

  beforeEach(async () => {
    await truncate();

    ticket = await factories.ticket();
  });

  it('Ticket ID is number', async () => {
    assert.isNumber(ticket.id);
  });

  it('Ticket price is number', async () => {
    assert.isNumber(ticket.price);
  });  

  it('should truncate the tickets table with each test', async () => {
    const count = await models.Airport.count();

    assert.equal(count, 1);
  });
});
