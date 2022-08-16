import { EventDto } from '../../../core/use-cases';
import { INotificationService } from '../../../core/ports';
import { INotificationProto, INotificationProducer } from '../../integrations';

export class NotificationService implements INotificationService {
  constructor(
    private notification_proto: INotificationProto,
    private notification_producer: INotificationProducer
  ) {}

  async sendNotify(dto: EventDto): Promise<void> {
    await this.notification_producer.SendNotify(dto);
  }

  async checkNotify(msg: string): Promise<void> {
    await this.notification_proto.verify(msg);
  }
}
