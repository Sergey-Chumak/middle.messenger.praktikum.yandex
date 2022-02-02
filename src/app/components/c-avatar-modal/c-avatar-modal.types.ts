import { CButton } from '../c-button';

export interface IPropsChangeAvatarModal {
    inputId: string;
    confirmBtnId: string;
}

export interface IChildrenChangeAvatarModal {
    confirmBtn: CButton;
    cancelBtn: CButton;
}
