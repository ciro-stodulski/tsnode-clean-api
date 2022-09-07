import dotenv from 'dotenv';
import path from 'path';

// @ts-ignore
import { name, version } from '../../package.json';

dotenv.config();

const FLUX_REPOSITORY = process.env.FLUX_REPOSITORY || '';
const BUILD_SOURCEBRANCHNAME = process.env.BUILD_SOURCEBRANCHNAME || '';
const ENVIRONMENT_NAME =
  BUILD_SOURCEBRANCHNAME === 'main' ? 'production' : BUILD_SOURCEBRANCHNAME;

const COMMIT_REF_NAME = BUILD_SOURCEBRANCHNAME.substring(0, 8);
const COMMIT_SHORT_SHA = process.env.BUILD_SOURCEVERSION || '';
export const IS_DEVELOP = COMMIT_REF_NAME === 'develop';
export const IS_MAIN = COMMIT_REF_NAME === 'main';

const env = {
  NAME: name,
  VERSION: version,
  SERVICEPORT: '3000',
  FLUX_REPOSITORY,
  PROJECT_NAMESPACE: IS_MAIN
    ? process.env.MAIN_PROJECT_NAMESPACE || ''
    : process.env.DEVELOP_PROJECT_NAMESPACE || '',
  DOCKER_REGISTRY_URL: IS_MAIN
    ? process.env.MAIN_DOCKER_REGISTRY_URL || ''
    : process.env.DEVELOP_DOCKER_REGISTRY_URL || '',
  ISTIO_VIRTUAL_SERVICE: IS_MAIN
    ? process.env.MAIN_ISTIO_VIRTUAL_SERVICE || ''
    : process.env.DEVELOP_ISTIO_VIRTUAL_SERVICE || '',
  REPLICAS_MIN_P: IS_MAIN
    ? process.env.MAIN_REPLICAS_MIN_P || '1'
    : process.env.DEVELOP_REPLICAS_MIN_P || '1',
  REPLICAS_MIN_M: IS_MAIN
    ? process.env.MAIN_REPLICAS_MIN_M || '1'
    : process.env.DEVELOP_REPLICAS_MIN_M || '1',
  REPLICAS_MIN_G: IS_MAIN
    ? process.env.MAIN_REPLICAS_MIN_G || '1'
    : process.env.DEVELOP_REPLICAS_MIN_G || '1',
  REPLICAS_MIN_GG: IS_MAIN
    ? process.env.MAIN_REPLICAS_MIN_GG || '1'
    : process.env.DEVELOP_REPLICAS_MIN_GG || '1',
  REPLICAS_MAX_P: IS_MAIN
    ? process.env.MAIN_REPLICAS_MAX_P || '1'
    : process.env.DEVELOP_REPLICAS_MAX_P || '1',
  REPLICAS_MAX_M: IS_MAIN
    ? process.env.MAIN_REPLICAS_MAX_M || '1'
    : process.env.DEVELOP_REPLICAS_MAX_M || '1',
  REPLICAS_MAX_G: IS_MAIN
    ? process.env.MAIN_REPLICAS_MAX_G || '1'
    : process.env.DEVELOP_REPLICAS_MAX_G || '1',
  REPLICAS_MAX_GG: IS_MAIN
    ? process.env.MAIN_REPLICAS_MAX_GG || '1'
    : process.env.DEVELOP_REPLICAS_MAX_GG || '1',
  CLUSTER: IS_MAIN
    ? process.env.MAIN_CLUSTER || ''
    : process.env.DEVELOP_CLUSTER || '',
  OIDC_SERVICES_ISSUER: IS_MAIN
    ? process.env.MAIN_OIDC_SERVICES_ISSUER || ''
    : process.env.DEVELOP_OIDC_SERVICES_ISSUER || '',
  OIDC_SERVICES_JWKS_URI: IS_MAIN
    ? process.env.MAIN_OIDC_SERVICES_JWKS_URI || ''
    : process.env.DEVELOP_OIDC_SERVICES_JWKS_URI || '',
  PROJECT_DIR: process.env.SYSTEM_DEFAULTWORKINGDIRECTORY || '',
  PROJECT_NAME: process.env.BUILD_REPOSITORY_NAME || '',
  USER_EMAIL: process.env.BUILD_REQUESTEDFOREMAIL || '',
  USER_NAME: process.env.BUILD_REQUESTEDFOR || '',

  COMMIT_REF_NAME,
  COMMIT_SHORT_SHA,
  ENVIRONMENT_NAME,
};

const DOCKER_REPOSITORY = [env.PROJECT_NAMESPACE, env.PROJECT_NAME].join('/');

const DOCKER_TAG = [
  env.VERSION,
  env.COMMIT_REF_NAME,
  env.COMMIT_SHORT_SHA,
].join('-');

const DOCKER_IMAGE = [
  env.DOCKER_REGISTRY_URL,
  '/',
  DOCKER_REPOSITORY,
  ':',
  DOCKER_TAG,
].join('');

const DEPLOYMENT_DIR = path.join(env.PROJECT_DIR, 'deployment');
const KUBERNETES_DIR = path.join(DEPLOYMENT_DIR, 'kubernetes');
const SCRIPT_DIR = path.join(env.PROJECT_DIR, 'scripts', 'kubernetes');
const RELEASE_DIR = path.join(
  env.CLUSTER,
  env.PROJECT_NAMESPACE,
  env.PROJECT_NAME
);

console.log(Object.freeze({
  ...env,
  DOCKER_REPOSITORY,
  DOCKER_TAG,
  DOCKER_IMAGE,
  DEPLOYMENT_DIR,
  KUBERNETES_DIR,
  SCRIPT_DIR,
  RELEASE_DIR,
}))

export default Object.freeze({
  ...env,
  DOCKER_REPOSITORY,
  DOCKER_TAG,
  DOCKER_IMAGE,
  DEPLOYMENT_DIR,
  KUBERNETES_DIR,
  SCRIPT_DIR,
  RELEASE_DIR,
});
