import Block from './block';
import extend = Handlebars.Utils.extend;

export type TCompileTemplate<T = {}> = (context: T) => string;

export type TPropsAndChildren<T> = T & {
    __id?: string;
    settings?: ISettings;
    events?: IEvents;
    children?: IChildrenBlock<unknown>

}

export type IChildrenBlock<T> = {
    [key in keyof T]: Block<T>;
}

interface ISettings {
    withInternalID?: boolean;
}

interface IEvents {
    [key: string]: (event?: Event) => void;
}

export interface IMeta {
    tagName: string;
    props: TPropsAndChildren<unknown>;
}

export enum EventsBusEvents {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}
