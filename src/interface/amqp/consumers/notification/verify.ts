import { Channel, ConsumeMessage } from 'amqplib';
import { IVerifyNotificationUseCase } from '../../../../core/use-cases';
import {
  Consumer,
  ConsumerErrorOptions,
  ConsumerConfig,
  verify_schema,
  Message,
} from '../..';
import { logger } from '../../../../shared';

export class VerifyConsumer implements Consumer {
  consumer_config: ConsumerConfig = {
    queue: 'notify.create',
    schema: verify_schema,
  };

  constructor(
    private verify_notification_use_case: IVerifyNotificationUseCase
  ) {}

  async handle(message: Message): Promise<void> {
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
