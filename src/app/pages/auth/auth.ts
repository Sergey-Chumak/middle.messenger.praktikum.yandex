import { tmpl } from './auth.tmpl';
import { Button } from '../../components/ui/button';
import Block from '../../services/block';
import { Input } from '../../components/ui/input';
import { isValidLogin, isValidPassword } from '../../utils/validate';
import { IChildrenAuth, IPropsAuth, ISignInFormValue } from './types';
import { IEvents } from '../../services/types';

export class Auth extends Block<IPropsAuth, IChildrenAuth> {
  signInFormValue: ISignInFormValue = {
    login: '',
    password: '',
  };

  get isValidSignInForm(): boolean {
    return isValidLogin(this.signInFormValue.login)
        && isValidPassword(this.signInFormValue.password);
  }

  constructor(props: IPropsAuth) {
    super('div', props);
    this.initChildren();
  }

  componentDidMount(): void {
    this.initComponentEvents();
    this.initChildrenEvents();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      loginInput: this.props.loginInput,
      passwordInput: this.props.passwordInput,
      submitBtn: this.props.submitBtn,
    });
  }

  initChildren(): void {
    this.children.loginInput = new Input({
      value: this.signInFormValue.login,
      id: 'login',
      labelName: 'Login',
      type: 'text',
      errorMessage: 'Login is invalid',
    });

    this.children.passwordInput = new Input({
      value: this.signInFormValue.password,
      id: 'password',
      labelName: 'Password',
      errorMessage: 'Password is invalid',
      type: 'password',
    });

    this.children.submitBtn = new Button({
      name: 'Sign in',
      color: 'secondary',
      size: 'l',
      class: 'auth__button',
      type: 'button',
    });
  }

  initComponentEvents(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'create-account-link') return;
          document.location.href = '/registration';
        },
      },
    });
  }

  initChildrenEvents(): void {
    this.children.loginInput.setProps({
      events: this.getInputEvents('loginInput', 'login', isValidLogin),
    });
    this.children.passwordInput.setProps({
      events: this.getInputEvents('passwordInput', 'password', isValidPassword),
    });
    this.children.submitBtn.setProps({
      events: {
        click: () => {
          this.submit();
        },
      },
    });
  }

  getInputEvents(inputName: string, formField: string, validator: (text: string) => boolean): IEvents {
    return {
      input: (event) => {
        const target = event?.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        this.signInFormValue[formField] = target.value;
      },
      focusout: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator((this.signInFormValue[formField]))) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
      focusin: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.signInFormValue[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
    };
  }

  submit(): void {
    if (!isValidLogin(this.signInFormValue.login)) {
      this.children.loginInput.getContent().classList.add('ui-input_invalid');
    }

    if (!isValidPassword(this.signInFormValue.password)) {
      this.children.passwordInput.getContent().classList.add('ui-input_invalid');
    }

    if (!this.isValidSignInForm) return;
    setTimeout(() => { document.location.href = 'chat-page'; }, 2000);
  }
}
