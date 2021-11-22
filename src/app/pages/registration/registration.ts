import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './registration.tmpl';
import { input } from '../../components/ui/input';
import { button } from '../../components/ui/button';

Handlebars.registerPartial('email', input({
  type: 'email',
  id: 'email',
  labelName: 'Email',
  autocomplete: 'off',
  value: '',
}));

Handlebars.registerPartial('login', input({
  type: 'text',
  id: 'login',
  labelName: 'Login',
  autocomplete: 'off',
  value: '',
}));

Handlebars.registerPartial('name', input({
  type: 'text',
  id: 'first_name',
  labelName: 'Name',
  autocomplete: 'off',
  value: '',
}));

Handlebars.registerPartial('lastName', input({
  type: 'text',
  id: 'second_name',
  labelName: 'Last name',
  autocomplete: 'off',
  value: '',
}));

Handlebars.registerPartial('phone', input({
  type: 'email',
  id: 'phone',
  labelName: 'Phone',
  autocomplete: 'off',
  value: '',
}));

Handlebars.registerPartial('password', input({
  type: 'password',
  id: 'password',
  labelName: 'Password',
  autocomplete: 'off',
  value: '',
}));

Handlebars.registerPartial('repeatPassword', input({
  type: 'password',
  id: 'repeat_password',
  labelName: 'Password (repeat)',
  autocomplete: 'off',
  value: '',
}));

Handlebars.registerPartial('submitBtn', button({
  name: 'Sign up',
  id: 'registration-btn',
  size: 'l',
  color: 'secondary',
}));

export const registration = Handlebars.compile(tmpl)({});

new Promise<void>((resolve) => {
  resolve();
}).then(() => {
  document.querySelector('#registration-btn')
    ?.addEventListener('click', () => {
      document.location.href = 'chat-page';
    });
});
