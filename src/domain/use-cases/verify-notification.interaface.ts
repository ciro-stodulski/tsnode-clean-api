import { EventDto } from '../../application/use-cases' ;

export interface IVerifyNotificationUseCase {
  notify(dto: EventDto): Promise<void>;
}
