import { ConsumeMessage, Channel } from 'amqplib';
import { ConsumerErrorOptions, ConsumerConfig } from '..';

export type Message<T = any> = {
  body: T;
};

export interface Consumer {
  handle(message: Message): Promise<void>;

  exception(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): ConsumerErrorOptions | void;

  consumer_config: ConsumerConfig;
}
