import Block from './block';

export type TCompileTemplate<T = {}> = (context: T) => string;

export type IPropsAndChildren<T> = T & {
    __id?: string;
    settings?: ISettings;
    events?: IEvents;
    children?: IChildrenBlock

}

export interface IChildrenBlock {
    [key: string]: Block<unknown>;
}

interface ISettings {
    withInternalID?: boolean;
}

interface IEvents {
    [key: string]: (event?: Event) => void;
}

export interface IMeta {
    tagName: string;
    props: IPropsAndChildren<unknown>;
}

// eslint-disable-next-line no-shadow
export enum EventsBusEvents {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}
