import { TPropsAndChildren } from '../../../services/types';

export interface IInputContext extends TPropsAndChildren{
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
