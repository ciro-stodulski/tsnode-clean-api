import { Channel, ConsumeMessage } from 'amqplib';
import { IVerifyNotificationUseCase, EventDto} from '../../../../core/use-cases';
import {
  Consumer,
  ConsumerErrorOptions,
  ConsumerConfig,
  verify_schema,
} from '../..';

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

  async handle(message: EventDto): Promise<void> {
    await this.verify_notification_use_case.notify(message);
  }

  exception(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): void | ConsumerErrorOptions {
    return {
      should_ack: true,
    };
  }
}
