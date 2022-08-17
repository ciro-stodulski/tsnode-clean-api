import { Channel, ConsumeMessage } from 'amqplib';
import {
  IVerifyNotificationUseCase,
  EventDto,
} from '../../../../core/use-cases';
import {
  Consumer,
  ConsumerErrorOptions,
  ConsumerConfig,
  verify_schema,
} from '../..';
import { logger } from '../../../../shared';

export class VerifyConsumer extends Consumer {
  consumer_config: ConsumerConfig = {
    queue: 'notify.create',
    schema: verify_schema,
  };

  constructor(
    private verify_notification_use_case: IVerifyNotificationUseCase
  ) {
    super();
  }

  async handle(message: { body: EventDto }): Promise<void> {
    await this.verify_notification_use_case.notify(message.body);
  }

  exception(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): void | ConsumerErrorOptions {
    logger.error(JSON.stringify(err));
    return {
      should_ack: true,
    };
  }
}
