import './app/layout/main';
import './styles.scss';
import last from './app/utils/last';
import { profile } from './app/pages/profile';
import { auth } from './app/pages/auth';
import { registration } from './app/pages/registration';
import { serverError } from './app/pages/server-error';
import { chatPage } from './app/pages/chat-page';
import { clientError } from './app/pages/client-error';

const $pageWrapper = document.querySelector('#page-wrapper');

if (last(document.location.href.split('/')) === ('profile')) {
  $pageWrapper.innerHTML = profile;
} else if (last(document.location.href.split('/')) === 'auth' || document.location.href === 'http://localhost:3000/') {
  $pageWrapper.innerHTML = auth;
} else if (last(document.location.href.split('/')) === 'registration') {
  $pageWrapper.innerHTML = registration;
} else if (last(document.location.href.split('/')) === 'server-error') {
  $pageWrapper.innerHTML = serverError;
} else if (last(document.location.href.split('/')) === 'chat-page') {
  $pageWrapper.innerHTML = chatPage;
} else {
  $pageWrapper.innerHTML = clientError;
}
