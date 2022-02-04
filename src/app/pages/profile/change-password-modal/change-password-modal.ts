import {
  EChangePasswordChildren,
  EChangePasswordFormFields,
  IChildrenChangePasswordModal,
  IPropsChangePasswordModal,
  IChangePasswordFormValue,
} from './change-password-modal.types';
import View from '../../../services/view/view';
import isEqual from '../../../utils/isEqual';
import { changePasswordModalTmpl } from './change-password-modal.tmpl';
import { isValidEqualPasswords, isValidPassword } from '../../../utils/validate';
import { snackbar } from '../../../components/c-snackbar';
import { ucFirstLetter } from '../../../utils/ucFirstLetter';
import { CInput } from '../../../components/c-input';
import { CButton } from '../../../components/c-button';
import { usersService } from '../../../services/users/users.service';

export class ChangePasswordModal extends View<IPropsChangePasswordModal, IChildrenChangePasswordModal> {
  changePassFormValue: IChangePasswordFormValue = {
    [EChangePasswordFormFields.Password]: '',
    [EChangePasswordFormFields.OldPassword]: '',
    [EChangePasswordFormFields.PasswordRepeat]: '',
  };

  get isValidSignUpForm(): boolean {
    return isValidPassword(this.changePassFormValue[EChangePasswordFormFields.OldPassword])
        && isValidPassword(this.changePassFormValue[EChangePasswordFormFields.Password])
        && isValidEqualPasswords(
          this.changePassFormValue[EChangePasswordFormFields.Password],
            this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] as string,
        );
  }

  constructor(props: IPropsChangePasswordModal) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.initChildren();
    this.initChildrenEvents();
  }

  componentDidUpdate(oldProps: IPropsChangePasswordModal, newProps: IPropsChangePasswordModal): boolean {
    if (isEqual(oldProps, newProps)) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(changePasswordModalTmpl);
  }

  initChildren(): void {
    this.children[EChangePasswordChildren.OldPasswordInput] = new CInput({
      value: this.changePassFormValue[EChangePasswordFormFields.OldPassword],
      id: 'profile-old-password',
      labelName: 'Old password',
      type: 'password',
      errorMessage: 'Must contain 1 number and 1 capital letter. 8 to 40 characters.',
      class: 'change-password-modal__input',
    });

    this.children[EChangePasswordChildren.PasswordInput] = new CInput({
      value: this.changePassFormValue[EChangePasswordFormFields.Password],
      id: 'profile-password',
      labelName: 'Password',
      type: 'password',
      errorMessage: 'Must contain 1 number and 1 capital letter. 8 to 40 characters.',
      class: 'change-password-modal__input',
    });

    this.children[EChangePasswordChildren.PasswordRepeatInput] = new CInput({
      value: this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] as string,
      id: 'profile-password-repeat',
      labelName: 'Password (repeat)',
      type: 'password',
      errorMessage: 'Password mismatch',
      class: 'change-password-modal__input',
    });

    this.children[EChangePasswordChildren.SubmitBtn] = new CButton({
      name: 'Change password',
      color: 'primary',
      size: 'l',
      class: 'change-password-modal__button',
    });

    this.children[EChangePasswordChildren.LinkBtn] = new CButton({
      name: 'Cancel',
      color: 'secondary',
      size: 'l',
      class: 'change-password-modal__button',
    });
  }

  initChildrenEvents(): void {
    this.children.oldPasswordInput.setProps({
      events: {
        input: (event: Event) => {
          const target = event?.target as HTMLInputElement;
          this.changePassFormValue[EChangePasswordFormFields.OldPassword] = target.value;

          if (isValidPassword(this.changePassFormValue[EChangePasswordFormFields.OldPassword] as string)
              || this.changePassFormValue[EChangePasswordFormFields.OldPassword] === '') {
            this.children[EChangePasswordChildren.OldPasswordInput].getContent().classList.remove('c-input_invalid');
          } else {
            this.children[EChangePasswordChildren.OldPasswordInput].getContent().classList.add('c-input_invalid');
          }
        },
        focusin: () => {
          if (this.changePassFormValue[EChangePasswordFormFields.OldPassword] === '') {
            this.children[EChangePasswordChildren.OldPasswordInput].getContent().classList.remove('c-input_invalid');
          }
        },
      },
    });

    this.children.passwordInput.setProps({
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          this.changePassFormValue[EChangePasswordFormFields.Password] = target.value;

          if (isValidPassword(this.changePassFormValue[EChangePasswordFormFields.Password])
              || this.changePassFormValue[EChangePasswordFormFields.Password] === '') {
            this.children.passwordInput.getContent().classList.remove('c-input_invalid');
          } else {
            this.children.passwordInput.getContent().classList.add('c-input_invalid');
          }
          if (isValidEqualPasswords(
            this.changePassFormValue[EChangePasswordFormFields.Password],
                  this.changePassFormValue.passwordRepeat!,
          )
              || this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] === '') {
            this.children.passwordRepeatInput.getContent().classList.remove('c-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('c-input_invalid');
          }
        },
        focusin: () => {
          if (this.changePassFormValue[EChangePasswordFormFields.Password] === '') {
            this.children[EChangePasswordChildren.PasswordInput].getContent().classList.remove('c-input_invalid');
          }
        },
      },
    });

    this.children.passwordRepeatInput.setProps({
      events: {
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] = target.value;

          const isEqualPasswords = isValidEqualPasswords(
            this.changePassFormValue[EChangePasswordFormFields.Password],
              this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] as string,
          );

          if (isEqualPasswords || this.changePassFormValue.passwordRepeat === '') {
            this.children.passwordRepeatInput.getContent().classList.remove('c-input_invalid');
          } else {
            this.children.passwordRepeatInput.getContent().classList.add('c-input_invalid');
          }
        },
        focusin: () => {
          if (this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] === '') {
            this.children[EChangePasswordChildren.PasswordRepeatInput].getContent().classList.remove('c-input_invalid');
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
          this.close();
        },
      },
    });
  }

  submit(): void {
    this.validationInputs();

    if (!this.isValidSignUpForm) return;
    const form: IChangePasswordFormValue = { ...this.changePassFormValue };
    delete form.passwordRepeat;

    usersService.changeUserPassword(form)
      .then(() => {
        this.close();
        snackbar.open('Password updated successfully', 'success');
      }).catch((e) => {
        snackbar.open(ucFirstLetter(e.reason || e.error), 'error');
      });
  }

  validationInputs(): void {
    if (!isValidPassword(this.changePassFormValue[EChangePasswordFormFields.OldPassword])) {
      this.children.oldPasswordInput.getContent().classList.add('c-input_invalid');
    }

    if (!isValidPassword(this.changePassFormValue[EChangePasswordFormFields.Password])) {
      this.children.passwordInput.getContent().classList.add('c-input_invalid');
    }

    if (
      !isValidEqualPasswords(
        this.changePassFormValue[EChangePasswordFormFields.Password],
            this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] as string,
      )
    ) {
      this.children.passwordRepeatInput.getContent().classList.add('c-input_invalid');
    }
  }

  resetForm(): void {
    this.children[EChangePasswordChildren.PasswordInput].setProps({ value: '' });
    this.children[EChangePasswordChildren.OldPasswordInput].setProps({ value: '' });
    this.children[EChangePasswordChildren.PasswordRepeatInput].setProps({ value: '' });

    this.changePassFormValue[EChangePasswordFormFields.OldPassword] = '';
    this.changePassFormValue[EChangePasswordFormFields.PasswordRepeat] = '';
    this.changePassFormValue[EChangePasswordFormFields.Password] = '';
  }

  open(): void {
    this.show();
  }

  close(): void {
    this.hide();
    this.resetForm();
  }
}
