import { tmpl } from './profile.tmpl';
import Block from '../../services/block/block';
import { IEvents } from '../../services/types';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  isValidEmail,
  isValidEqualPasswords,
  isValidLogin,
  isValidName,
  isValidPassword,
  isValidPhone,
} from '../../utils/validate';
import {
  IChildrenProfile, IPropsProfile, IUserDataFormValue, IUserPassFormValue, EUserDataKeys,
} from './profile.types';
import store from '../../store/store';
import { IUserData } from '../../services/auth/auth.types';
import { profileService } from '../../services/profile/profile.service';
import connect from '../../utils/hoc/connect';
import { Snackbar } from '../../components/ui/snackbar';
import { ucFirstLetter } from '../../utils/ucFirstLetter';
import { authService } from '../../services/auth/auth.service';
import isEqual from '../../utils/isEqual';
import { ChangeAvatarModal } from '../../components/ui/change-avatar-modal';
import { router } from '../../services/router/router';

export class Profile extends Block<IPropsProfile, IChildrenProfile> {
  avatar: File | null;
  userDataInputs: Input[] = [];
  userPasswordInputs: Input[] = [];
  userData: IUserData = store.getState().user!;
  userDataFormValue: IUserDataFormValue = {
    [EUserDataKeys.Email]: this.userData.email,
    [EUserDataKeys.Login]: this.userData.login,
    [EUserDataKeys.FirstName]: this.userData.first_name,
    [EUserDataKeys.SecondName]: this.userData.second_name,
    [EUserDataKeys.DisplayName]: this.userData.display_name,
    [EUserDataKeys.Phone]: this.userData.phone,
  };
  userPassFormValue: IUserPassFormValue = {
    oldPassword: '',
    newPassword: '',
    newRepeatPassword: '',
  };
  userDataProfile: IUserData = { ...this.userDataFormValue } as IUserData;

  get isValidUserDataForm(): boolean {
    return isValidLogin(this.userDataFormValue[EUserDataKeys.Login])
        && isValidLogin(this.userDataFormValue[EUserDataKeys.DisplayName])
        && isValidEmail(this.userDataFormValue[EUserDataKeys.Email])
        && isValidPhone(this.userDataFormValue[EUserDataKeys.Phone])
        && isValidName(this.userDataFormValue[EUserDataKeys.FirstName])
        && isValidName(this.userDataFormValue[EUserDataKeys.SecondName]);
  }

  get isValidUserPassForm(): boolean {
    return isValidPassword(this.userPassFormValue.newPassword)
        && isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword!);
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
    this.children.saveDataBtn.hide();
    this.children.savePassBtn.hide();
    this.userPasswordInputs.forEach((input) => input.hide());
  }

  componentDidUpdate(oldProps: IPropsProfile, newProps: IPropsProfile): boolean {
    if (isEqual(oldProps, newProps)) return false;
    if (!this.props.userData) return true;

    this.children.emailInput.setProps({ value: this.props.userData?.email });
    this.children.loginInput.setProps({ value: this.props.userData?.login });
    this.children.nameInput.setProps({ value: this.props.userData?.first_name });
    this.children.lastNameInput.setProps({ value: this.props.userData?.second_name });
    this.children.nicknameInput.setProps({ value: this.props.userData?.display_name });
    this.children.phoneInput.setProps({ value: this.props.userData?.phone });
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: this.props.userName,
      userData: this.props.userData,
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
      snackbar: this.children.snackbar,
      changeAvatarModal: this.children.changeAvatarModal,
      avatar: this.props.avatar,
    });
  }

  initComponentEvents() {
    this.setProps({
      avatar: this.userData.avatar,
      userName: this.userData.display_name || this.userData.first_name,
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

          if ((event.target as HTMLElement).id === 'profile-avatar') {
            this.children.changeAvatarModal.open();
          }

          if ((event.target as HTMLElement).id === 'profile-logout') {
            authService.logout().then(() => {
              router.go('/signin');
            });
          }
          if ((event.target as HTMLElement).id === 'back-to-chats-icon') {
            router.go('/messenger');
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
    this.children.snackbar = new Snackbar({
      text: '',
    });

    this.children.changeAvatarModal = new ChangeAvatarModal({
      inputId: 'change-user-avatar-modal-input',
      confirmBtnId: 'change-user-avatar-modal-confirm',
    });

    this.children.emailInput = new Input({
      value: this.userDataFormValue[EUserDataKeys.Email],
      id: 'profile-email',
      type: 'email',
      labelName: 'Email',
      from: 'profile',
      disabled: true,
      errorMessage: 'Email is invalid',
    });

    this.children.loginInput = new Input({
      value: this.userDataFormValue[EUserDataKeys.Login],
      id: 'profile-login',
      type: 'text',
      labelName: 'Login',
      from: 'profile',
      disabled: true,
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
    });

    this.children.nameInput = new Input({
      value: this.userDataFormValue[EUserDataKeys.FirstName],
      id: 'profile-first_name',
      type: 'text',
      labelName: 'Name',
      from: 'profile',
      disabled: true,
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.lastNameInput = new Input({
      value: this.userDataFormValue[EUserDataKeys.SecondName],
      id: 'profile-last_name',
      type: 'text',
      labelName: 'Last name',
      from: 'profile',
      disabled: true,
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
    });

    this.children.nicknameInput = new Input({
      value: this.userDataFormValue[EUserDataKeys.DisplayName],
      id: 'profile-nickname',
      type: 'text',
      labelName: 'Nickname',
      from: 'profile',
      disabled: true,
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
    });

    this.children.phoneInput = new Input({
      value: this.userDataFormValue[EUserDataKeys.Phone],
      id: 'profile-phone',
      type: 'text',
      labelName: 'Phone',
      from: 'profile',
      disabled: true,
      errorMessage: 'Phone is invalid',
    });

    this.children.oldPasswordInput = new Input({
      value: '',
      id: 'profile-old-pass',
      type: 'password',
      labelName: 'Old password',
      from: 'profile',
      placeholder: 'Enter old password',
      errorMessage: 'Password incorrect',
    });

    this.children.newPasswordInput = new Input({
      value: '',
      id: 'profile-new-pass',
      type: 'password',
      labelName: 'New password',
      from: 'profile',
      placeholder: 'Enter new password',
      errorMessage: 'Must contain 1 number and 1 capital letter. 8 to 40 characters.',
    });

    this.children.newPasswordRepeatInput = new Input({
      value: '',
      id: 'profile-new-pass-repeat',
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
      events: this.initUserDataInputEvents('emailInput', EUserDataKeys.Email, isValidEmail),
    });

    this.children.loginInput.setProps({
      events: this.initUserDataInputEvents('loginInput', EUserDataKeys.Login, isValidLogin),
    });

    this.children.nameInput.setProps({
      events: this.initUserDataInputEvents('nameInput', EUserDataKeys.FirstName, isValidName),
    });

    this.children.lastNameInput.setProps({
      events: this.initUserDataInputEvents('lastNameInput', EUserDataKeys.SecondName, isValidName),
    });

    this.children.nicknameInput.setProps({
      events: this.initUserDataInputEvents('nicknameInput', EUserDataKeys.DisplayName, isValidLogin),
    });

    this.children.phoneInput.setProps({
      events: this.initUserDataInputEvents('phoneInput', EUserDataKeys.Phone, isValidPhone),
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
          if (isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword!)) {
            this.children.newPasswordRepeatInput.getContent().classList.remove('ui-input__profile_invalid');
          } else {
            this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
          }
        },
        focusin: (event: Event) => {
          if ((event.target as HTMLElement).tagName !== 'INPUT') return;

          if (isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword!)) {
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
        input: (event: Event) => {
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

    this.children.changeAvatarModal.setProps({
      events: {
        change: (event:Event) => {
          if ((event.target as HTMLInputElement).id === 'change-user-avatar-modal-input') {
            this.avatar = ((event.target as HTMLInputElement)?.files!)[0] as File;
          }
        },
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'change-user-avatar-modal-confirm') {
            if (!this.avatar) return;
            profileService.changeUserAvatar(this.avatar).then(() => {
              this.avatar = null;
              this.children.changeAvatarModal.close();
              this.setProps({
                avatar: this.props.userData?.avatar,
              });
            });
          }
        },
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
      if (isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword!)) {
        this.children.newPasswordRepeatInput.getContent().classList.remove('ui-input__profile_invalid');
      } else {
        this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
      }
    };
  }

  submitUserData(): void {
    if (this.isValidUserDataForm) {
      profileService.changeUserData(this.userDataFormValue)
        .then(() => {
          this.userDataInputs.forEach((input) => input.setProps({ disabled: true }));
          this.setProps({ nonAvailableChangeData: true, userName: this.props.userData?.display_name });

          this.userDataProfile = { ...this.userDataFormValue } as IUserData;

          this.children.saveDataBtn.hide();

          this.children.snackbar.setProps({
            text: 'Profile updated successfully',
            color: 'success',
          });
        })
        .catch((e) => {
          this.children.snackbar.setProps({
            text: ucFirstLetter(e.reason || e.error),
            color: 'error',
          });
        });
    }
  }

  submitUserPass(): void {
    if (!this.userPassFormValue.oldPassword) {
      this.children.oldPasswordInput.getContent().classList.add('ui-input__profile_invalid');
    }

    if (!isValidPassword(this.userPassFormValue.newPassword)) {
      this.children.newPasswordInput.getContent().classList.add('ui-input__profile_invalid');
    }

    if (!isValidEqualPasswords(this.userPassFormValue.newPassword, this.userPassFormValue.newRepeatPassword!)) {
      this.children.newPasswordRepeatInput.getContent().classList.add('ui-input__profile_invalid');
    }

    if (this.isValidUserPassForm && this.userPassFormValue.oldPassword) {
      const form = { ...this.userPassFormValue };
      delete form.newRepeatPassword;
      profileService.changeUserPassword(form)
        .then(() => {
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

          this.children.snackbar.setProps({
            text: 'Password updated successfully',
            color: 'success',
          });
        })
        .catch((e) => {
          this.children.snackbar.setProps({
            text: ucFirstLetter(e.reason || e.error),
            color: 'error',
          });
        });
    }
  }

  initUserDataInputEvents(inputName: string, formField: EUserDataKeys, validator: (text: string) => boolean): IEvents {
    return {
      input: (event) => {
        const target = event?.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;
        this.userDataFormValue[formField] = target.value;
      },
      focusout: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.userDataFormValue[formField])) {
          this.children[inputName as keyof IChildrenProfile].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName as keyof IChildrenProfile].getContent().classList.add('ui-input__profile_invalid');
        }
      },
      focusin: (event) => {
        if ((event?.target as HTMLElement).tagName !== 'INPUT') return;
        if (validator(this.userDataFormValue[formField])) {
          this.children[inputName as keyof IChildrenProfile].getContent().classList.remove('ui-input__profile_invalid');
        } else {
          this.children[inputName as keyof IChildrenProfile].getContent().classList.add('ui-input__profile_invalid');
        }
      },
    };
  }
}

export const ProfileWrap = connect<IPropsProfile, IChildrenProfile>((state) => ({
  userData: state?.user,
}))(Profile as typeof Block);
