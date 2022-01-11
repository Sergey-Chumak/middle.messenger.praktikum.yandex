import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { IUserData } from '../../services/auth/auth.types';
import { Snackbar } from '../../components/ui/snackbar';
import { Modal } from '../../components/ui/modal';

export enum UserDataKeys {
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
    [UserDataKeys.Email]: string;
    [UserDataKeys.Login]: string;
    [UserDataKeys.FirstName]: string;
    [UserDataKeys.SecondName]: string;
    [UserDataKeys.Phone]: string;
    [UserDataKeys.DisplayName]: string;
}

export interface IPropsProfile {
    userName?: string;
    userData?: IUserData;
    nonAvailableChangeData?: boolean;
    emailInput?: Input;
    loginInput?: Input;
    nameInput?: Input;
    lastNameInput?: Input;
    nicknameInput?: Input;
    phoneInput?: Input;
    oldPasswordInput?: Input;
    newPasswordInput?: Input;
    newPasswordRepeatInput?: Input;
    saveDataBtn?: Button;
    savePassBtn?: Button;
    avatar?: string;
}

export interface IChildrenProfile {
    emailInput: Input;
    loginInput: Input;
    nameInput: Input;
    lastNameInput: Input;
    nicknameInput: Input;
    phoneInput: Input;
    oldPasswordInput: Input;
    newPasswordInput: Input;
    newPasswordRepeatInput: Input;
    saveDataBtn: Button;
    savePassBtn: Button;
    snackbar: Snackbar;
    modal: Modal;
}
