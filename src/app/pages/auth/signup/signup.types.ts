import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Snackbar } from '../../../components/ui/snackbar';

export enum SignupFormKeys {
    Email = 'email',
    Login = 'login',
    Name = 'first_name',
    LastName = 'second_name',
    Phone = 'phone',
    Password = 'password',
    PasswordRepeat = 'passwordRepeat',
}

export enum ChildrenSignupKeys {
    EmailInput = 'emailInput',
    LoginInput = 'loginInput',
    NameInput = 'nameInput',
    LastNameInput = 'lastNameInput',
    PhoneInput = 'phoneInput',
    PasswordInput = 'passwordInput',
    PasswordRepeatInput = 'passwordRepeatInput',
    SubmitBtn = 'submitBtn',
    Snackbar = 'snackbar',
}

export interface ISignupFormValue {
    [SignupFormKeys.Email]: string;
    [SignupFormKeys.Login]: string;
    [SignupFormKeys.Name]: string;
    [SignupFormKeys.LastName]: string;
    [SignupFormKeys.Phone]: string;
    [SignupFormKeys.Password]: string;
    [SignupFormKeys.PasswordRepeat]?: string;
}

export interface IPropsSignup {
    emailInput?: Input;
    loginInput?: Input;
    nameInput?: Input;
    lastNameInput?: Input;
    phoneInput?: Input;
    passwordInput?: Input;
    passwordRepeatInput?: Input;
    submitBtn?: Button;
}

export interface IChildrenSignup {
    [ChildrenSignupKeys.EmailInput]: Input;
    [ChildrenSignupKeys.LoginInput]: Input;
    [ChildrenSignupKeys.NameInput]: Input;
    [ChildrenSignupKeys.LastNameInput]: Input;
    [ChildrenSignupKeys.PhoneInput]: Input;
    [ChildrenSignupKeys.PasswordInput]: Input;
    [ChildrenSignupKeys.PasswordRepeatInput]: Input;
    [ChildrenSignupKeys.SubmitBtn]: Button;
    [ChildrenSignupKeys.Snackbar]: Snackbar;
}
