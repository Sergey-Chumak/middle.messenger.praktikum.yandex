import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Snackbar } from '../../../components/ui/snackbar';

export enum ESignupFormKeys {
    Email = 'email',
    Login = 'login',
    Name = 'first_name',
    LastName = 'second_name',
    Phone = 'phone',
    Password = 'password',
    PasswordRepeat = 'passwordRepeat',
}

export enum EChildrenSignupKeys {
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
    [ESignupFormKeys.Email]: string;
    [ESignupFormKeys.Login]: string;
    [ESignupFormKeys.Name]: string;
    [ESignupFormKeys.LastName]: string;
    [ESignupFormKeys.Phone]: string;
    [ESignupFormKeys.Password]: string;
    [ESignupFormKeys.PasswordRepeat]?: string;
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
    [EChildrenSignupKeys.EmailInput]: Input;
    [EChildrenSignupKeys.LoginInput]: Input;
    [EChildrenSignupKeys.NameInput]: Input;
    [EChildrenSignupKeys.LastNameInput]: Input;
    [EChildrenSignupKeys.PhoneInput]: Input;
    [EChildrenSignupKeys.PasswordInput]: Input;
    [EChildrenSignupKeys.PasswordRepeatInput]: Input;
    [EChildrenSignupKeys.SubmitBtn]: Button;
    [EChildrenSignupKeys.Snackbar]: Snackbar;
}
