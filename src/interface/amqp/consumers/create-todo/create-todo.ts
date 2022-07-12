import { Channel, ConsumeMessage } from 'amqplib';
import { ICreateTodoUseCase } from '../../../../core/use-cases';
import {
  Consumer,
  ConsumerErrorOptions,
  ConsumerConfig,
  create_todo_schema,
  TodoMessage,
} from '../..';

export class CreateTodoConsumer extends Consumer {
  consumer_config: ConsumerConfig = {
    queue: 'create-todo',
    schema: create_todo_schema,
  };

  constructor(private create_todo_use_case: ICreateTodoUseCase) {
    super();
  }

  async handle(message: TodoMessage): Promise<void> {
    this.create_todo_use_case.create(message);
  }

  exception(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): void | ConsumerErrorOptions {
    console.error(err);
    return {
      should_ack: true,
    };
  }
}
