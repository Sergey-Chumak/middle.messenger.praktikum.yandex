import { Button } from '../button';
import { Input } from '../input';

export interface IPropsModal {
    header: string;
    message: string;
    confirm: string;
    cancel: string;
    buttonId: string;
    avatar?: boolean;
    isInput?: boolean;
}

export interface IChildrenModal {
    confirm: Button;
    cancel: Button;
    input: Input;
}
