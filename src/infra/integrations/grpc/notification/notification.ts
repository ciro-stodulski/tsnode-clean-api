import path from 'path';
import { plainToInstance } from 'class-transformer';
import { env, logger } from 'src/shared';
import { IGRPCClient } from 'src/infra/integrations';
import { INotificationPB, INotificationProto } from 'src/domain/integrations';
import { EventDto } from 'src/domain/dto';

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

      return plainToInstance(EventDto, data.event);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
