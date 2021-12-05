import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export interface ISignInFormValue {
    login: string;
    password: string;
}

export interface IChildrenAuth {
    loginInput: Input,
    passwordInput: Input,
    submitBtn: Button
}

export interface IPropsAuth {
    loginInput?: Input,
    passwordInput?: Input,
    submitBtn?: Button
}
