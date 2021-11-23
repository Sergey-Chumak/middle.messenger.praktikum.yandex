import './app/layout/main';
import './styles/styles.scss';
import { profile } from './app/pages/profile';
import { auth } from './app/pages/auth';
import { registration } from './app/pages/registration';
import { serverError } from './app/pages/server-error';
import { chatPage } from './app/pages/chat-page';
import { clientError } from './app/pages/client-error';

const $pageWrapper = document.querySelector('#page-wrapper') as HTMLDivElement;

if (document.location.href === `${document.location.origin}/profile`) {
  $pageWrapper.innerHTML = profile;
} else if (document.location.href === `${document.location.origin}/auth` || document.location.href === `${document.location.origin}/`) {
  $pageWrapper.innerHTML = auth;
} else if (document.location.href === `${document.location.origin}/registration`) {
  $pageWrapper.innerHTML = registration;
} else if (document.location.href === `${document.location.origin}/server-error`) {
  $pageWrapper.innerHTML = serverError;
} else if (document.location.href === `${document.location.origin}/chat-page`) {
  $pageWrapper.innerHTML = chatPage;
} else {
  $pageWrapper.innerHTML = clientError;
}
