import './styles/styles.scss';

import { render } from './app/utils/renderDOM';
import { Main } from './app/layout/main';
import { router } from './app/services/router/router';
import store from './app/store/store';
import { Signin } from './app/pages/auth/signin';
import { Signup } from './app/pages/auth/signup';
import { ChatPage } from './app/pages/chat-page';
import { Profile } from './app/pages/profile';
import { ServerError } from './app/pages/server-error';
import { ClientError } from './app/pages/client-error';
import { authService } from './app/services/auth/auth.service';

async function hasAuthentication() {
  if (store.getState()?.user) return true;
  return authService.getUserData()
    .then(() => true)
    .catch((e) => {
      console.log(e.reason || e.error);
      return false;
    });
}

async function hasLogout() {
  if (store.getState()?.user) return false;
  return authService.getUserData()
    .then(() => false)
    .catch((e) => {
      console.log(e.reason || e.error);
      return true;
    });
}

router
  .use('/signin', Signin, hasLogout, '/messenger')
  .use('/signup', Signup, hasLogout, '/messenger')
  .use('/messenger/:id', ChatPage, hasAuthentication, '/signin')
  .use('/profile', Profile, hasAuthentication, '/signin')
  .use('/server-error', ServerError)
  .use('**', ClientError);

if (document.location.pathname === '/') {
  router.go('/signin');
}

router.start();

render('#app', new Main({}));
