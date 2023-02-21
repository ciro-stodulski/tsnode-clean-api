import { EventDto } from 'src/domain/dto';

export interface INotificationService {
  sendNotify(dto: EventDto): Promise<void>;
  checkNotify(msg: string): Promise<void>;
}
