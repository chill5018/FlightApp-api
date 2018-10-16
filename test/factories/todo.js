// test/factories/user.js
import faker from 'faker';
import models from 'server/models';
/**
 * Generate an object which container attributes needed
 * to successfully create a todo instance.
 * 
 * @param  {Object} props Properties to use for the todo.
 * 
 * @return {Object}       An object to build the todo from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    title: faker.title(),
  };
  return Object.assign({}, defaultProps, props);
};
/**
 * Generates a todo instance from the properties provided.
 * 
 * @param  {Object} props Properties to use for the todo.
 * 
 * @return {Object}       A todo instance
 */
export default async (props = {}) =>
  models.Todo.create(await data(props));