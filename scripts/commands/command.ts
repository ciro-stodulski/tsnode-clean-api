import child_process from 'child_process';
import env from './env';

const options: child_process.ExecSyncOptions = {
  env: {
    ...process.env,
    ...env,
  },
  stdio: 'inherit',
};

const command = (script: string, args = {}) => {
  const config = {
    log: true,
    cwd: process.cwd(),
    ...args,
  };

  if (config.log) {
    // eslint-disable-next-line no-console
    console.info(script);
  }

  return child_process.execSync(script, {
    ...options,
    cwd: config.cwd,
  });
};

export default command;
