import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './auth.tmpl';
import { input } from '../../components/ui/input';
import { button } from '../../components/ui/button';
import { Button } from '../../components/ui/test-button';
import { render } from '../../utils/renderDOM';
import Block from '../../services/block';
import { IProps } from '../../services/types';

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
  value: '',
}));

Handlebars.registerPartial('submitBtn', button({
  color: 'secondary',
  name: 'Sign in',
  size: 'l',
  class: 'auth__button',
  id: 'auth-btn',
}));

export const auth: string = Handlebars.compile(tmpl)({});

const profileTemplate = `
    <div>
    {{ userName }}
        {{{ button }}}
    </div>
`;

class UserProfile extends Block {
  constructor(props: IProps) {
    super('div', props);
  }
  render() {
    console.log(this.compile(profileTemplate, {
      userName: this.props.userName,
      button: this.props.button,
    }));
    return this.compile(profileTemplate, {
      userName: this.props.userName,
      button: this.props.button,
    });
  }
}

const profile = new UserProfile({
  userName: 'John Doe',
  button: new Button({ child: 'Change name', settings: { withInternalID: true } }),
});

render('#app', profile);

new Promise<void>((resolve) => {
  resolve();
}).then(() => {
  document.querySelector('#auth-btn')
    ?.addEventListener('click', () => {
      document.location.href = 'chat-page';
    });
});
