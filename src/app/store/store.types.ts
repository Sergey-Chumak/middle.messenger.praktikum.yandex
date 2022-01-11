import { IUserData } from '../services/auth/auth.types';
import { IChatCard } from '../services/chats/chats.types';

export enum StoreEvents {
    Updated = 'updated',
}

export interface IState {
    user?: IUserData;
    chats?: IChatCard[];
    chatUsers?: IUserData[];
}

export type Indexed<T = unknown> = IState | null | string | number | T
