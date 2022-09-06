import path from 'path';
import env, { IS_DEVELOP, IS_MAIN } from './env';
import command from './command';

const flux = path.join(env.PROJECT_DIR, 'flux');

if (!IS_DEVELOP && !IS_MAIN) {
  process.exit(1);
}
command(`git config --global user.email "${env.USER_EMAIL}"`);
command(`git config --global user.name "${env.USER_NAME}"`);
command(`git clone --single-branch --depth=1 -b ${env.COMMIT_REF_NAME} ${env.FLUX_REPOSITORY} flux`, { log: false });
command(`mkdir -p  ${env.RELEASE_DIR}`, { cwd: flux });
command(`cp -r ../deployment/kubernetes/* ${env.RELEASE_DIR}`, { cwd: flux });
command(`git add ${env.RELEASE_DIR}`, { cwd: flux });
command('git status', { cwd: flux });
command(`git commit -m "${env.PROJECT_NAME} ${env.DOCKER_TAG} ${env.COMMIT_SHORT_SHA}"`, { cwd: flux });
command('git pull', { cwd: flux });
command(`git push -u origin ${env.COMMIT_REF_NAME}`, { cwd: flux });

process.exit(0);
