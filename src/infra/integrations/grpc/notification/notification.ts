import path from 'path';
import { env, logger } from '../../../../shared';
import { INotificationProto, IGRPCClient, INotificationPB } from '../..';
import { EventDto } from '../../../../core/use-cases';
import { plainToInstance } from 'class-transformer';
export class NotificationPB implements INotificationProto {
  protected readonly service: INotificationPB;

  constructor(private readonly grpc_client: IGRPCClient) {
    this.service = this.grpc_client.createInstance<INotificationPB>({
      path: path.join(__dirname, './notification.proto'),
      host: env.client_grpc_host,
      service: 'NotificationPb',
      grpc_package: 'proto_notification',
    });
  }

  async verify(msg: string): Promise<EventDto> {
    try {
      const data = await this.service.verify(msg);
      // @ts-ignore
      console.log(plainToInstance(EventDto, data.event))
      return plainToInstance(EventDto, data.event);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
