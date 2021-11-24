import Block from './block';

export type TCompileTemplate<T = {}> = (context: T) => string;

export interface IProps {
    [key: string]: unknown;
    __id?: string;
    settings?: ISettings;
    events?: IEvents;
}

export interface IPropsAndChildren extends IProps{
    children?: {
        [key: string]: unknown;
    }
}

interface ISettings {
    withInternalID?: boolean;
}

interface IEvents {
    [key: string]: (event: Event) => void;
}

export interface IMeta {
    tagName: string;
    props: IProps;
}

export enum EventsBusEvents {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_RENDER = 'flow:render',
}
