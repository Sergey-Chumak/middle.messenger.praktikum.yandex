import { tmpl } from './registration.tmpl';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import Block from '../../services/block';
import {
  isValidEmail, isValidEqualPasswords, isValidLogin, isValidName, isValidPassword, isValidPhone,
} from '../../utils/validate';
import { IChildrenRegistration, IPropsRegistration, ISignUpFormValue } from './types';
import { IEvents } from '../../services/types';

export class Registration extends Block<IPropsRegistration, IChildrenRegistration> {
  signUpFormValue: ISignUpFormValue = {
    login: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    passwordRepeat: '',
    phone: '',
  };

  get isValidSignUpForm(): boolean {
    return isValidLogin(this.signUpFormValue.login)
        && isValidEmail(this.signUpFormValue.email)
        && isValidPassword(this.signUpFormValue.password)
        && isValidEqualPasswords(this.signUpFormValue.password, this.signUpFormValue.passwordRepeat as string)
        && isValidPhone(this.signUpFormValue.phone)
        && isValidName(this.signUpFormValue.name)
        && isValidName(this.signUpFormValue.lastName);
  }

  constructor(props: IPropsRegistration) {
    super('div', props);
    this.initChildren();
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
    this.children.emailInput = new Input({
      value: this.signUpFormValue.email,
      id: 'email',
      labelName: 'Email',
      type: 'email',
      errorMessage: 'Email is invalid',
    });

    this.children.loginInput = new Input({
      value: this.signUpFormValue.login,
      id: 'login',
      labelName: 'Login',
      type: 'text',
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
    });

    this.children.nameInput = new Input({
      value: this.signUpFormValue.name,
      id: 'first_name',
      labelName: 'Name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.lastNameInput = new Input({
      value: this.signUpFormValue.lastName,
      id: 'last_name',
      labelName: 'Last name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.phoneInput = new Input({
      value: this.signUpFormValue.phone,
      id: 'phone',
      labelName: 'Phone',
      type: 'text',
      errorMessage: 'Phone is invalid',
    });

    this.children.passwordInput = new Input({
      value: this.signUpFormValue.password,
      id: 'password',
      labelName: 'Password',
      type: 'password',
      errorMessage: 'Must contain 1 number and 1 capital letter. 8 to 40 characters.',
    });

    this.children.passwordRepeatInput = new Input({
      value: this.signUpFormValue.passwordRepeat as string,
      id: 'password_repeat',
      labelName: 'Password (repeat)',
      type: 'password',
      errorMessage: 'Password mismatch',
    });

    this.children.submitBtn = new Button({
      name: 'Sign up',
      color: 'secondary',
      size: 'l',
      class: 'registration__button',
      type: 'button',
    });
  }

  initComponentEvents(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'registration-link') return;
          document.location.href = '/auth';
        },
      },
    });
  }

  initChildrenEvents(): void {
    this.children.emailInput.setProps({
      events: this.initInputEvents('emailInput', 'email', isValidEmail),
    });

    this.children.loginInput.setProps({
      events: this.initInputEvents('loginInput', 'login', isValidLogin),
    });

    this.children.nameInput.setProps({
      events: this.initInputEvents('nameInput', 'name', isValidName),
    });

    this.children.lastNameInput.setProps({
      events: this.initInputEvents('lastNameInput', 'lastName', isValidName),
    });

    this.children.phoneInput.setProps({
      events: this.initInputEvents('phoneInput', 'phone', isValidPhone),
    });

    this.children.passwordInput.setProps({
      events: {
        ...this.initInputEvents('passwordInput', 'password', isValidPassword),
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidPassword(this.signUpFormValue.password)) {
            this.children.passwordInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordInput.getContent().classList.add('ui-input_invalid');
          }
          if (isValidEqualPasswords(this.signUpFormValue.password, this.signUpFormValue.passwordRepeat as string)) {
            this.children.passwordRepeatInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('ui-input_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidPassword(this.signUpFormValue.password)) {
            this.children.passwordInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordInput.getContent().classList.add('ui-input_invalid');
          }
          if (isValidEqualPasswords(this.signUpFormValue.password, this.signUpFormValue.passwordRepeat as string)) {
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
          this.signUpFormValue.passwordRepeat = target.value;
        },
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.signUpFormValue.password, this.signUpFormValue.passwordRepeat as string)) {
            this.children.passwordRepeatInput.getContent().classList.remove('ui-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('ui-input_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.signUpFormValue.password, this.signUpFormValue.passwordRepeat as string)) {
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

  initInputEvents(inputName: string, formField: string, validator: (text: string) => boolean): IEvents {
    return {
      input: (event) => {
        const target = event?.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        this.signUpFormValue[formField] = target.value;
      },
      focusout: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.signUpFormValue[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
      focusin: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.signUpFormValue[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input_invalid');
        }
      },
    };
  }

  submit(): void {
    console.log('form', this.isValidSignUpForm);
    if (!this.isValidSignUpForm) return;
    const form: ISignUpFormValue = { ...this.signUpFormValue };
    delete form.passwordRepeat;
    console.log(form);
  }
}
