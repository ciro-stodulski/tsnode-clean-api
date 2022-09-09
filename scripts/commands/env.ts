import dotenv from 'dotenv';
import path from 'path';

// @ts-ignore
import { name, version } from '../../package.json';

dotenv.config();

const COMMIT_SHORT_SHA = process.env.GITHUB_SHA || '';
const COMMIT_REF_NAME = (process.env.GITHUB_REF || '').substring(0, 8);

const env = {
  NAME: name,
  VERSION: version,
  COMMIT_REF_NAME,
  SERVICEPORT: '3000',
  FLUX_REPOSITORY: 'https://github.com/ciro-stodulski/flux',
  PROJECT_NAMESPACE: 'develop',
  PROJECT_DIR: "develop",
  PROJECT_NAME: name,
  USER_EMAIL: 'ciro.sda@gmail.com',
  USER_NAME: 'ciro-stodulski',
  COMMIT_SHORT_SHA,
  ENVIRONMENT_NAME: 'develop',
  DOCKER_IMAGE: 'test',
  CLUSTER: 'lab-stodulski'
};

const DOCKER_REPOSITORY = [env.PROJECT_NAMESPACE, env.PROJECT_NAME].join('/');

const DOCKER_TAG = [
  env.VERSION,
  env.COMMIT_REF_NAME,
  env.COMMIT_SHORT_SHA,
].join('-');

const DEPLOYMENT_DIR = path.join(env.PROJECT_DIR, 'deployment');
const KUBERNETES_DIR = path.join(DEPLOYMENT_DIR, 'kubernetes');
const SCRIPT_DIR = path.join(env.PROJECT_DIR, 'scripts', 'kubernetes');
const RELEASE_DIR = path.join(
  env.PROJECT_NAMESPACE,
  env.PROJECT_NAME
);

console.log(Object.freeze({
  ...env,
  DOCKER_REPOSITORY,
  DOCKER_TAG,
  DEPLOYMENT_DIR,
  KUBERNETES_DIR,
  SCRIPT_DIR,
  RELEASE_DIR,
}))

export default Object.freeze({
  ...env,
  DOCKER_REPOSITORY,
  DOCKER_TAG,
  DEPLOYMENT_DIR,
  KUBERNETES_DIR,
  SCRIPT_DIR,
  RELEASE_DIR,
});
