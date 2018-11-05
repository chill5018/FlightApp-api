import faker from 'faker';

import models from 'server/models';

const data = async (props = {}) => {
  const defaultProps = {
    id: faker.random.number(),
    airlineIndex: faker.random.number(),
    flightNumber: 'DY 987',
    departureDateTime: faker.date.future(),
    arrivalDateTime: faker.date.future(),
    destinationIndex: faker.random.number(),
    originIndex: faker.random.number(),
  };

  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  models.Booking.create(await data(props));
