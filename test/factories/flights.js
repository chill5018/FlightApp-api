import faker from 'faker';

import models from 'server/models';

const data = async (props = {}) => {
  const defaultProps = {
    originName: faker.address.city(),
    destinationName: faker.address.city(),
    originCode: 'CPH',
    destinationCode: 'JFK',
  };

  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  models.Flight.create(await data(props));
