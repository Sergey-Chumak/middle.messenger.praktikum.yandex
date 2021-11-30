import { TPropsAndChildren } from '../../../services/types';

export interface IButtonContext extends TPropsAndChildren{
    name: string;
    class?: string;
    id?: string;
    type?: string;
    color?: 'primary' | 'secondary';
    size?: 's' | 'm' | 'l';
}
