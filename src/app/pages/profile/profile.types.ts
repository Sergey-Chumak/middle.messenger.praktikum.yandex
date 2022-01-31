import { CInput } from '../../components/ui/c-input';
import { CButton } from '../../components/ui/c-button';
import { IUserData } from '../../services/auth/auth.types';
import { ChangeAvatarModal } from '../../components/ui/change-avatar-modal';

export enum EUserDataKeys {
    FirstName = 'first_name',
    SecondName = 'second_name',
    DisplayName = 'display_name',
    Login = 'login',
    Email = 'email',
    Phone = 'phone',
}

export interface IUserPassFormValue {
    oldPassword: string;
    newPassword: string;
    newRepeatPassword?: string;
}

export interface IUserDataFormValue {
    [EUserDataKeys.Email]: string;
    [EUserDataKeys.Login]: string;
    [EUserDataKeys.FirstName]: string;
    [EUserDataKeys.SecondName]: string;
    [EUserDataKeys.Phone]: string;
    [EUserDataKeys.DisplayName]: string;
}

export interface IPropsProfile {
    userName?: string;
    userData?: IUserData;
    nonAvailableChangeData?: boolean;
    emailInput?: CInput;
    loginInput?: CInput;
    nameInput?: CInput;
    lastNameInput?: CInput;
    nicknameInput?: CInput;
    phoneInput?: CInput;
    oldPasswordInput?: CInput;
    newPasswordInput?: CInput;
    newPasswordRepeatInput?: CInput;
    saveDataBtn?: CButton;
    savePassBtn?: CButton;
    avatar?: string;
}

export interface IChildrenProfile {
    emailInput: CInput;
    loginInput: CInput;
    nameInput: CInput;
    lastNameInput: CInput;
    nicknameInput: CInput;
    phoneInput: CInput;
    oldPasswordInput: CInput;
    newPasswordInput: CInput;
    newPasswordRepeatInput: CInput;
    saveDataBtn: CButton;
    savePassBtn: CButton;
    changeAvatarModal: ChangeAvatarModal;
}
