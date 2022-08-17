import { Channel, Options } from 'amqplib';
import { InstanceType, RabbitMQConfig, RabbitqmAdapter } from '../../adapters';
import { AMQPPublishData, IAmqp, AMQPPublishOptions } from '..';
import { converter } from '../../../shared';

export class AmqpClient extends RabbitqmAdapter implements IAmqp {
  private channel_client: Promise<Channel>;

  constructor(config: RabbitMQConfig) {
    super(config, InstanceType.CLIENT);
    this.channel_client = this.getChannel();
  }

  async publish(data: AMQPPublishData): Promise<boolean> {
    const { exchange, message, routing_key, options } = data;

    const publish_options = this.getPublishOptions(options);

    try {
      const result = await (await this.channel_client).publish(
        exchange || '',
        routing_key,
        converter({ body: message }),
        publish_options
      );

      return result
    } catch (err) {
      throw Error(
        `Error Posting Message to RabbitMQ Server - cause ${err.message}`
      );
    }
  }

  private getPublishOptions(options?: AMQPPublishOptions): Options.Publish {
    if (!options) return {};

    const { delivery_mode, content_encoding, content_type, priority } = options;
    return {
      deliveryMode: delivery_mode,
      contentEncoding: content_encoding,
      contentType: content_type,
      priority,
    };
  }
}
