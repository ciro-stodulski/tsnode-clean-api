import { EventDto } from '..';

export interface IVerifyNotificationUseCase {
  Notify(dto: EventDto): Promise<void>;
}
