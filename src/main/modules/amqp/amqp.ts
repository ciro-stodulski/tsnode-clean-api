import { Connection, Channel, ConsumeMessage, connect } from 'amqplib';
import { RabbitMQConfig } from './types';
import { convert_to_json } from '../../../shared';
import { AMQPChannelEvent, AMQPErrorCode } from './enum';
import {
  validation,
  Consumer,
  ConsumerErrorOptions,
  CreateTodoConsumer,
} from '../../../interface/amqp';
import { Container } from '../../container';

export class AmqpModule {
  private connection: Connection;

  private channel: Channel;

  private timeout_id: NodeJS.Timeout;

  private restarted = false;

  private consumers: Consumer[] = [];

  constructor(container: Container, private config: RabbitMQConfig) {
    this.consumers = [new CreateTodoConsumer(container.create_todo_use_case)];
  }

  private async consumeMessage(
    message: ConsumeMessage | null,
    consumer: Consumer
  ): Promise<void> {
    if (message) {
      const message_content = validation(consumer.consumer_config.schema)(
        convert_to_json(message.content)
      );

      await consumer.handle(message_content);

      await this.channel.ack(message);
    }
  }

  private handleConsumerError(
    consumer: Consumer,
    message: ConsumeMessage | null,
    error: any
  ): void {
    const consumer_error = consumer.exception(error, this.channel, message) as
      | ConsumerErrorOptions
      | undefined;

    if (message) {
      const { should_ack, should_requeue } = consumer_error || {};

      if (should_ack) {
        this.channel.ack(message);
        return;
      }

      this.channel.nack(message, false, should_requeue);
    }
  }

  private registerConsumer(consumer: Consumer): void {
    this.channel.consume(
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

  private reconnect(): void {
    console.warn(
      `Trying to connect to rabbitmq on virtual host ${this.config.vhost} in 5 seconds`
    );

    this.restarted = true;
    this.timeout_id = setTimeout(async () => {
      await this.start();
    }, 5000);
  }

  async start(): Promise<void> {
    try {
      clearTimeout(this.timeout_id);

      const { username, password, host, port, vhost } = this.config;

      this.connection = await connect(
        `${this.config.protocol}://${username}:${password}@${host}:${port}/${vhost}`
      );

      this.connection.on(AMQPChannelEvent.CLOSE, () => {
        this.reconnect();
      });

      console.info(`RabbitMQ: AMQP server started`);
      console.info(
        `RabbitMQ: connection established on vhost - ${this.config.vhost}`
      );
      this.channel = await this.connection.createChannel();

      this.channel.on(AMQPChannelEvent.CANCEL, () => {
        this.reconnect();
      });

      this.channel.on(AMQPChannelEvent.ERROR, error => {
        if (error.code === AMQPErrorCode.NOT_FOUND) {
          this.reconnect();
        }
      });

      for (const consumer of this.consumers) {
        this.registerConsumer(consumer);
        console.info(
          `RabbitMQ: 'Started queue '${consumer.consumer_config.queue}' to consume`
        );
      }
    } catch (err: any) {
      console.error(
        `Error connecting RabbitMQ to virtual host ${this.config.vhost} : ${err.message}`
      );
      this.reconnect();
    }
  }
}
