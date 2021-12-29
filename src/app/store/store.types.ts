import { IUserData } from '../services/auth/auth.types';
import { IChat } from '../services/chats/chats.types';

export enum StoreEvents {
    Updated = 'updated',
}

export interface IState {
    user?: IUserData,
    chats?: IChat[]
}

export type Indexed<T = unknown> = IState | null | string | number | T
