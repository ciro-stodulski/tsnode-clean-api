import { Channel, ConsumeMessage } from 'amqplib';
import { ICreateTodoUseCase } from '../../../../core/use-cases';
import {
  Consumer,
  ConsumerErrorOptions,
  ConsumerConfig,
  create_todo_schema,
  Message,
} from '../..';
import { logger } from '../../../../shared/logger';

export class CreateTodoConsumer extends Consumer {
  consumer_config: ConsumerConfig = {
    queue: 'create-todo',
    schema: create_todo_schema,
  };

  constructor(private create_todo_use_case: ICreateTodoUseCase) {
    super();
  }

  async handle(message: Message): Promise<void> {
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
