import { ITodoProducer } from 'src/domain/integrations';
import {
  Producer,
  AMQPPublishOptions,
  IAmqp,
  ProducerConfig,
} from 'src/infra/integrations';
import { logger } from 'src/shared/logger';

export class TodoProducer extends Producer implements ITodoProducer {
  producer_config: ProducerConfig = {
    exchange: 'todo.dx',
    routing_key: 'notify.create',
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
      message: { name, describe: 'service client producer' },
      exchange,
      routing_key,
    });

    logger.info(
      `Sending message to exchange - ${exchange} and routingKey - ${routing_key}`
    );
  }
}
