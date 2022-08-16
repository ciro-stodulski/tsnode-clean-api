import { EventDto } from '../use-cases';

export interface INotificationService {
  sendNotify(dto: EventDto): Promise<void>;
  checkNotify(msg: string): Promise<void>;
}
