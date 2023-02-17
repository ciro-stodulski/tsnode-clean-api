import { EventDto } from '../../../../application/use-cases';

export interface INotificationProto {
  verify(msg: string): Promise<EventDto>;
}

export interface INotificationPB {
  verify(msg: string): Promise<{ event: EventDto }>;
}
