import { EventDto } from 'src/domain/dto';

export interface IVerifyNotificationUseCase {
  notify(dto: EventDto): Promise<void>;
}
