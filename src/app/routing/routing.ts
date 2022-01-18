import { Signin } from '../pages/auth/signin';
import { ChatPage } from '../pages/chat-page';
import { Signup } from '../pages/auth/signup';
import { router } from '../services/router/router';
import { ServerError } from '../pages/server-error';
import { ClientError } from '../pages/client-error';
import { Profile } from '../pages/profile';
import { authService } from '../services/auth/auth.service';
import store from '../store/store';

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
