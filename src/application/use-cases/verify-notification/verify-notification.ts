import { EventDto } from '..';
import { IVerifyNotificationUseCase } from '../../../domain/use-cases';
import { INotificationService } from '../../../domain/services';

export class VerifyNotificationUseCase implements IVerifyNotificationUseCase {
  constructor(private notification_service: INotificationService) {}

  async notify(dto: EventDto): Promise<void> {
    await this.notification_service.checkNotify(dto.name);
  }
}
