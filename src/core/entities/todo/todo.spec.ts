import { expect, should } from 'chai';
import { TodoStatus } from './enum';
import { Todo } from './todo';

describe('Entity - Todo', () => {
  it('Create entity with successfully', () => {
    const data = {
      name: 'GYN',
      status: TodoStatus.Active,
      user: 'yolo',
    };

    const todo = new Todo(data);

    expect(todo).to.be.not.equal(null);
    expect(todo.name).to.be.equal(data.name);
    expect(todo.status).to.be.equal(data.status);
    expect(todo.user).to.be.equal(data.user);
  });
});
