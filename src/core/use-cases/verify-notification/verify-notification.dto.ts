import { Expose } from 'class-transformer';

export class EventDto {
  @Expose({ name: 'Name' })
  name: string;
  @Expose({ name: 'Describe' })
  describe: string;
}
