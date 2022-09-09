/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import env from './env';

/* Dirs */
fs.mkdirSync(env.DEPLOYMENT_DIR);
fs.mkdirSync(env.KUBERNETES_DIR);

const pattern = path.join(env.SCRIPT_DIR, '**/*.yaml');
glob(pattern, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const name = path.basename(file);
    const raw = fs.readFileSync(file);

    const yaml = `${raw}`
      .replace(/\$PROJECT_NAME/g, env.PROJECT_NAME)
      .replace(/\$COMMIT_SHORT_SHA/g, env.COMMIT_SHORT_SHA)
      .replace(/\$NAMESPACE/g, env.PROJECT_NAMESPACE)
      .replace(/\$ENVIRONMENT_NAME/g, env.ENVIRONMENT_NAME)
      .replace(/\$SERVICEPORT/g, env.SERVICEPORT)
      .replace(/\$APP_VERSION/g, env.VERSION)
      .replace(/\$DOCKER_IMAGE/g, env.DOCKER_IMAGE);

    console.log(yaml);

    fs.writeFileSync(path.join(env.KUBERNETES_DIR, name), yaml);
  }

  process.exit(0);
});
