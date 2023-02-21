import { TodoStatus } from 'src/domain/entities';

export type TodoMessage = {
  name: string;
  status: TodoStatus;
  user: string;
};
