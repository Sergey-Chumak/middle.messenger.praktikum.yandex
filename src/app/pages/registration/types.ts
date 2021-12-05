import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export interface ISignUpFormValue {
    email: string;
    login: string;
    name: string;
    lastName: string;
    phone: string;
    password: string;
    passwordRepeat?: string;
}

export interface IPropsRegistration {
    emailInput?: Input,
    loginInput?: Input,
    nameInput?: Input,
    lastNameInput?: Input,
    phoneInput?: Input,
    passwordInput?: Input,
    passwordRepeatInput?: Input,
    submitBtn?: Button,
}

export interface IChildrenRegistration {
    emailInput: Input,
    loginInput: Input,
    nameInput: Input,
    lastNameInput: Input,
    phoneInput: Input,
    passwordInput: Input,
    passwordRepeatInput: Input,
    submitBtn: Button,
}
