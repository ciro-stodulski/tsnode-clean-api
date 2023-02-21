import { App } from 'src/main/app';
import { EventEmmiter, logger } from 'src/shared';
import { AppState } from 'src/main/enum';

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
