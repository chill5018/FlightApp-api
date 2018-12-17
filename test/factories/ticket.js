import faker from 'faker';

import models from 'server/models';

import flight from './flight';

/**
 * Generate an object which contains attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => Promise.all([
  flight(),
  flight(),
]).then((response) => {
  const [departureFlight, returnFlight] = response;
  const defaultProps = {
    id: faker.random.number(),
    price: faker.finance.amount(100, 1000),
    departureFlight: departureFlight.id,
    returnFlight: returnFlight.id,
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
  models.Ticket.create(await data(props));
