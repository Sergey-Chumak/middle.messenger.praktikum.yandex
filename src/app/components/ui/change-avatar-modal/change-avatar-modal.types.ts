import { Button } from '../button';

export interface IPropsChangeAvatarModal {
    inputId: string;
    confirmBtnId: string;
}

export interface IChildrenChangeAvatarModal {
    confirmBtn: Button;
    cancelBtn: Button;
}
