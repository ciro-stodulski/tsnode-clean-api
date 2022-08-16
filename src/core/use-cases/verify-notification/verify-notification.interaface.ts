import { EventDto } from '..';

export interface IVerifyNotificationUseCase {
  notify(dto: EventDto): Promise<void>;
}
