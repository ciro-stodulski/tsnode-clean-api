import { AMQPPublishData } from '..';

export interface IAmqp {
  publish(data: AMQPPublishData): Promise<boolean>;
}
