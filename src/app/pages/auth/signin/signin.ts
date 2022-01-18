import { tmpl } from './signin.tmpl';
import { Button } from '../../../components/ui/button';
import Block from '../../../services/block/block';
import { Input } from '../../../components/ui/input';
import { isValidLogin, isValidPassword } from '../../../utils/validate';
import {
  ChildrenSigninKeys, IChildrenSignin, IPropsSignin, ISigninFormValue, SigninFormKeys,
} from './signin.types';
import { IEvents } from '../../../services/types';
import { Snackbar } from '../../../components/ui/snackbar';
import { ucFirstLetter } from '../../../utils/ucFirstLetter';
import { authService } from '../../../services/auth/auth.service';
import { router } from '../../../services/router/router';

export class Signin extends Block<IPropsSignin, IChildrenSignin> {
  signInFormValue: ISigninFormValue = {
    [SigninFormKeys.Login]: '',
    [SigninFormKeys.Password]: '',
  };

  get isValidSignInForm(): boolean {
    return isValidLogin(this.signInFormValue.login)
        && isValidPassword(this.signInFormValue.password);
  }

  constructor(props: IPropsSignin) {
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
      snackbar: this.props.snackbar,
    });
  }

  initChildren(): void {
    this.children.snackbar = new Snackbar({
      text: '',
    });

    this.children.loginInput = new Input({
      value: this.signInFormValue.login,
      id: 'signin-login',
      labelName: 'Login',
      type: 'text',
      errorMessage: 'Login is invalid',
    });

    this.children.passwordInput = new Input({
      value: this.signInFormValue.password,
      id: 'signin-password',
      labelName: 'Password',
      errorMessage: 'Password is invalid',
      type: 'password',
    });

    this.children.submitBtn = new Button({
      name: 'Sign in',
      color: 'secondary',
      size: 'l',
      class: 'signin__button',
      type: 'button',
    });
  }

  initComponentEvents(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'create-account-link') return;
          this.resetForm();
          router.go('/signup');
        },
      },
    });
  }

  initChildrenEvents(): void {
    this.children.loginInput.setProps({
      events: this.getInputEvents(ChildrenSigninKeys.LoginInput, SigninFormKeys.Login, isValidLogin),
    });
    this.children.passwordInput.setProps({
      events: this.getInputEvents(ChildrenSigninKeys.PasswordInput, SigninFormKeys.Password, isValidPassword),
    });
    this.children.submitBtn.setProps({
      events: {
        click: () => {
          this.submit();
        },
      },
    });
  }

  getInputEvents(
    inputName: ChildrenSigninKeys,
    formField: SigninFormKeys,
    validator: (text: string) => boolean,
  ): IEvents {
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
    authService.login(this.signInFormValue)
      .then(() => {
        this.resetForm();
        router.go('/messenger');
      })
      .catch((e) => {
        this.children.snackbar.setProps({
          text: ucFirstLetter(e.reason || e.error),
          color: 'error',
        });
      });
  }

  resetForm() {
    this.children.loginInput.setProps({ value: '' });
    this.children.loginInput.getContent().classList.remove('ui-input_invalid');

    this.children.passwordInput.setProps({ value: '' });
    this.children.passwordInput.getContent().classList.remove('ui-input_invalid');

    this.signInFormValue[SigninFormKeys.Login] = '';
    this.signInFormValue[SigninFormKeys.Password] = '';
  }
}
