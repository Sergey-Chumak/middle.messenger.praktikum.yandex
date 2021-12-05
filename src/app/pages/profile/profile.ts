import { tmpl } from './profile.tmpl';
import Block from '../../services/block';
import { IEvents } from '../../services/types';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  isValidEmail, isValidEqualPasswords, isValidLogin, isValidName, isValidPassword, isValidPhone,
} from '../../utils/validate';
import {
  IChildrenProfile, IPropsProfile, IUserDataFormValue, IUserPassFormValue,
} from './profile.types';

export class Profile extends Block<IPropsProfile, IChildrenProfile> {
  userDataInputs: Input[] = [];
  userPasswordInputs: Input[] = [];

  userDataFormValue: IUserDataFormValue = {
    email: 'adwdaw@wdawd.ru',
    login: 'wdawdaw342',
    name: 'Sergey',
    lastName: 'Chumak',
    nickname: 'awdw23',
    phone: '1231241234',
  };

  userPassFormValue: IUserPassFormValue = {
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

  constructor(props: IPropsProfile) {
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
    this.initComponentEvents();
    this.initChildrenEvent();
    this.children.saveDataBtn.hide();
    this.children.savePassBtn.hide();
    this.userPasswordInputs.forEach((input) => input.hide());
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: 'Sergey',
      emailInput: this.children.emailInput,
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

  initComponentEvents() {
    this.setProps({
      nonAvailableChangeData: true,
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

            this.userPasswordInputs.forEach((input) => input.show());
            this.children.savePassBtn.show();
          }
        },
      },
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
    });

    this.children.loginInput = new Input({
      value: this.userDataFormValue.login,
      id: 'login',
      type: 'text',
      labelName: 'Login',
      from: 'profile',
      disabled: true,
    });

    this.children.nameInput = new Input({
      value: this.userDataFormValue.name,
      id: 'first_name',
      type: 'text',
      labelName: 'Name',
      from: 'profile',
      disabled: true,
    });

    this.children.lastNameInput = new Input({
      value: this.userDataFormValue.lastName,
      id: 'last_name',
      type: 'text',
      labelName: 'Last name',
      from: 'profile',
      disabled: true,
    });

    this.children.nicknameInput = new Input({
      value: this.userDataFormValue.nickname,
      id: 'nickname',
      type: 'text',
      labelName: 'Nickname',
      from: 'profile',
      disabled: true,
    });

    this.children.phoneInput = new Input({
      value: this.userDataFormValue.phone,
      id: 'phone',
      type: 'text',
      labelName: 'Phone',
      from: 'profile',
      disabled: true,
    });

    this.children.oldPasswordInput = new Input({
      value: '',
      id: 'old-pass',
      type: 'password',
      labelName: 'Old password',
      from: 'profile',
      placeholder: 'Enter old password',
    });

    this.children.newPasswordInput = new Input({
      value: '',
      id: 'new-pass',
      type: 'password',
      labelName: 'New password',
      from: 'profile',
      placeholder: 'Enter new password',
    });

    this.children.newPasswordRepeatInput = new Input({
      value: '',
      id: 'new-pass-repeat',
      type: 'password',
      labelName: 'New password (repeat)',
      from: 'profile',
      placeholder: 'Enter new password',
    });

    this.children.saveDataBtn = new Button({
      name: 'Save',
      color: 'secondary',
      size: 'l',
    });

    this.children.savePassBtn = new Button({
      name: 'Save',
      color: 'secondary',
      size: 'l',
    });
  }

  initChildrenEvent() {
    this.children.emailInput.setProps({
      events: this.initUserDataInputEvents('emailInput', 'email', isValidEmail),
    });

    this.children.loginInput.setProps({
      events: this.initUserDataInputEvents('loginInput', 'login', isValidLogin),
    });

    this.children.nameInput.setProps({
      events: this.initUserDataInputEvents('nameInput', 'name', isValidName),
    });

    this.children.lastNameInput.setProps({
      events: this.initUserDataInputEvents('lastNameInput', 'lastName', isValidName),
    });

    this.children.nicknameInput.setProps({
      events: this.initUserDataInputEvents('nicknameInput', 'nickname', isValidLogin),
    });

    this.children.phoneInput.setProps({
      events: this.initUserDataInputEvents('phoneInput', 'phone', isValidPhone),
    });

    this.children.oldPasswordInput.setProps({
      events: this.initPassRepeatInputEvent('oldPasswordInput', 'oldPassword', 'oldPassword'),
    });

    this.children.newPasswordRepeatInput.setProps({
      events: this.initPassRepeatInputEvent('newPasswordRepeatInput', 'newRepeatPassword', 'newPassword'),
    });

    this.children.newPasswordInput.setProps({
      events: {
        input: (event) => {
          const target = event?.target as HTMLInputElement;
          if (target.tagName !== 'INPUT') return;
          this.userPassFormValue.newPassword = target.value;
        },
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

    this.children.saveDataBtn.setProps({
      events: {
        click: () => {
          console.log('form', this.isValidUserDataForm);

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

    this.children.savePassBtn.setProps({
      events: {
        click: () => {
          console.log('form', this.isValidUserPassForm);

          if (this.isValidUserPassForm) {
            console.log({ password: this.userPassFormValue.newPassword });
            this.setProps({ nonAvailableChangeData: true });

            this.userPassFormValue.newRepeatPassword = '';
            this.userPassFormValue.oldPassword = '';
            this.userPassFormValue.newPassword = '';

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

  initUserDataInputEvents(inputName: string, formField: string, validator: (text: string) => boolean): IEvents {
    return {
      input: (event) => {
        const target = event?.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        this.userDataFormValue[formField] = target.value;
      },
      focusout: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.userDataFormValue[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input__profile_invalid');
        }
      },
      focusin: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.userDataFormValue[formField])) {
          this.children[inputName].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input__profile_invalid');
        }
      },
    };
  }

  initPassRepeatInputEvent(inputName: string, formField: string, fieldRepeat: string): IEvents {
    return {
      input: (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        this.userPassFormValue[formField] = target.value;
      },
      focusout: (event: Event) => {
        if ((event.target as HTMLElement).tagName !== 'INPUT') return;
        if (isValidEqualPasswords(this.userPassFormValue[formField], this.userPassFormValue[fieldRepeat])) {
          this.children[inputName].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input__profile_invalid');
        }
      },
      focusin: (event: Event) => {
        if ((event.target as HTMLElement).tagName !== 'INPUT') return;
        if (isValidEqualPasswords(this.userPassFormValue[formField], this.userPassFormValue[fieldRepeat])) {
          this.children[inputName].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName].getContent().classList.add('ui-input__profile_invalid');
        }
      },
    };
  }
}
