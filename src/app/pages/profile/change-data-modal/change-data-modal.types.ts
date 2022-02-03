import { CInput } from '../../../components/c-input';
import { IUserData } from '../../../services/auth/auth.types';
import { CButton } from '../../../components/c-button';

export interface IPropsChangeDataModal {
    userData?: IUserData;
}

export interface IChildrenChangeDataModal {
    [EChangeDataModalChildren.EmailInput]: CInput;
    [EChangeDataModalChildren.LoginInput]: CInput;
    [EChangeDataModalChildren.FirstNameInput]: CInput;
    [EChangeDataModalChildren.SecondNameInput]: CInput;
    [EChangeDataModalChildren.DisplayNameInput]: CInput;
    [EChangeDataModalChildren.PhoneInput]: CInput;
    [EChangeDataModalChildren.SubmitBtn]: CButton;
    [EChangeDataModalChildren.LinkBtn]: CButton;
}

export enum EChangeDataModalChildren {
    EmailInput = 'emailInput',
    LoginInput = 'loginInput',
    FirstNameInput = 'firstNameInput',
    SecondNameInput = 'secondNameInput',
    DisplayNameInput = 'displayNameInput',
    PhoneInput = 'phoneInput',
    SubmitBtn = 'submitBtn',
    LinkBtn = 'linkBtn',
}

export enum EChangeDataFormFields {
    Email = 'email',
    Login = 'login',
    FirstName = 'first_name',
    SecondName = 'second_name',
    DisplayName = 'display_name',
    Phone = 'phone',
}

export interface IChangeDataFormValue {
    [EChangeDataFormFields.Email]: string;
    [EChangeDataFormFields.Login]: string;
    [EChangeDataFormFields.FirstName]: string;
    [EChangeDataFormFields.SecondName]: string;
    [EChangeDataFormFields.DisplayName]: string;
    [EChangeDataFormFields.Phone]: string;
}
