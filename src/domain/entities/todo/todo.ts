import { TodoStatus } from 'src/domain/entities';

export class Todo {
  public name: string;

  public status: TodoStatus;

  public user: string;

  constructor(props: Partial<Todo>) {
    Object.assign(this, props);
  }
}
