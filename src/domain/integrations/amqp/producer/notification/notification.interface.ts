import { EventDto } from '../../../../../application/use-cases';

export interface INotificationProducer {
  SendNotify(dto: EventDto): Promise<void>;
}
