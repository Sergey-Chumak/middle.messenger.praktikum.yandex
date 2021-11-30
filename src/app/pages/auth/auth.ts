import { tmpl } from './auth.tmpl';
import { Button } from '../../components/ui/button';
import Block from '../../services/block';
import { TPropsAndChildren } from '../../services/types';
import { Input } from '../../components/ui/input';
import { isValidLogin, isValidPassword } from '../../utils/validate';
import { ISignInFormValue } from './types';

export class Auth extends Block {
  signInFormValue: ISignInFormValue = {
    login: '',
    password: '',
  };

  get isValidSignInForm(): boolean {
    return isValidLogin(this.signInFormValue.login)
        && isValidPassword(this.signInFormValue.password);
  }

  constructor(props: TPropsAndChildren) {
    super('div', props);
    this.initChildren();
  }

  submit() {
    console.log('form', this.isValidSignInForm);
    if (!this.isValidSignInForm) return;
    console.log(this.signInFormValue);
    setTimeout(() => { document.location.href = 'chat-page'; }, 2000);
  }

  render() {
    return this.compile(tmpl, {
      loginInput: this.children.loginInput,
      passwordInput: this.children.passwordInput,
      button: this.children.button,
    });
  }

  initChildren() {
    this.children.loginInput = new Input({
      value: this.signInFormValue.login,
      id: 'login',
      labelName: 'Login',
      type: 'text',
      errorMessage: 'Login is invalid',
      events: {
        ...this.initInputEvents('loginInput', 'login', isValidLogin),
      },
    });

    this.children.passwordInput = new Input({
      value: this.signInFormValue.password,
      id: 'password',
      labelName: 'Password',
      errorMessage: 'Password is invalid',
      type: 'password',
      events: {
        ...this.initInputEvents('passwordInput', 'password', isValidPassword),
      },
    });

    this.children.button = new Button({
      name: 'Sign in',
      color: 'secondary',
      size: 'l',
      class: 'auth__button',
      type: 'button',
      settings: { withInternalID: true },
      events: {
        click: (event) => {
          this.submit();
        },
      },
    });
  }

  initInputEvents(inputName: string, formField: string, validator: (text: string) => boolean) {
    return {
      input: (event) => {
        const target = event.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        this.signInFormValue[formField] = target.value;
      },
      focusout: (event) => {
        if ((event.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.signInFormValue[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
      focusin: (event) => {
        if ((event.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.signInFormValue[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
    };
  }
}
