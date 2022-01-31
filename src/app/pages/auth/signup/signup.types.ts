import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export enum ESignupFormFields {
    Email = 'email',
    Login = 'login',
    Name = 'first_name',
    LastName = 'second_name',
    Phone = 'phone',
    Password = 'password',
    PasswordRepeat = 'passwordRepeat',
}

export interface ISignupFormValue {
    [ESignupFormFields.Email]: string;
    [ESignupFormFields.Login]: string;
    [ESignupFormFields.Name]: string;
    [ESignupFormFields.LastName]: string;
    [ESignupFormFields.Phone]: string;
    [ESignupFormFields.Password]: string;
    [ESignupFormFields.PasswordRepeat]?: string;
}

export enum ESignupChildren {
    EmailInput = 'emailInput',
    LoginInput = 'loginInput',
    NameInput = 'nameInput',
    LastNameInput = 'lastNameInput',
    PhoneInput = 'phoneInput',
    PasswordInput = 'passwordInput',
    PasswordRepeatInput = 'passwordRepeatInput',
    SubmitBtn = 'submitBtn',
    LinkBtn = 'linkBtn',
}

export interface IChildrenSignup {
    [ESignupChildren.EmailInput]: Input;
    [ESignupChildren.LoginInput]: Input;
    [ESignupChildren.NameInput]: Input;
    [ESignupChildren.LastNameInput]: Input;
    [ESignupChildren.PhoneInput]: Input;
    [ESignupChildren.PasswordInput]: Input;
    [ESignupChildren.PasswordRepeatInput]: Input;
    [ESignupChildren.SubmitBtn]: Button;
    [ESignupChildren.LinkBtn]: Button;
}
