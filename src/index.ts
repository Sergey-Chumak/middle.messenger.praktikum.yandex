import './styles/styles.scss';

import { render } from './app/utils/renderDOM';
import { Main } from './app/layout/main';
import { router } from './app/services/router/router';
import store from './app/store/store';
import { authService } from './app/services/auth/auth.service';
import { Signin } from './app/pages/auth/signin';
import { Signup } from './app/pages/auth/signup';
import { ChatPage } from './app/pages/chat-page';
import { Profile } from './app/pages/profile';
import { ServerError } from './app/pages/server-error';
import { ClientError } from './app/pages/client-error';

render('#app', new Main({}));

async function hasAuthentication() {
  if (store.getState()?.user) return true;
  return authService.getUserData()
    .then(() => true)
    .catch(() => false);
}

async function hasLogout() {
  if (store.getState()?.user) return false;
  return authService.getUserData()
    .then(() => false)
    .catch(() => true);
}

router
  .use('/signin', Signin, hasLogout, '/messenger')
  .use('/signup', Signup, hasLogout, '/messenger')
  .use('/messenger/:id', ChatPage, hasAuthentication, '/signin')
  .use('/profile', Profile, hasAuthentication, '/signin')
  .use('/server-error', ServerError)
  .use('**', ClientError);

router.start();
if (document.location.pathname === '/') {
  router.go('/signin');
}
