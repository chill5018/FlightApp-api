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
const data = async (props = {}) => Promise.all([
  airline(),
  airport(),
  airport(),
]).then((response) => {
  const [airlineData, destinationAirport, originAirport] = response;

  const defaultProps = {
    id: faker.random.number(),
    airlineIndex: airlineData.id,
    flightNumber: 'KLM-2435',
    departureDateTime: faker.date.past(100).getTime(),
    arrivalDateTime: faker.date.future(100).getTime(),
    destinationIndex: destinationAirport.id,
    originIndex: originAirport.id,
  };

  return Object.assign({}, defaultProps, props);
});

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
export default async (props = {}) =>
  models.Flight.create(await data(props));
