import { IPropsAndChildren } from '../../../services/types';

export interface IButtonContext extends IPropsAndChildren{
    name: string;
    class?: string;
    id?: string;
    type?: string;
    color?: 'primary' | 'secondary';
    size?: 's' | 'm' | 'l';
}
