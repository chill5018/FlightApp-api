import { assert } from 'chai';

import models from '../../server/models';

import factories from '../factories/todo';
import truncate from '../truncate';

describe('Todo model', () => {
  let todo;

  beforeEach(async () => {
    await truncate();

    todo = await factories.todo();
    console.log(todo)
  });

  it('should generate a Todo from the factory', async () => {
    console.log(todo);
    assert.isOk(todo);
  });

  it('should truncate the Todo table with each test', async () => {
    const count = await models.Todo.count();

    assert.equal(count, 1);
  });
});