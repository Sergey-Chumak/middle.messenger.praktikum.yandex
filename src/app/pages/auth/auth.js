import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './auth.tmpl';
import { input } from '../../components/ui/input';
import { button } from '../../components/ui/button';

Handlebars.registerPartial('login', input({
  type: 'text',
  name: 'login',
  labelName: 'Login',
  autocomplete: 'off',
  class: 'auth__login',
}));

Handlebars.registerPartial('password', input({
  name: 'pass',
  type: 'password',
  labelName: 'Password',
  autocomplete: 'off',
  isError: true,
  errorMessage: 'error password',
}));

Handlebars.registerPartial('submitBtn', button({
  color: 'secondary',
  name: 'Sign in',
  size: 'l',
  class: 'auth__button',
  id: 'auth-btn',
}));

export const auth = Handlebars.compile(tmpl)({});

new Promise((resolve) => {
  resolve();
}).then(() => {
  document.querySelector('#auth-btn')
    ?.addEventListener('click', () => {
      document.location.href = 'chat-page';
    });
});
