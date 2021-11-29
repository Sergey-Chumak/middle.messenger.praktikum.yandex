import { tmpl } from './profile.tmpl';
import Block from '../../services/block';
import { IPropsAndChildren } from '../../services/types';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  isValidEmail, isValidEqualPasswords, isValidLogin, isValidName, isValidPassword, isValidPhone,
} from '../../utils/validate';

export class Profile extends Block {
  private currentPassword: string = '123123A';

  userDataInputs: Block[] = [];
  userPasswordInputs: Block[] = [];

  userDataFormValue = {
    email: 'adwdaw@wdawd.ru',
    login: 'wdawdaw342',
    name: 'Sergey',
    lastName: 'Chumak',
    nickname: 'awdw23',
    phone: '1231241234',
  };

  userPassFormValue = {
    oldPassword: '',
    newPassword: '',
    newRepeatPassword: '',
  };

  get isValidUserDataForm(): boolean {
    return isValidLogin(this.userDataFormValue.login)
        && isValidLogin(this.userDataFormValue.nickname)
        && isValidEmail(this.userDataFormValue.email)
        && isValidPhone(this.userDataFormValue.phone)
        && isValidName(this.userDataFormValue.name)
        && isValidName(this.userDataFormValue.lastName);
  }

  get isValidUserPassForm(): boolean {
    return isValidPassword(this.userPassFormValue.newPassword)
        && isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword)
        && isValidEqualPasswords(this.userPassFormValue.oldPassword, this.userPassFormValue.oldPassword);
  }

  constructor(props: IPropsAndChildren) {
    super('div', props);
    this.initChildren();
    this.userDataInputs = [
      this.children.emailInput,
      this.children.loginInput,
      this.children.nameInput,
      this.children.lastNameInput,
      this.children.nicknameInput,
      this.children.phoneInput,
    ];
    this.userPasswordInputs = [
      this.children.oldPasswordInput,
      this.children.newPasswordInput,
      this.children.newPasswordRepeatInput,
    ];
  }

  componentDidMount() {
    this.children.saveDataBtn.hide();
    this.children.savePassBtn.hide();
    this.userPasswordInputs.forEach((input) => input.hide());

    this.setProps({ nonAvailableChangeData: true });
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'link-change-data') {
            this.setProps({ nonAvailableChangeData: false });
            this.userDataInputs.forEach((input) => input.setProps({ disabled: false }));

            this.children.saveDataBtn.show();
          }

          if ((event.target as HTMLElement).id === 'link-change-pass') {
            this.setProps({ nonAvailableChangeData: false });

            this.userDataInputs.forEach((input) => input.hide());

            this.children.savePassBtn.show();
            this.userPasswordInputs.forEach((input) => input.show());
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: 'Sergey',

      emailInput: this.children.emeilInput,
      loginInput: this.children.loginInput,
      nameInput: this.children.nameInput,
      lastNameInput: this.children.lastNameInput,
      nicknameInput: this.children.nicknameInput,
      phoneInput: this.children.phoneInput,

      oldPasswordInput: this.props.oldPasswordInput,
      newPasswordInput: this.props.newPasswordInput,
      newPasswordRepeatInput: this.props.newPasswordRepeatInput,

      nonAvailableChangeData: this.props.nonAvailableChangeData,

      saveDataBtn: this.children.saveDataBtn,
      savePassBtn: this.children.savePassBtn,
    });
  }

  initChildren() {
    this.children.emailInput = new Input({
      value: this.userDataFormValue.email,
      id: 'email',
      type: 'email',
      labelName: 'Email',
      from: 'profile',
      disabled: true,
      events: {
        ...this.initInputEvents(this.userDataFormValue, 'emailInput', 'email', isValidEmail),
      },
    });

    this.children.loginInput = new Input({
      value: this.userDataFormValue.login,
      id: 'login',
      type: 'text',
      labelName: 'Login',
      from: 'profile',
      disabled: true,
      events: {
        ...this.initInputEvents(this.userDataFormValue, 'loginInput', 'login', isValidLogin),
      },
    });

    this.children.nameInput = new Input({
      value: this.userDataFormValue.name,
      id: 'first_name',
      type: 'text',
      labelName: 'Name',
      from: 'profile',
      disabled: true,
      events: {
        ...this.initInputEvents(this.userDataFormValue, 'nameInput', 'name', isValidName),
      },
    });

    this.children.lastNameInput = new Input({
      value: this.userDataFormValue.lastName,
      id: 'last_name',
      type: 'text',
      labelName: 'Last name',
      from: 'profile',
      disabled: true,
      events: {
        ...this.initInputEvents(this.userDataFormValue, 'lastNameInput', 'lastName', isValidName),
      },
    });

    this.children.nicknameInput = new Input({
      value: this.userDataFormValue.nickname,
      id: 'nickname',
      type: 'text',
      labelName: 'Nickname',
      from: 'profile',
      disabled: true,
      events: {
        ...this.initInputEvents(this.userDataFormValue, 'nicknameInput', 'nickname', isValidLogin),
      },
    });

    this.children.phoneInput = new Input({
      value: this.userDataFormValue.phone,
      id: 'phone',
      type: 'text',
      labelName: 'Phone',
      from: 'profile',
      disabled: true,
      events: {
        ...this.initInputEvents(this.userDataFormValue, 'phoneInput', 'phone', isValidPhone),
      },
    });

    this.children.oldPasswordInput = new Input({
      value: '',
      id: 'old-pass',
      type: 'password',
      labelName: 'Old password',
      from: 'profile',
      placeholder: 'Enter old password',
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.tagName !== 'INPUT') return;
          this.userPassFormValue.oldPassword = target.value;
        },
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.userPassFormValue.oldPassword, this.userPassFormValue.oldPassword)) {
            this.children.oldPasswordInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.oldPasswordInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.userPassFormValue.oldPassword, this.userPassFormValue.oldPassword)) {
            this.children.oldPasswordInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.oldPasswordInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
      },
    });

    this.children.newPasswordInput = new Input({
      value: '',
      id: 'new-pass',
      type: 'password',
      labelName: 'New password',
      from: 'profile',
      placeholder: 'Enter new password',
      events: {
        ...this.initInputEvents(this.userPassFormValue, 'newPasswordInput', 'newPassword', isValidPassword),
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidPassword(this.userPassFormValue.newPassword)) {
            this.children.newPasswordInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.newPasswordInput.getContent().classList.add('ui-input__profile_invalid');
          }
          if (isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword)) {
            this.children.newPasswordRepeatInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidPassword(this.userPassFormValue.newPassword)) {
            this.children.newPasswordInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.newPasswordInput.getContent().classList.add('ui-input__profile_invalid');
          }
          if (isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword)) {
            this.children.newPasswordRepeatInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
      },
    });

    this.children.newPasswordRepeatInput = new Input({
      value: '',
      id: 'new-pass-repeat',
      type: 'password',
      labelName: 'New password (repeat)',
      from: 'profile',
      placeholder: 'Enter new password',
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.tagName !== 'INPUT') return;
          this.userPassFormValue.newRepeatPassword = target.value;
        },
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword)) {
            this.children.newPasswordRepeatInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword)) {
            this.children.newPasswordRepeatInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
      },
    });

    this.children.saveDataBtn = new Button({
      name: 'Save',
      color: 'secondary',
      size: 'l',
      events: {
        click: () => {
          console.log('form', this.isValidUserDataForm);
          console.log(this.userPassFormValue);

          if (this.isValidUserDataForm) {
            console.log(this.userDataFormValue);

            this.userDataInputs.forEach((input) => input.setProps({ disabled: true }));
            this.setProps({ nonAvailableChangeData: true });

            this.children.emailInput.setProps({ value: this.userDataFormValue.email });
            this.children.loginInput.setProps({ value: this.userDataFormValue.login });
            this.children.nameInput.setProps({ value: this.userDataFormValue.name });
            this.children.lastNameInput.setProps({ value: this.userDataFormValue.lastName });
            this.children.nicknameInput.setProps({ value: this.userDataFormValue.nickname });
            this.children.phoneInput.setProps({ value: this.userDataFormValue.phone });

            this.children.saveDataBtn.hide();
          }
        },
      },
    });

    this.children.savePassBtn = new Button({
      name: 'Save',
      color: 'secondary',
      size: 'l',
      events: {
        click: () => {
          console.log('form', this.isValidUserPassForm);

          if (this.isValidUserPassForm) {
            console.log({ password: this.userPassFormValue.newPassword });
            this.setProps({ nonAvailableChangeData: true });

            this.children.oldPasswordInput.setProps({ value: '' });
            this.children.newPasswordInput.setProps({ value: '' });
            this.children.newPasswordRepeatInput.setProps({ value: '' });

            this.children.savePassBtn.hide();
            this.userPasswordInputs.forEach((input) => input.hide());

            this.userDataInputs.forEach((input) => input.show());
          }
        },
      },
    });
  }

  initInputEvents(form, inputName: string, formField: string, validator: (text: string) => boolean) {
    return {
      input: (event) => {
        const target = event.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        form[formField] = target.value;
      },
      focusout: (event) => {
        if ((event.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(form[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input__profile_invalid');
        }
      },
      focusin: (event) => {
        if ((event.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(form[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input__profile_invalid');
        }
      },
    };
  }
}
