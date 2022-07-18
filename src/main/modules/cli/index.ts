import { CliModule } from '..';
import { Container } from '../../container';

setImmediate(async () => {
  await new CliModule(new Container()).start();
});
