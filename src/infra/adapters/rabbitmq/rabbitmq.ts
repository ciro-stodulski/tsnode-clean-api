import { Connection, Channel, connect } from 'amqplib';
import { RabbitMQConfig } from './type';
import { AMQPChannelEvent, AMQPErrorCode } from './enum';
import { EventEmmiter } from '../../../main/event';
import { AppState } from '../../../main/enum';

export class RabbitqmAdapter {
  private connection: Connection;

  private channel: Channel;

  private event: EventEmmiter = EventEmmiter.getInstance();

  private timeout_id: NodeJS.Timeout;

  constructor(private config: RabbitMQConfig) {}

  async toConnect(): Promise<Channel> {
    try {
      clearTimeout(this.timeout_id);

      const { username, password, host, port, vhost } = this.config;

      this.connection = await connect(
        `${this.config.protocol}://${username}:${password}@${host}:${port}/${vhost}`
      );

      this.connection.on(AMQPChannelEvent.CLOSE, () => {
        this.reconnect();
      });

      console.info(
        `RabbitMQ Client: connection established on host - ${this.config.host}:${port}`
      );

      this.channel = await this.connection.createChannel();

      this.channel.on(AMQPChannelEvent.CANCEL, () => {
        this.reconnect();
      });

      this.channel.on(AMQPChannelEvent.ERROR, error => {
        if (error.code === AMQPErrorCode.NOT_FOUND) {
          this.reconnect();
        }
      });
    } catch (error) {
      this.reconnect();
    }
    return this.channel;
  }

  private reconnect(): void {
    console.warn(
      `Trying to connect to rabbitmq on virtual host ${this.config.vhost} in 5 seconds`
    );

    this.timeout_id = setTimeout(async () => {
      this.event.emit(AppState.RESTART);
    }, 5000);
  }
}
