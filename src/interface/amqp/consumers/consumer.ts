import { ConsumeMessage, Channel } from 'amqplib';
import { ConsumerErrorOptions, ConsumerConfig } from '..';

export abstract class Consumer {
  abstract handle(message: any): Promise<void>;

  abstract exception(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): ConsumerErrorOptions | void;

  abstract consumer_config: ConsumerConfig;
}
