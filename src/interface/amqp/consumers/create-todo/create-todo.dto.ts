import { TodoStatus } from '../../../../core/entities';

export type TodoMessage = {
  name: string;
  status: TodoStatus;
  user: string;
};
