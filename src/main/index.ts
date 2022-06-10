import { App } from './app';

const appliction = new App({});

setImmediate(async () => {
  try {
    await appliction.start();
  } catch (error) {
    // eslint-disable-next-line
    console.log({ error });
  }
});
