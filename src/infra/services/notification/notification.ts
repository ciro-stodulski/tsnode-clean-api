import { EventDto } from 'src/application/use-cases';
import { INotificationService } from 'src/domain/services';
import {
  INotificationProto,
  INotificationProducer,
} from 'src/infra/integrations';
import { logger } from 'src/shared';

export class NotificationService implements INotificationService {
  constructor(
    private notification_proto: INotificationProto,
    private notification_producer: INotificationProducer
  ) {}

  async sendNotify(dto: EventDto): Promise<void> {
    await this.notification_producer.SendNotify(dto);
  }

  async checkNotify(msg: string): Promise<void> {
    const result = await this.notification_proto.verify(msg);

    logger.info({ result });
  }
}
