import { Button } from '../button';

export interface IPropsModal {
    target?: string;
    message: string;
    confirm: string;
    cancel: string;
    buttonId: string;
}

export interface IChildrenModal {
    confirm: Button;
    cancel: Button;
}
