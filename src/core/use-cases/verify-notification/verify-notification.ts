import { IVerifyNotificationUseCase, EventDto } from '..';
import { INotificationService } from '../../ports';

export class VerifyNotificationUseCase implements IVerifyNotificationUseCase {
  constructor(private notification_service: INotificationService) {}

  async notify(dto: EventDto): Promise<void> {
    await this.notification_service.checkNotify(dto.name);
  }
}
