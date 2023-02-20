import { Channel, ConsumeMessage } from 'amqplib';
import { ICreateTodoUseCase } from 'src/domain/use-cases';
import {
  Consumer,
  ConsumerErrorOptions,
  ConsumerConfig,
  create_todo_schema,
  Message,
} from 'src/presentation/amqp';
import { logger } from 'src/shared/logger';
import { Todo } from 'src/domain/entities';

export class CreateTodoConsumer implements Consumer {
  consumer_config: ConsumerConfig = {
    queue: 'create-todo',
    schema: create_todo_schema,
  };

  constructor(private create_todo_use_case: ICreateTodoUseCase) {}

  async handle(message: Message<Todo>): Promise<void> {
    this.create_todo_use_case.create(message.body);
  }

  exception(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): void | ConsumerErrorOptions {
    logger.error(err);
    return {
      should_ack: true,
    };
  }
}
