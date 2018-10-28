import faker from 'faker';

import models from 'server/models';

/**
 * Generate an object which contains attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    id:faker.random.number(),
    airlineIndex:faker.random.number(),
    flightNumber:faker.helpers.replaceSymbols('??') + faker.random.number(100, 9999),
    departureDateTime:faker.date.future(1).getTime(),
    arrivalDateTime:faker.date.future(2).getTime(),
    destinationIndex:faker.random.number(),
    originIndex:faker.random.number()
  };


  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
export default async (props = {}) =>
  models.Flight.create(await data(props));
