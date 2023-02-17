import { TodoStatus } from '../../../../domain/entities';

export type TodoMessage = {
  name: string;
  status: TodoStatus;
  user: string;
};
