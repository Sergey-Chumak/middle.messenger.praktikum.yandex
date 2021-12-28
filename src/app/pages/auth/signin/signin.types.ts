import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Snackbar } from '../../../components/ui/snackbar';

export enum SigninFormKeys {
    Login = 'login',
    Password = 'password'
}

export enum ChildrenSigninKeys {
    LoginInput = 'loginInput',
    PasswordInput = 'passwordInput',
    SubmitBtn = 'submitBtn',
    Snackbar = 'snackbar'
}

export interface ISigninFormValue {
    [SigninFormKeys.Login]: string;
    [SigninFormKeys.Password]: string;
}

export interface IChildrenSignin {
    [ChildrenSigninKeys.LoginInput]: Input;
    [ChildrenSigninKeys.PasswordInput]: Input;
    [ChildrenSigninKeys.SubmitBtn]: Button;
    [ChildrenSigninKeys.Snackbar]: Snackbar;
}

export interface IPropsSignin {
    loginInput?: Input;
    passwordInput?: Input;
    submitBtn?: Button;
    snackbar?: Snackbar;
}
