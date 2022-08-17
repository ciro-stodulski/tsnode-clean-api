import { ConsumeMessage, Channel } from 'amqplib';
import { ConsumerErrorOptions, ConsumerConfig } from '..';

export type Message = {
  body: any;
};

export abstract class Consumer {
  abstract handle(message: Message): Promise<void>;

  abstract exception(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): ConsumerErrorOptions | void;

  abstract consumer_config: ConsumerConfig;
}
