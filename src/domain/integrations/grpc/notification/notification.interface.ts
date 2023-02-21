import { EventDto } from 'src/domain/dto';

export interface INotificationProto {
  verify(msg: string): Promise<EventDto>;
}

export interface INotificationPB {
  verify(msg: string): Promise<{ event: EventDto }>;
}
