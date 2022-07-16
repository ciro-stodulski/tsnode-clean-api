import { Schema, model } from 'mongoose';
import { Todo } from '../../../../core/entities';

export const todo_model = model(
  Todo.name,
  new Schema<Todo>({
    name: { type: String, required: true },
    status: { type: String, required: true },
    user: { type: String, required: true },
  })
);
