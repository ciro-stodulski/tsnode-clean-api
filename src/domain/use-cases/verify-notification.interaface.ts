import { EventDto } from 'src/application/use-cases';

export interface IVerifyNotificationUseCase {
  notify(dto: EventDto): Promise<void>;
}
