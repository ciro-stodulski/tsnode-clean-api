import { EventDto } from 'src/application/use-cases';

export interface INotificationService {
  sendNotify(dto: EventDto): Promise<void>;
  checkNotify(msg: string): Promise<void>;
}
