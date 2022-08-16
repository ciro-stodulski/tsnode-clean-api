import { EventDto } from '../use-cases';

export interface INotificationService {
  sendNotify(dto: EventDto): void;
  checkNotify(msg: string): void;
}
