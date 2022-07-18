import { ITodoProducer } from '../../../../../core/ports';
import { Producer, AMQPPublishOptions, IAmqp, ProducerConfig } from '../..';
import { logger } from '../../../../../shared/logger';

export class TodoProducer extends Producer implements ITodoProducer {
  producer_config: ProducerConfig = {
    exchange: 'todo.dx',
    routing_key: 'notificationTodo',
  };

  constructor(private readonly amqp: IAmqp) {
    super();
  }

  async notification(name: string): Promise<void> {
    const options: AMQPPublishOptions = {
      priority: 0,
      delivery_mode: 2,
      content_encoding: 'UTF-8',
      content_type: 'application/json',
    };

    const { exchange, routing_key } = this.producer_config;

    await this.amqp.publish({
      options,
      message: { name },
      exchange,
      routing_key,
    });

    logger.info(
      `Sending message to exchange - ${exchange} and routingKey - ${routing_key}`
    );
  }
}
