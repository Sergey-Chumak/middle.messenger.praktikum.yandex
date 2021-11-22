import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './auth.tmpl';
import { input } from '../../components/ui/input';
import { button } from '../../components/ui/button';

Handlebars.registerPartial('login', input({
  type: 'text',
  id: 'login',
  labelName: 'Login',
  value: '',
  autocomplete: 'off',
  class: 'auth__login',
}));



Handlebars.registerPartial('password', input({
  id: 'pass',
  type: 'password',
  labelName: 'Password',
  autocomplete: 'off',
  isError: true,
  errorMessage: 'error password',
  value: ''
}));

Handlebars.registerPartial('submitBtn', button({
  color: 'secondary',
  name: 'Sign in',
  size: 'l',
  class: 'auth__button',
  id: 'auth-btn',
}));

export const auth: string = Handlebars.compile(tmpl)({});

new Promise<void>((resolve) => {
  resolve();
}).then(() => {
  document.querySelector('#auth-btn')
    ?.addEventListener('click', () => {
      document.location.href = 'chat-page';
    });
});
