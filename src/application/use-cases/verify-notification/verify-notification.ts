import { IVerifyNotificationUseCase } from 'src/domain/use-cases';
import { INotificationService } from 'src/domain/services';
import { EventDto } from 'src/domain/dto';

export class VerifyNotificationUseCase implements IVerifyNotificationUseCase {
  constructor(private notification_service: INotificationService) {}

  async notify(dto: EventDto): Promise<void> {
    await this.notification_service.checkNotify(dto.name);
  }
}
