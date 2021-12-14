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
import { getUserProfile, IUserProfile } from '../../services/users-data';

export class Profile extends Block<IPropsProfile, IChildrenProfile> {
  userDataProfile: IUserProfile;
  userDataInputs: Input[] = [];
  userPasswordInputs: Input[] = [];

  userDataFormValue: IUserDataFormValue = {
    email: '',
    login: '',
    name: '',
    lastName: '',
    nickname: '',
    phone: '',
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
    this.initChildrenEvents();
    this.loadDataProfile();
    this.children.saveDataBtn.hide();
    this.children.savePassBtn.hide();
    this.userPasswordInputs.forEach((input) => input.hide());
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: this.props.userName,
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

          if ((event.target as HTMLElement).id === 'cancel-link') {
            this.cancelChanges();
          }
        },
      },
    });
  }

  cancelChanges() {
    this.setProps({ nonAvailableChangeData: true });

    this.children.saveDataBtn.hide();
    this.children.savePassBtn.hide();
    this.userPasswordInputs.forEach((input) => input.hide());
    this.userDataInputs.forEach((input) => input.show());

    this.userDataInputs.forEach((input) => input.setProps({ disabled: true }));
    this.userPasswordInputs.forEach((input) => input.setProps({ value: '' }));

    this.userDataInputs.forEach((input) => input.getContent().classList.remove('ui-input__profile_invalid'));
    this.userPasswordInputs.forEach((input) => input.getContent().classList.remove('ui-input__profile_invalid'));

    this.userDataFormValue = { ...this.userDataProfile } as IUserDataFormValue;
  }

  initChildren() {
    this.children.emailInput = new Input({
      value: this.userDataFormValue.email,
      id: 'email',
      type: 'email',
      labelName: 'Email',
      from: 'profile',
      disabled: true,
      errorMessage: 'Email is invalid',
    });

    this.children.loginInput = new Input({
      value: this.userDataFormValue.login,
      id: 'login',
      type: 'text',
      labelName: 'Login',
      from: 'profile',
      disabled: true,
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
    });

    this.children.nameInput = new Input({
      value: this.userDataFormValue.name,
      id: 'first_name',
      type: 'text',
      labelName: 'Name',
      from: 'profile',
      disabled: true,
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.lastNameInput = new Input({
      value: this.userDataFormValue.lastName,
      id: 'last_name',
      type: 'text',
      labelName: 'Last name',
      from: 'profile',
      disabled: true,
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.nicknameInput = new Input({
      value: this.userDataFormValue.nickname,
      id: 'nickname',
      type: 'text',
      labelName: 'Nickname',
      from: 'profile',
      disabled: true,
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
    });

    this.children.phoneInput = new Input({
      value: this.userDataFormValue.phone,
      id: 'phone',
      type: 'text',
      labelName: 'Phone',
      from: 'profile',
      disabled: true,
      errorMessage: 'Phone is invalid',
    });

    this.children.oldPasswordInput = new Input({
      value: '',
      id: 'old-pass',
      type: 'password',
      labelName: 'Old password',
      from: 'profile',
      placeholder: 'Enter old password',
      errorMessage: 'Password incorrect',
    });

    this.children.newPasswordInput = new Input({
      value: '',
      id: 'new-pass',
      type: 'password',
      labelName: 'New password',
      from: 'profile',
      placeholder: 'Enter new password',
      errorMessage: 'Must contain 1 number and 1 capital letter. 8 to 40 characters.',
    });

    this.children.newPasswordRepeatInput = new Input({
      value: '',
      id: 'new-pass-repeat',
      type: 'password',
      labelName: 'New password (repeat)',
      from: 'profile',
      placeholder: 'Enter new password',
      errorMessage: 'Password mismatch',
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

  initChildrenEvents(): void {
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
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.tagName !== 'INPUT') return;
          this.userPassFormValue.oldPassword = target.value;
        },
        focusout: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;
          if (isValidEqualPasswords(this.userPassFormValue.oldPassword, this.userPassFormValue.oldPassword)
              && this.userPassFormValue.oldPassword) {
            this.children.oldPasswordInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.oldPasswordInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;

          if (isValidEqualPasswords(this.userPassFormValue.oldPassword, this.userPassFormValue.oldPassword)
              && this.userPassFormValue.oldPassword) {
            this.children.oldPasswordInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.oldPasswordInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
      },
    });

    this.children.newPasswordRepeatInput.setProps({
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

    this.children.newPasswordInput.setProps({
      events: {
        focusout: this.initValidatePasswordEvent(),
        focusin: this.initValidatePasswordEvent(),
        input: (event) => {
          const target = event?.target as HTMLInputElement;
          if (target.tagName !== 'INPUT') return;
          this.userPassFormValue.newPassword = target.value;
        },
      },
    });

    this.children.saveDataBtn.setProps({
      events: {
        click: () => this.submitUserData(),
      },
    });

    this.children.savePassBtn.setProps({
      events: {
        click: () => this.submitUserPass(),
      },
    });
  }

  initValidatePasswordEvent(): (event: Event) => void {
    return (event: Event) => {
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
    };
  }

  submitUserData(): void {
    if (this.isValidUserDataForm) {
      this.userDataInputs.forEach((input) => input.setProps({ disabled: true }));
      this.setProps({ nonAvailableChangeData: true });

      this.children.emailInput.setProps({ value: this.userDataFormValue.email });
      this.children.loginInput.setProps({ value: this.userDataFormValue.login });
      this.children.nameInput.setProps({ value: this.userDataFormValue.name });
      this.children.lastNameInput.setProps({ value: this.userDataFormValue.lastName });
      this.children.nicknameInput.setProps({ value: this.userDataFormValue.nickname });
      this.children.phoneInput.setProps({ value: this.userDataFormValue.phone });

      this.userDataProfile = { ...this.userDataFormValue } as IUserProfile;

      this.children.saveDataBtn.hide();
    }
  }

  submitUserPass(): void {
    if (!isValidEqualPasswords(this.userPassFormValue.oldPassword, this.userPassFormValue.oldPassword)
        || !this.userPassFormValue.oldPassword) {
      this.children.oldPasswordInput.getContent().classList.add('ui-input__profile_invalid');
    }

    if (!isValidPassword(this.userPassFormValue.newPassword)) {
      this.children.newPasswordInput.getContent().classList.add('ui-input__profile_invalid');
    }

    if (!isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword)) {
      this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
    }

    if (this.isValidUserPassForm && this.userPassFormValue.oldPassword) {
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

      this.userPasswordInputs.forEach((input) => input.getContent().classList.remove('ui-input__profile_invalid'));
    }
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

  loadDataProfile(): void {
    setTimeout(() => {
      this.userDataProfile = getUserProfile();

      this.userDataFormValue = { ...this.userDataProfile } as IUserDataFormValue;

      this.setProps({
        userName: this.userDataProfile.name,
      });

      this.children.emailInput.setProps({ value: this.userDataProfile.email });
      this.children.loginInput.setProps({ value: this.userDataProfile.login });
      this.children.nameInput.setProps({ value: this.userDataProfile.name });
      this.children.lastNameInput.setProps({ value: this.userDataProfile.lastName });
      this.children.nicknameInput.setProps({ value: this.userDataProfile.nickname });
      this.children.phoneInput.setProps({ value: this.userDataProfile.phone });
    }, 700);
  }
}
