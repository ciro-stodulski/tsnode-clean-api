import { AMQPPublishData } from 'src/infra/integrations';

export interface IAmqp {
  publish(data: AMQPPublishData): Promise<boolean>;
}
