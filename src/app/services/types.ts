import { IState } from '../store/store.types';

export type TPropsAndChildren<T> = T & {
    __id?: string;
    settings?: ISettings;
    events?: IEvents;
    children?: TChildrenBlock<unknown>;
    [key: string]: any | IState;
}

export type TChildrenBlock<T> = {
    [P in keyof T]: T[P];
}

interface ISettings {
    withInternalID?: boolean;
}

export interface IEvents {
    [key: string]: (event?: Event) => void;
}

export interface IMeta {
    tagName: string;
    props: TPropsAndChildren<unknown>;
}

export enum EEventsBusEvents {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}
