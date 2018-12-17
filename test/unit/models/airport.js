import { assert } from 'chai';

import models from 'server/models';

import truncate from 'test/truncate';

describe('Airport model', () => {
  beforeEach(async () => {
    await truncate();
  });

  after(async () => {
    await truncate();
  });

  it('should create model when ID is number', (done) => {
    const airportData = {
      id: 1,
      name: 'Airport',
      code: 'ABC',
    };

    models.Airport.create(airportData).then((result) => {
      assert.isOk(result);
      done();
    });
  });

  it('should create Airport Name as String', (done) => {
    const airportData = {
      id: 1,
      name: 'Airport',
      code: 'ABC',
    };

    models.Airport.create(airportData).then((result) => {
      assert.isOk(result);
      done();
    });
  });


  it('should throw error when Airport Name contains numbers', (done) => {
    const airportData = {
      id: 1,
      name: 'Airp124ort',
      code: 'ABC',
    };

    models.Airport.create(airportData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation is on name failed');
      done();
    });
  });

  it('should create model when 3-char code is passed', (done) => {
    const airportData = {
      id: 1,
      name: 'Airport',
      code: 'ABC',
    };

    models.Airport.create(airportData).then((result) => {
      assert.isOk(result);
      done();
    });
  });

  it('should throw error when 2-char code is passed', (done) => {
    const airportData = {
      name: 'Airport',
      code: 'AB',
    };

    models.Airport.create(airportData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation len on code failed');
      done();
    });
  });

  it('should throw error when 4-char code is passed', (done) => {
    const airportData = {
      name: 'Airport',
      code: 'ABCD',
    };

    models.Airport.create(airportData).catch((response) => {
      const [error] = response.errors;
      assert.equal(error.type, 'Validation error');
      assert.equal(error.message, 'Validation len on code failed');
      done();
    });
  });
});
