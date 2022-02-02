import { CInput } from '../../../components/c-input';
import { CButton } from '../../../components/c-button';

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
    [ESignupChildren.EmailInput]: CInput;
    [ESignupChildren.LoginInput]: CInput;
    [ESignupChildren.NameInput]: CInput;
    [ESignupChildren.LastNameInput]: CInput;
    [ESignupChildren.PhoneInput]: CInput;
    [ESignupChildren.PasswordInput]: CInput;
    [ESignupChildren.PasswordRepeatInput]: CInput;
    [ESignupChildren.SubmitBtn]: CButton;
    [ESignupChildren.LinkBtn]: CButton;
}
