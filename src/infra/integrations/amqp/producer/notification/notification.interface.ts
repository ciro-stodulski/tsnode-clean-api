import { EventDto } from "../../../../../core/use-cases";

export interface INotificationProducer {
  SendNotify(dto: EventDto): Promise<void>;
}
