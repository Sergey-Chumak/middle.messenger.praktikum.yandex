import { signUpTmpl } from './signup.tmpl';
import { CInput } from '../../../components/c-input';
import { CButton } from '../../../components/c-button';
import View from '../../../services/view/view';
import {
  isValidEmail,
  isValidEqualPasswords,
  isValidLogin,
  isValidName,
  isValidPassword,
  isValidPhone,
} from '../../../utils/validate';
import {
  ESignupChildren, ESignupFormFields, IChildrenSignup, ISignupFormValue,
} from './signup.types';
import { IEvents } from '../../../services/types';
import { authService } from '../../../services/auth/auth.service';
import { router } from '../../../services/router/router';
import { snackbar } from '../../../components/c-snackbar';
import { ucFirstLetter } from '../../../utils/ucFirstLetter';
import { loader } from '../../../components/c-loader';
import { chatsService } from '../../../services/chats/chats.service';

export class Signup extends View<{}, IChildrenSignup> {
  inputs: CInput[];
  signupFormValue: ISignupFormValue = {
    [ESignupFormFields.Login]: '',
    [ESignupFormFields.Email]: '',
    [ESignupFormFields.Password]: '',
    [ESignupFormFields.Name]: '',
    [ESignupFormFields.LastName]: '',
    [ESignupFormFields.PasswordRepeat]: '',
    [ESignupFormFields.Phone]: '',
  };

  get isValidSignUpForm(): boolean {
    return isValidLogin(this.signupFormValue[ESignupFormFields.Login])
        && isValidEmail(this.signupFormValue[ESignupFormFields.Email])
        && isValidPassword(this.signupFormValue[ESignupFormFields.Password])
        && isValidPhone(this.signupFormValue[ESignupFormFields.Phone])
        && isValidName(this.signupFormValue[ESignupFormFields.Name])
        && isValidName(this.signupFormValue[ESignupFormFields.LastName])
        && isValidEqualPasswords(
          this.signupFormValue[ESignupFormFields.Password],
            this.signupFormValue[ESignupFormFields.PasswordRepeat] as string,
        );
  }

  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount(): void {
    this.initChildren();

    this.inputs = [
      this.children[ESignupChildren.LoginInput],
      this.children[ESignupChildren.LastNameInput],
      this.children[ESignupChildren.NameInput],
      this.children[ESignupChildren.EmailInput],
      this.children[ESignupChildren.PasswordInput],
      this.children[ESignupChildren.PasswordRepeatInput],
      this.children[ESignupChildren.PhoneInput],
    ];

    this.initChildrenEvents();
    this.initEvents();
  }

  render(): DocumentFragment {
    return this.compile(signUpTmpl);
  }

  initChildren(): void {
    this.children[ESignupChildren.EmailInput] = new CInput({
      value: this.signupFormValue[ESignupFormFields.Email],
      id: 'signup-email',
      labelName: 'Email',
      type: 'text',
      errorMessage: 'Email is invalid',
    });

    this.children[ESignupChildren.LoginInput] = new CInput({
      value: this.signupFormValue[ESignupFormFields.Login],
      id: 'signup-login',
      labelName: 'Login',
      type: 'text',
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
    });

    this.children[ESignupChildren.NameInput] = new CInput({
      value: this.signupFormValue[ESignupFormFields.Name],
      id: 'signup-first-name',
      labelName: 'Name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children[ESignupChildren.LastNameInput] = new CInput({
      value: this.signupFormValue[ESignupFormFields.LastName],
      id: 'signup-last-name',
      labelName: 'Last name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children[ESignupChildren.PhoneInput] = new CInput({
      value: this.signupFormValue[ESignupFormFields.Phone],
      id: 'signup-phone',
      labelName: 'Phone',
      type: 'text',
      errorMessage: 'Phone is invalid',
    });

    this.children[ESignupChildren.PasswordInput] = new CInput({
      value: this.signupFormValue[ESignupFormFields.Password],
      id: 'signup-password',
      labelName: 'Password',
      type: 'password',
      errorMessage: 'Must contain 1 number and 1 capital letter. 8 to 40 characters.',
    });

    this.children[ESignupChildren.PasswordRepeatInput] = new CInput({
      value: this.signupFormValue[ESignupFormFields.PasswordRepeat] as string,
      id: 'signup-password-repeat',
      labelName: 'Password (repeat)',
      type: 'password',
      errorMessage: 'Password mismatch',
    });

    this.children[ESignupChildren.SubmitBtn] = new CButton({
      name: 'Sign up',
      color: 'primary',
      size: 'l',
      class: 'signup__button',
    });

    this.children[ESignupChildren.LinkBtn] = new CButton({
      name: 'I have a profile',
      color: 'secondary',
      size: 'l',
      class: 'signup__button',
      id: 'signup-link',
    });
  }

  initChildrenEvents(): void {
    this.children.emailInput.setProps({
      events: this.initInputEvents(ESignupChildren.EmailInput, ESignupFormFields.Email, isValidEmail),
    });

    this.children.loginInput.setProps({
      events: this.initInputEvents(ESignupChildren.LoginInput, ESignupFormFields.Login, isValidLogin),
    });

    this.children.nameInput.setProps({
      events: this.initInputEvents(ESignupChildren.NameInput, ESignupFormFields.Name, isValidName),
    });

    this.children.lastNameInput.setProps({
      events: this.initInputEvents(ESignupChildren.LastNameInput, ESignupFormFields.LastName, isValidName),
    });

    this.children.phoneInput.setProps({
      events: this.initInputEvents(ESignupChildren.PhoneInput, ESignupFormFields.Phone, isValidPhone),
    });

    this.children.passwordInput.setProps({
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          this.signupFormValue[ESignupFormFields.Password] = target.value;

          if (isValidPassword(this.signupFormValue.password)
              || this.signupFormValue[ESignupFormFields.Password] === '') {
            this.children.passwordInput.getContent().classList.remove('c-input_invalid');
          } else {
            this.children.passwordInput.getContent().classList.add('c-input_invalid');
          }
          if (isValidEqualPasswords(this.signupFormValue.password, this.signupFormValue.passwordRepeat as string)
              || this.signupFormValue[ESignupFormFields.PasswordRepeat] === '') {
            this.children.passwordRepeatInput.getContent().classList.remove('c-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('c-input_invalid');
          }
        },
        focusin: () => {
          if (this.signupFormValue[ESignupFormFields.Password] === '') {
            this.children[ESignupChildren.PasswordInput].getContent().classList.remove('c-input_invalid');
          }
        },
      },
    });

    this.children.passwordRepeatInput.setProps({
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          this.signupFormValue[ESignupFormFields.PasswordRepeat] = target.value;

          if (isValidEqualPasswords(this.signupFormValue.password, this.signupFormValue.passwordRepeat as string)
              || this.signupFormValue.passwordRepeat === '') {
            this.children.passwordRepeatInput.getContent().classList.remove('c-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('c-input_invalid');
          }
        },
        focusin: () => {
          if (this.signupFormValue[ESignupFormFields.PasswordRepeat] === '') {
            this.children[ESignupChildren.PasswordRepeatInput].getContent().classList.remove('c-input_invalid');
          }
        },
      },
    });

    this.children.submitBtn.setProps({
      events: {
        click: this.submit.bind(this),
      },
    });

    this.children.linkBtn.setProps({
      events: {
        click: () => {
          this.resetForm();
          router.go('/signin');
        },
      },
    });
  }

  initEvents(): void {
    this.setProps({
      events: {
        keydown: (event: KeyboardEvent) => {
          if ((event.code === 'Enter' || event.code === 'NumpadEnter')) {
            this.submit();
          }
        },
      },
    });
  }

  initInputEvents(
    inputName: ESignupChildren,
    formField: ESignupFormFields,
    validator: (text: string) => boolean,
  ): IEvents {
    return {
      input: (event) => {
        const target = event?.target as HTMLInputElement;
        this.signupFormValue[formField] = target.value;

        if (validator(this.signupFormValue[formField] as string) || this.signupFormValue[formField] === '') {
          this.children[inputName].getContent().classList.remove('c-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('c-input_invalid');
        }
      },
      focusin: () => {
        if (this.signupFormValue[formField] === '') {
          this.children[inputName].getContent().classList.remove('c-input_invalid');
        }
      },
    };
  }

  submit(): void {
    this.validationInputs();

    if (!this.isValidSignUpForm) return;
    const form: ISignupFormValue = { ...this.signupFormValue };
    delete form.passwordRepeat;

    authService.registration(form)
      .then(() => {
        this.resetForm();
        router.go('/messenger');

        loader.show();
        chatsService.getChats()
          .then(() => {
            loader.hide();
          });
      }).catch((e) => {
        snackbar.open(ucFirstLetter(e.reason || e.error));
      });
  }

  validationInputs(): void {
    if (!isValidEmail(this.signupFormValue[ESignupFormFields.Email])) {
      this.children.emailInput.getContent().classList.add('c-input_invalid');
    }

    if (!isValidLogin(this.signupFormValue[ESignupFormFields.Login])) {
      this.children.loginInput.getContent().classList.add('c-input_invalid');
    }

    if (!isValidName(this.signupFormValue[ESignupFormFields.Name])) {
      this.children.nameInput.getContent().classList.add('c-input_invalid');
    }

    if (!isValidName(this.signupFormValue[ESignupFormFields.LastName])) {
      this.children.lastNameInput.getContent().classList.add('c-input_invalid');
    }

    if (!isValidPhone(this.signupFormValue[ESignupFormFields.Phone])) {
      this.children.phoneInput.getContent().classList.add('c-input_invalid');
    }

    if (!isValidPassword(this.signupFormValue[ESignupFormFields.Password])) {
      this.children.passwordInput.getContent().classList.add('c-input_invalid');
    }

    if (
      !isValidEqualPasswords(
        this.signupFormValue[ESignupFormFields.Password],
            this.signupFormValue[ESignupFormFields.PasswordRepeat] as string,
      )
    ) {
      this.children.passwordRepeatInput.getContent().classList.add('c-input_invalid');
    }
  }

  resetForm(): void {
    this.inputs.forEach((input) => {
      input.setProps({ value: '' });
      input.getContent().classList.remove('c-input_invalid');
    });

    this.signupFormValue[ESignupFormFields.Email] = '';
    this.signupFormValue[ESignupFormFields.Login] = '';
    this.signupFormValue[ESignupFormFields.Name] = '';
    this.signupFormValue[ESignupFormFields.Phone] = '';
    this.signupFormValue[ESignupFormFields.LastName] = '';
    this.signupFormValue[ESignupFormFields.PasswordRepeat] = '';
    this.signupFormValue[ESignupFormFields.Password] = '';
  }
}
