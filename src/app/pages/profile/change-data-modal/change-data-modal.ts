import {
  EChangeDataFormFields,
  EChangeDataModalChildren,
  IChangeDataFormValue,
  IChildrenChangeDataModal,
  IPropsChangeDataModal,
} from './change-data-modal.types';
import View from '../../../services/view/view';
import isEqual from '../../../utils/isEqual';
import { changeDataModalTmpl } from './change-data-modal.tmpl';
import { CInput } from '../../../components/c-input';
import { CButton } from '../../../components/c-button';
import {
  isValidEmail, isValidLogin, isValidName, isValidPhone,
} from '../../../utils/validate';
import { IEvents } from '../../../services/types';
import { snackbar } from '../../../components/c-snackbar';
import { ucFirstLetter } from '../../../utils/ucFirstLetter';
import { usersService } from '../../../services/users/users.service';

export class ChangeDataModal extends View<IPropsChangeDataModal, IChildrenChangeDataModal> {
  inputs: CInput[];
  changeDataFormValue: IChangeDataFormValue = {
    [EChangeDataFormFields.Login]: '',
    [EChangeDataFormFields.Email]: '',
    [EChangeDataFormFields.FirstName]: '',
    [EChangeDataFormFields.SecondName]: '',
    [EChangeDataFormFields.DisplayName]: '',
    [EChangeDataFormFields.Phone]: '',
  };

  get isValidSignUpForm(): boolean {
    return isValidLogin(this.changeDataFormValue[EChangeDataFormFields.Login])
        && isValidLogin(this.changeDataFormValue[EChangeDataFormFields.DisplayName])
        && isValidEmail(this.changeDataFormValue[EChangeDataFormFields.Email])
        && isValidPhone(this.changeDataFormValue[EChangeDataFormFields.Phone])
        && isValidName(this.changeDataFormValue[EChangeDataFormFields.FirstName])
        && isValidName(this.changeDataFormValue[EChangeDataFormFields.SecondName]);
  }

  constructor(props: IPropsChangeDataModal) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.initChildren();

    this.inputs = [
      this.children[EChangeDataModalChildren.LoginInput],
      this.children[EChangeDataModalChildren.SecondNameInput],
      this.children[EChangeDataModalChildren.FirstNameInput],
      this.children[EChangeDataModalChildren.DisplayNameInput],
      this.children[EChangeDataModalChildren.EmailInput],
      this.children[EChangeDataModalChildren.PhoneInput],
    ];

    this.initChildrenEvents();
  }

  componentDidUpdate(oldProps: IPropsChangeDataModal, newProps: IPropsChangeDataModal): boolean {
    if (isEqual(oldProps, newProps)) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(changeDataModalTmpl);
  }

  initChildren(): void {
    this.children[EChangeDataModalChildren.EmailInput] = new CInput({
      value: this.changeDataFormValue[EChangeDataFormFields.Email],
      id: 'profile-email',
      labelName: 'Email',
      type: 'text',
      errorMessage: 'Email is invalid',
      class: 'change-data-modal__input',
    });

    this.children[EChangeDataModalChildren.LoginInput] = new CInput({
      value: this.changeDataFormValue[EChangeDataFormFields.Login],
      id: 'profile-login',
      labelName: 'Login',
      type: 'text',
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
      class: 'change-data-modal__input',
    });

    this.children[EChangeDataModalChildren.FirstNameInput] = new CInput({
      value: this.changeDataFormValue[EChangeDataFormFields.FirstName],
      id: 'profile-first-name',
      labelName: 'Name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
      class: 'change-data-modal__input',
    });

    this.children[EChangeDataModalChildren.SecondNameInput] = new CInput({
      value: this.changeDataFormValue[EChangeDataFormFields.SecondName],
      id: 'profile-last-name',
      labelName: 'Last name',
      type: 'text',
      errorMessage: 'Must contain only letters and begin with an uppercase letter',
      class: 'change-data-modal__input',
    });

    this.children[EChangeDataModalChildren.DisplayNameInput] = new CInput({
      value: this.changeDataFormValue[EChangeDataFormFields.DisplayName],
      id: 'profile-display-name',
      labelName: 'Display name',
      type: 'text',
      errorMessage: 'Сan contain only Latin letters and numbers. 3 to 20 characters.',
      class: 'change-data-modal__input',
    });

    this.children[EChangeDataModalChildren.PhoneInput] = new CInput({
      value: this.changeDataFormValue[EChangeDataFormFields.Phone],
      id: 'profile-phone',
      labelName: 'Phone',
      type: 'text',
      errorMessage: 'Phone is invalid',
      class: 'change-data-modal__input',
    });

    this.children[EChangeDataModalChildren.SubmitBtn] = new CButton({
      name: 'Change data',
      color: 'primary',
      size: 'l',
      class: 'change-data-modal__button',
    });

    this.children[EChangeDataModalChildren.LinkBtn] = new CButton({
      name: 'Cancel',
      color: 'secondary',
      size: 'l',
      id: 'change-data-cancel',
      class: 'change-data-modal__button',
    });
  }

  initChildrenEvents(): void {
    this.children[EChangeDataModalChildren.EmailInput].setProps({
      events: this.initInputEvents(EChangeDataModalChildren.EmailInput, EChangeDataFormFields.Email, isValidEmail),
    });

    this.children[EChangeDataModalChildren.LoginInput].setProps({
      events: this.initInputEvents(EChangeDataModalChildren.LoginInput, EChangeDataFormFields.Login, isValidLogin),
    });

    this.children[EChangeDataModalChildren.DisplayNameInput].setProps({
      events: this.initInputEvents(
        EChangeDataModalChildren.DisplayNameInput,
        EChangeDataFormFields.DisplayName,
        isValidLogin,
      ),
    });

    this.children[EChangeDataModalChildren.FirstNameInput].setProps({
      events: this.initInputEvents(
        EChangeDataModalChildren.FirstNameInput,
        EChangeDataFormFields.FirstName,
        isValidName,
      ),
    });

    this.children[EChangeDataModalChildren.SecondNameInput].setProps({
      events: this.initInputEvents(
        EChangeDataModalChildren.SecondNameInput,
        EChangeDataFormFields.SecondName,
        isValidName,
      ),
    });

    this.children[EChangeDataModalChildren.PhoneInput].setProps({
      events: this.initInputEvents(EChangeDataModalChildren.PhoneInput, EChangeDataFormFields.Phone, isValidPhone),
    });

    this.children[EChangeDataModalChildren.SubmitBtn].setProps({
      events: {
        click: this.submit.bind(this),
      },
    });

    this.children[EChangeDataModalChildren.LinkBtn].setProps({
      events: {
        click: () => {
          this.close();
        },
      },
    });
  }

  initInputEvents(
    inputName: EChangeDataModalChildren,
    formField: EChangeDataFormFields,
    validator: (text: string) => boolean,
  ): IEvents {
    return {
      input: (event) => {
        const target = event?.target as HTMLInputElement;
        this.changeDataFormValue[formField] = target.value;

        if (validator(this.changeDataFormValue[formField] as string) || this.changeDataFormValue[formField] === '') {
          this.children[inputName].getContent().classList.remove('c-input_invalid');
        } else {
          this.children[inputName].getContent().classList.add('c-input_invalid');
        }
      },
      focusin: () => {
        if (this.changeDataFormValue[formField] === '') {
          this.children[inputName].getContent().classList.remove('c-input_invalid');
        }
      },
    };
  }

  submit(): void {
    this.validationInputs();

    if (!this.isValidSignUpForm) return;

    usersService.changeUserData(this.changeDataFormValue)
      .then(() => {
        this.close();
        snackbar.open('Data updated successfully', 'success');
      }).catch((e) => {
        snackbar.open(ucFirstLetter(e.reason || e.error));
      });
  }

  validationInputs(): void {
    if (!isValidEmail(this.changeDataFormValue[EChangeDataFormFields.Email])) {
      this.children[EChangeDataModalChildren.EmailInput].getContent().classList.add('c-input_invalid');
    }

    if (!isValidLogin(this.changeDataFormValue[EChangeDataFormFields.Login])) {
      this.children[EChangeDataModalChildren.LoginInput].getContent().classList.add('c-input_invalid');
    }

    if (!isValidLogin(this.changeDataFormValue[EChangeDataFormFields.DisplayName])) {
      this.children[EChangeDataModalChildren.DisplayNameInput].getContent().classList.add('c-input_invalid');
    }

    if (!isValidName(this.changeDataFormValue[EChangeDataFormFields.FirstName])) {
      this.children[EChangeDataModalChildren.FirstNameInput].getContent().classList.add('c-input_invalid');
    }

    if (!isValidName(this.changeDataFormValue[EChangeDataFormFields.SecondName])) {
      this.children[EChangeDataModalChildren.SecondNameInput].getContent().classList.add('c-input_invalid');
    }

    if (!isValidPhone(this.changeDataFormValue[EChangeDataFormFields.Phone])) {
      this.children[EChangeDataModalChildren.PhoneInput].getContent().classList.add('c-input_invalid');
    }
  }

  resetForm(): void {
    this.inputs.forEach((input) => {
      input.setProps({ value: '' });
      input.getContent().classList.remove('c-input_invalid');
    });

    this.changeDataFormValue[EChangeDataFormFields.Email] = '';
    this.changeDataFormValue[EChangeDataFormFields.Login] = '';
    this.changeDataFormValue[EChangeDataFormFields.FirstName] = '';
    this.changeDataFormValue[EChangeDataFormFields.DisplayName] = '';
    this.changeDataFormValue[EChangeDataFormFields.Phone] = '';
    this.changeDataFormValue[EChangeDataFormFields.SecondName] = '';
  }

  open(): void {
    this.show();

    this.children[EChangeDataModalChildren.EmailInput].setProps({ value: this.props.userData?.email });
    this.children[EChangeDataModalChildren.LoginInput].setProps({ value: this.props.userData?.login });
    this.children[EChangeDataModalChildren.FirstNameInput].setProps({ value: this.props.userData?.first_name });
    this.children[EChangeDataModalChildren.SecondNameInput].setProps({ value: this.props.userData?.second_name });
    this.children[EChangeDataModalChildren.DisplayNameInput].setProps({ value: this.props.userData?.display_name });
    this.children[EChangeDataModalChildren.PhoneInput].setProps({ value: this.props.userData?.phone });

    this.changeDataFormValue[EChangeDataFormFields.Email] = this.props.userData?.email!;
    this.changeDataFormValue[EChangeDataFormFields.Login] = this.props.userData?.login!;
    this.changeDataFormValue[EChangeDataFormFields.FirstName] = this.props.userData?.first_name!;
    this.changeDataFormValue[EChangeDataFormFields.SecondName] = this.props.userData?.second_name!;
    this.changeDataFormValue[EChangeDataFormFields.DisplayName] = this.props.userData?.display_name!;
    this.changeDataFormValue[EChangeDataFormFields.Phone] = this.props.userData?.phone!;
  }

  close(): void {
    this.hide();
    this.resetForm();
  }
}
