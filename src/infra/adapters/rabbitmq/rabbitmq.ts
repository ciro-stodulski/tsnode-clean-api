import { Connection, Channel, connect } from 'amqplib';
import { RabbitMQConfig } from './type';
import { AMQPChannelEvent, AMQPErrorCode, InstanceType } from './enum';
import { EventEmmiter } from '../../../main/event';
import { AppState } from '../../../main/enum';
import { logger } from '../../../main/logger';

export class RabbitqmAdapter {
  private connection: Connection;

  private channel: Channel;

  private event: EventEmmiter = EventEmmiter.getInstance();

  private timeout_id: NodeJS.Timeout;

  constructor(private config: RabbitMQConfig, private readonly type: string) {}

  async getChannel(): Promise<Channel> {
    try {
      await this.startConnect();

      this.channel = await this.connection.createChannel();

      this.channel.on(AMQPChannelEvent.CANCEL, async () => {
        this.type === InstanceType.SERVER && this.reconnect();
      });

      this.channel.on(AMQPChannelEvent.ERROR, async error => {
        if (error.code === AMQPErrorCode.NOT_FOUND) {
          logger.error(error);
          this.type === InstanceType.CLIENT && (await this.reconnect());
        }
      });
    } catch (error) {
      logger.error('Rabbitmq:', error);
      this.type === InstanceType.SERVER && this.reconnect();
    }

    return this.channel;
  }

  private async startConnect(): Promise<void> {
    clearTimeout(this.timeout_id);

    const { username, password, host, port, vhost } = this.config;

    this.connection = await connect(
      `${this.config.protocol}://${username}:${password}@${host}:${port}/${vhost}`
    );

    this.connection.on(AMQPChannelEvent.CLOSE, async () => {
      this.type === InstanceType.SERVER && (await this.reconnect());
    });

    logger.info(
      `RabbitMQ ${this.type}: connection established on host - ${this.config.host}:${port}`
    );
  }

  async reconnect(): Promise<void> {
    logger.warn(
      `Trying to connect to rabbitmq on virtual host ${this.config.vhost} in 5 seconds`
    );

    this.timeout_id = setTimeout(() => {
      this.event.emit(AppState.RESTART);
    }, 5000);
  }
}
