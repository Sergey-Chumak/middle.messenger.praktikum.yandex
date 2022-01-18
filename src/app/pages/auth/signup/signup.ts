import { tmpl } from './signup.tmpl';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import Block from '../../../services/block/block';
import {
  isValidEmail,
  isValidEqualPasswords,
  isValidLogin,
  isValidName,
  isValidPassword,
  isValidPhone,
} from '../../../utils/validate';
import {
  ChildrenSignupKeys,
  IChildrenSignup,
  IPropsSignup,
  ISignupFormValue,
  SignupFormKeys,
} from './signup.types';
import { IEvents } from '../../../services/types';
import { Snackbar } from '../../../components/ui/snackbar';
import { ucFirstLetter } from '../../../utils/ucFirstLetter';
import { authService } from '../../../services/auth/auth.service';
import { router } from '../../../services/router/router';

export class Signup extends Block<IPropsSignup, IChildrenSignup> {
  inputs: Input[];
  signupFormValue: ISignupFormValue = {
    [SignupFormKeys.Login]: '',
    [SignupFormKeys.Email]: '',
    [SignupFormKeys.Password]: '',
    [SignupFormKeys.Name]: '',
    [SignupFormKeys.LastName]: '',
    [SignupFormKeys.PasswordRepeat]: '',
    [SignupFormKeys.Phone]: '',
  };

  get isValidSignUpForm(): boolean {
    return isValidLogin(this.signupFormValue[SignupFormKeys.Login])
        && isValidEmail(this.signupFormValue[SignupFormKeys.Email])
        && isValidPassword(this.signupFormValue[SignupFormKeys.Password])
        && isValidPhone(this.signupFormValue[SignupFormKeys.Phone])
        && isValidName(this.signupFormValue[SignupFormKeys.Name])
        && isValidName(this.signupFormValue[SignupFormKeys.LastName])
        && isValidEqualPasswords(
          this.signupFormValue[SignupFormKeys.Password],
            this.signupFormValue[SignupFormKeys.PasswordRepeat] as string,
        );
  }

  constructor(props: IPropsSignup) {
    super('div', props);
    this.initChildren();
    this.inputs = [
      this.children.loginInput,
      this.children.lastNameInput,
      this.children.nameInput,
      this.children.emailInput,
      this.children.passwordInput,
      this.children.passwordRepeatInput,
      this.children.phoneInput,
    ];
  }

  componentDidMount() {
    this.initComponentEvents();
    this.initChildrenEvents();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      emailInput: this.children.emailInput,
      loginInput: this.children.loginInput,
      nameInput: this.children.nameInput,
      lastNameInput: this.children.lastNameInput,
      phoneInput: this.children.phoneInput,
      passwordInput: this.children.passwordInput,
      passwordRepeatInput: this.children.passwordRepeatInput,
      submitBtn: this.children.submitBtn,
    });
  }

  initChildren() {
    this.children.snackbar = new Snackbar({
      text: '',
    });

    this.children.emailInput = new Input({
      value: this.signupFormValue.email,
      id: 'email',
      labelName: 'Email',
      type: 'email',
      errorMessage: 'Email is invalid',
    });

    this.children.loginInput = new Input({
      value: this.signupFormValue[SignupFormKeys.Login],
      id: 'login',
      labelName: 'Login',
      type: 'text',
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
    });

    this.children.nameInput = new Input({
      value: this.signupFormValue[SignupFormKeys.Name],
      id: 'first_name',
      labelName: 'Name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.lastNameInput = new Input({
      value: this.signupFormValue[SignupFormKeys.LastName],
      id: 'last_name',
      labelName: 'Last name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.phoneInput = new Input({
      value: this.signupFormValue[SignupFormKeys.Phone],
      id: 'phone',
      labelName: 'Phone',
      type: 'text',
      errorMessage: 'Phone is invalid',
    });

    this.children.passwordInput = new Input({
      value: this.signupFormValue[SignupFormKeys.Password],
      id: 'password',
      labelName: 'Password',
      type: 'password',
      errorMessage: 'Must contain 1 number and 1 capital letter. 8 to 40 characters.',
    });

    this.children.passwordRepeatInput = new Input({
      value: this.signupFormValue[SignupFormKeys.PasswordRepeat] as string,
      id: 'password_repeat',
      labelName: 'Password (repeat)',
      type: 'password',
      errorMessage: 'Password mismatch',
    });

    this.children.submitBtn = new Button({
      name: 'Sign up',
      color: 'secondary',
      size: 'l',
      class: 'signup__button',
      type: 'button',
    });
  }

  initComponentEvents(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'signup-link') return;
          this.resetForm();
          router.go('/signin');
        },
      },
    });
  }

  initChildrenEvents(): void {
    this.children.emailInput.setProps({
      events: this.initInputEvents(ChildrenSignupKeys.EmailInput, SignupFormKeys.Email, isValidEmail),
    });

    this.children.loginInput.setProps({
      events: this.initInputEvents(ChildrenSignupKeys.LoginInput, SignupFormKeys.Login, isValidLogin),
    });

    this.children.nameInput.setProps({
      events: this.initInputEvents(ChildrenSignupKeys.NameInput, SignupFormKeys.Name, isValidName),
    });

    this.children.lastNameInput.setProps({
      events: this.initInputEvents(ChildrenSignupKeys.LastNameInput, SignupFormKeys.LastName, isValidName),
    });

    this.children.phoneInput.setProps({
      events: this.initInputEvents(ChildrenSignupKeys.PhoneInput, SignupFormKeys.Phone, isValidPhone),
    });

    this.children.passwordInput.setProps({
      events: {
        ...this.initInputEvents(ChildrenSignupKeys.PasswordInput, SignupFormKeys.Password, isValidPassword),
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidPassword(this.signupFormValue.password)) {
            this.children.passwordInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordInput.getContent().classList.add('ui-input_invalid');
          }
          if (isValidEqualPasswords(this.signupFormValue.password, this.signupFormValue.passwordRepeat as string)) {
            this.children.passwordRepeatInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('ui-input_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidPassword(this.signupFormValue.password)) {
            this.children.passwordInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordInput.getContent().classList.add('ui-input_invalid');
          }
          if (isValidEqualPasswords(this.signupFormValue.password, this.signupFormValue.passwordRepeat as string)) {
            this.children.passwordRepeatInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('ui-input_invalid');
          }
        },
      },
    });

    this.children.passwordRepeatInput.setProps({
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.tagName !== 'INPUT') return;
          this.signupFormValue.passwordRepeat = target.value;
        },
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.signupFormValue.password, this.signupFormValue.passwordRepeat as string)) {
            this.children.passwordRepeatInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('ui-input_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.signupFormValue.password, this.signupFormValue.passwordRepeat as string)) {
            this.children.passwordRepeatInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('ui-input_invalid');
          }
        },
      },
    });

    this.children.submitBtn.setProps({
      events: {
        click: () => {
          this.submit();
        },
      },
    });
  }

  initInputEvents(
    inputName: ChildrenSignupKeys,
    formField: SignupFormKeys,
    validator: (text: string) => boolean,
  ): IEvents {
    return {
      input: (event) => {
        const target = event?.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        this.signupFormValue[formField] = target.value;
      },
      focusout: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.signupFormValue[formField] as string)) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
      focusin: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.signupFormValue[formField] as string)) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
    };
  }

  submit(): void {
    if (!isValidEmail(this.signupFormValue[SignupFormKeys.Email])) {
      this.children.emailInput.getContent().classList.add('ui-input_invalid');
    }
    if (!isValidLogin(this.signupFormValue[SignupFormKeys.Login])) {
      this.children.loginInput.getContent().classList.add('ui-input_invalid');
    }
    if (!isValidName(this.signupFormValue[SignupFormKeys.Name])) {
      this.children.nameInput.getContent().classList.add('ui-input_invalid');
    }
    if (!isValidName(this.signupFormValue[SignupFormKeys.LastName])) {
      this.children.lastNameInput.getContent().classList.add('ui-input_invalid');
    }
    if (!isValidPhone(this.signupFormValue[SignupFormKeys.Phone])) {
      this.children.phoneInput.getContent().classList.add('ui-input_invalid');
    }
    if (!isValidPassword(this.signupFormValue[SignupFormKeys.Password])) {
      this.children.passwordInput.getContent().classList.add('ui-input_invalid');
    }
    if (
      !isValidEqualPasswords(
        this.signupFormValue[SignupFormKeys.Password],
        this.signupFormValue[SignupFormKeys.PasswordRepeat] as string,
      )
    ) {
      this.children.passwordRepeatInput.getContent().classList.add('ui-input_invalid');
    }

    if (!this.isValidSignUpForm) return;
    const form: ISignupFormValue = { ...this.signupFormValue };
    delete form.passwordRepeat;

    authService.registration(form)
      .then(() => {
        this.resetForm();
        router.go('/messenger');
      }).catch((e) => {
        this.children.snackbar.setProps({
          text: ucFirstLetter(e.reason || e.error),
          color: 'error',
        });
      });
  }

  resetForm(): void {
    this.inputs.forEach((input) => {
      input.setProps({ value: '' });
      input.getContent().classList.remove('ui-input_invalid');
    });

    this.signupFormValue[SignupFormKeys.Email] = '';
    this.signupFormValue[SignupFormKeys.Login] = '';
    this.signupFormValue[SignupFormKeys.Name] = '';
    this.signupFormValue[SignupFormKeys.Phone] = '';
    this.signupFormValue[SignupFormKeys.LastName] = '';
    this.signupFormValue[SignupFormKeys.PasswordRepeat] = '';
    this.signupFormValue[SignupFormKeys.Password] = '';
  }
}
