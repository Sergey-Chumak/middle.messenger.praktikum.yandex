import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Snackbar } from '../../../components/ui/snackbar';

export enum ESigninFormKeys {
    Login = 'login',
    Password = 'password'
}

export enum EChildrenSigninKeys {
    LoginInput = 'loginInput',
    PasswordInput = 'passwordInput',
    SubmitBtn = 'submitBtn',
    Snackbar = 'snackbar'
}

export interface ISigninFormValue {
    [ESigninFormKeys.Login]: string;
    [ESigninFormKeys.Password]: string;
}

export interface IChildrenSignin {
    [EChildrenSigninKeys.LoginInput]: Input;
    [EChildrenSigninKeys.PasswordInput]: Input;
    [EChildrenSigninKeys.SubmitBtn]: Button;
    [EChildrenSigninKeys.Snackbar]: Snackbar;
}

export interface IPropsSignin {
    loginInput?: Input;
    passwordInput?: Input;
    submitBtn?: Button;
    snackbar?: Snackbar;
}
