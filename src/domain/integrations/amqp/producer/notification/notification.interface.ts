import { EventDto } from 'src/domain/dto';

export interface INotificationProducer {
  SendNotify(dto: EventDto): Promise<void>;
}
