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
      .replace(/\$COMMIT_REF_NAME/g, env.COMMIT_REF_NAME)
      .replace(/\$COMMIT_SHORT_SHA/g, env.COMMIT_SHORT_SHA)
      .replace(/\$NAMESPACE/g, env.PROJECT_NAMESPACE)
      .replace(/\$ENVIRONMENT_NAME/g, env.ENVIRONMENT_NAME)
      .replace(/\$SERVICEPORT/g, env.SERVICEPORT)
      .replace(/\$REPLICAS_MIN_P/g, env.REPLICAS_MIN_P)
      .replace(/\$REPLICAS_MIN_M/g, env.REPLICAS_MIN_P)
      .replace(/\$REPLICAS_MIN_G/g, env.REPLICAS_MIN_G)
      .replace(/\$REPLICAS_MIN_GG/g, env.REPLICAS_MIN_GG)
      .replace(/\$REPLICAS_MAX_P/g, env.REPLICAS_MAX_P)
      .replace(/\$REPLICAS_MAX_M/g, env.REPLICAS_MAX_M)
      .replace(/\$REPLICAS_MAX_G/g, env.REPLICAS_MAX_G)
      .replace(/\$REPLICAS_MAX_GG/g, env.REPLICAS_MAX_GG)
      .replace(/\$ISTIO_VIRTUAL_SERVICE/g, env.ISTIO_VIRTUAL_SERVICE)
      .replace(/\$APP_VERSION/g, env.VERSION)
      .replace(/\$OIDC_SERVICES_ISSUER/g, env.OIDC_SERVICES_ISSUER)
      .replace(/\$OIDC_SERVICES_JWKS_URI/g, env.OIDC_SERVICES_JWKS_URI)
      .replace(/\$DOCKER_IMAGE/g, env.DOCKER_IMAGE);

    fs.writeFileSync(path.join(env.KUBERNETES_DIR, name), yaml);
  }

  process.exit(0);
});
