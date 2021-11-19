import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './registration.tmpl';
import { input } from '../../components/ui/input';
import { button } from '../../components/ui/button';

Handlebars.registerPartial('email', input({
  type: 'email',
  name: 'email',
  labelName: 'Email',
  autocomplete: 'off',
}));

Handlebars.registerPartial('login', input({
  type: 'text',
  name: 'login',
  labelName: 'Login',
  autocomplete: 'off',
}));

Handlebars.registerPartial('name', input({
  type: 'text',
  name: 'first_name',
  labelName: 'Name',
  autocomplete: 'off',
}));

Handlebars.registerPartial('lastName', input({
  type: 'text',
  name: 'second_name',
  labelName: 'Last name',
  autocomplete: 'off',
}));

Handlebars.registerPartial('phone', input({
  type: 'email',
  name: 'phone',
  labelName: 'Phone',
  autocomplete: 'off',
}));

Handlebars.registerPartial('password', input({
  type: 'password',
  name: 'password',
  labelName: 'Password',
  autocomplete: 'off',
}));

Handlebars.registerPartial('repeatPassword', input({
  type: 'password',
  name: 'repeat_password',
  labelName: 'Password (repeat)',
  autocomplete: 'off',
}));

Handlebars.registerPartial('submitBtn', button({
  name: 'Sign up',
  id: 'registration-btn',
  size: 'l',
  color: 'secondary',
}));

export const registration = Handlebars.compile(tmpl)({});

new Promise((resolve) => {
  resolve();
}).then(() => {
  document.querySelector('#registration-btn')
    ?.addEventListener('click', () => {
      document.location.href = 'chat-page';
    });
});
