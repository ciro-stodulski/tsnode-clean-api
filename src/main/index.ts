import { App } from './app';
import { EventEmmiter } from './event';
import { AppState } from './enum';
import { logger } from './logger';

const application = new App({});

setImmediate(async () => {
  try {
    const event = EventEmmiter.getInstance();

    event.on(AppState.RESTART, async (data: any) => {
      await application.restart();
    });
    await application.start();
  } catch (error) {
    // eslint-disable-next-line
    logger.error({ error });
  }
});
