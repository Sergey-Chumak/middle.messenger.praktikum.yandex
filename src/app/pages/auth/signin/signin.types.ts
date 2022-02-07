import { CInput } from '../../../components/c-input';
import { CButton } from '../../../components/c-button';

export enum ESigninFormFields {
    Login = 'login',
    Password = 'password'
}

export interface ISigninFormValue {
    [ESigninFormFields.Login]: string;
    [ESigninFormFields.Password]: string;
}

export enum ESigninChildren {
    LoginInput = 'loginInput',
    PasswordInput = 'passwordInput',
    SubmitBtn = 'submitBtn',
    LinkBtn = 'linkBtn',
}

export interface ISigninChildren {
    [ESigninChildren.LoginInput]: CInput;
    [ESigninChildren.PasswordInput]: CInput;
    [ESigninChildren.SubmitBtn]: CButton;
    [ESigninChildren.LinkBtn]: CButton;
}
