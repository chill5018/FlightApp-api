import faker from 'faker';

import models from 'server/models';
import airline from './airline';
import airport from './airport';


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
    airlineIndex:airline().id,
    flightNumber:faker.helpers.replaceSymbols('??') + faker.random.number(100, 9999),
    departureDateTime:faker.date.past(100).getTime(),
    arrivalDateTime:faker.date.future(100).getTime(),
    destinationIndex:airport().id,
    originIndex:airport().id
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
