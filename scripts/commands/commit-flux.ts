import path from 'path';
import env from './env';
import command from './command';

const flux = path.join(env.PROJECT_DIR, 'flux');

command(`mkdir -p  ${env.RELEASE_DIR}`, { cwd: flux });
command(`cp -r ../deployment/kubernetes/* ${env.RELEASE_DIR}`, { cwd: flux });
command(`git add ${env.RELEASE_DIR}`, { cwd: flux });
command('git status', { cwd: flux });
command(`git commit -m "${env.PROJECT_NAME} ${env.DOCKER_TAG} ${env.COMMIT_SHORT_SHA}"`, { cwd: flux });
command('git pull', { cwd: flux });
command(`git push -u origin `, { cwd: flux });

process.exit(0);
