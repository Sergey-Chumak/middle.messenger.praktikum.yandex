export interface IInputContext {
    labelName: string;
    id: string;
    type: string;
    value: string;
    class?: string;
    autocomplete?: 'on' | 'off';
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    from?: string;
}
