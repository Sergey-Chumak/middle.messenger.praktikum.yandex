import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export interface IUserPassFormValue {
    oldPassword: string;
    newPassword: string;
    newRepeatPassword: string;
}

export interface IUserDataFormValue {
    email: string;
    login: string;
    name: string;
    lastName: string;
    nickname: string;
    phone: string;
}

export interface IPropsProfile {
    userName?: string;
    nonAvailableChangeData?: boolean;
    emailInput?: Input;
    loginInput?: Input;
    nameInput?: Input;
    lastNameInput?: Input;
    nicknameInput?: Input;
    phoneInput?: Input;
    oldPasswordInput?: Input;
    newPasswordInput?: Input;
    newPasswordRepeatInput?: Input;
    saveDataBtn?: Button;
    savePassBtn?: Button;
}

export interface IChildrenProfile {
    emailInput: Input;
    loginInput: Input;
    nameInput: Input;
    lastNameInput: Input;
    nicknameInput: Input;
    phoneInput: Input;
    oldPasswordInput: Input;
    newPasswordInput: Input;
    newPasswordRepeatInput: Input;
    saveDataBtn: Button;
    savePassBtn: Button;
}
