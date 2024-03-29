import {
  Producer,
  AMQPPublishOptions,
  IAmqp,
  ProducerConfig,
} from 'src/infra/integrations';
import { logger } from 'src/shared/logger';
import { INotificationProducer } from 'src/domain/integrations';
import { EventDto } from 'src/domain/dto';

export class NotificationProducer
  extends Producer
  implements INotificationProducer
{
  producer_config: ProducerConfig = {
    exchange: 'notification.dx',
    routing_key: 'notify.create',
  };

  constructor(private readonly amqp: IAmqp) {
    super();
  }

  async SendNotify(dto: EventDto): Promise<void> {
    const options: AMQPPublishOptions = {
      priority: 0,
      delivery_mode: 2,
      content_encoding: 'UTF-8',
      content_type: 'application/json',
    };

    const { exchange, routing_key } = this.producer_config;

    await this.amqp.publish({
      options,
      message: dto,
      exchange,
      routing_key,
    });

    logger.info(
      `Sending message to exchange - ${exchange} and routingKey - ${routing_key}`
    );
  }
}
