import { Channel, ConsumeMessage } from 'amqplib';
import { convert_to_json } from '../../../shared';
import {
  validation,
  Consumer,
  ConsumerErrorOptions,
  CreateTodoConsumer,
  VerifyConsumer,
  Message,
} from '../../../interface/amqp';
import { Container } from '../../container';
import {
  RabbitqmAdapter,
  RabbitMQConfig,
  InstanceType,
} from '../../../infra/adapters';
import { Module } from '..';
import { logger } from '../../../shared/logger';

export class AmqpModule extends RabbitqmAdapter implements Module {
  private channel_server: Channel;

  private consumers: Consumer[] = [];

  constructor(container: Container, config: RabbitMQConfig) {
    super(config, InstanceType.SERVER);
    this.consumers = [
      new CreateTodoConsumer(container.create_todo_use_case),
      new VerifyConsumer(container.verify_notification_use_case),
    ];
  }

  async close(): Promise<void> {}

  private async consumeMessage(
    message: ConsumeMessage | null,
    consumer: Consumer
  ): Promise<void> {
    if (message) {
      const message_content = validation(consumer.consumer_config.schema)(
        convert_to_json(message.content)
      ) as Message;

      await consumer.handle(message_content);

      await this.channel_server.ack(message);
    }
  }

  private handleConsumerError(
    consumer: Consumer,
    message: ConsumeMessage | null,
    error: any
  ): void {
    const consumer_error = consumer.exception(
      error,
      this.channel_server,
      message
    ) as ConsumerErrorOptions | undefined;

    if (message) {
      const { should_ack, should_requeue } = consumer_error || {};

      if (should_ack) {
        this.channel_server.ack(message);
        return;
      }

      this.channel_server.nack(message, false, should_requeue);
    }
  }

  private registerConsumer(consumer: Consumer): void {
    this.channel_server.consume(
      consumer.consumer_config.queue,
      async (message: ConsumeMessage | null) => {
        try {
          await this.consumeMessage(message, consumer);
        } catch (error) {
          this.handleConsumerError(consumer, message, error);
        }
      }
    );
  }

  async start(): Promise<void> {
    try {
      this.channel_server = await this.getChannel();

      for (const consumer of this.consumers) {
        this.registerConsumer(consumer);
        logger.info(
          `Amqp: Started queue '${consumer.consumer_config.queue}' to consume`
        );
      }
    } catch (error) {
      logger.error('Amqp: Error to started queues', error);
    }
  }
}
