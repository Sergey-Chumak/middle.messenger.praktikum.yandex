import { IPropsAndChildren } from '../../../services/types';

export interface IInputContext extends IPropsAndChildren{
    labelName: string;
    id: string;
    type: string;
    value: string;
    class?: string;
    autocomplete?: 'on' | 'off';
    autofocus?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    from?: string;
    placeholder?: string;
}
