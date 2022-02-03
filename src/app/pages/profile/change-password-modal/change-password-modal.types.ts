import { CInput } from '../../../components/c-input';
import { IUserData } from '../../../services/auth/auth.types';
import { CButton } from '../../../components/c-button';

export interface IPropsChangePasswordModal {
    userData?: IUserData;
}

export interface IChildrenChangePasswordModal {
    [EChangePasswordChildren.OldPasswordInput]: CInput;
    [EChangePasswordChildren.PasswordInput]: CInput;
    [EChangePasswordChildren.PasswordRepeatInput]: CInput;
    [EChangePasswordChildren.SubmitBtn]: CButton;
    [EChangePasswordChildren.LinkBtn]: CButton;
}

export enum EChangePasswordChildren {
    OldPasswordInput = 'oldPasswordInput',
    PasswordInput = 'passwordInput',
    PasswordRepeatInput = 'passwordRepeatInput',
    SubmitBtn = 'submitBtn',
    LinkBtn = 'linkBtn',
}

export enum EChangePasswordFormFields {
    OldPassword = 'oldPassword',
    Password = 'newPassword',
    PasswordRepeat = 'passwordRepeat',
}

export interface IChangePasswordFormValue {
    [EChangePasswordFormFields.OldPassword]: string;
    [EChangePasswordFormFields.Password]: string;
    [EChangePasswordFormFields.PasswordRepeat]?: string;
}
