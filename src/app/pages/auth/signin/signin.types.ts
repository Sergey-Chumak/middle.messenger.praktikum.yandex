import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

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
    [ESigninChildren.LoginInput]: Input;
    [ESigninChildren.PasswordInput]: Input;
    [ESigninChildren.SubmitBtn]: Button;
    [ESigninChildren.LinkBtn]: Button;
}
