import { IUserData } from '../services/auth/auth.types';
import { IChatCard } from '../services/chats/chats.types';
import { IMessage } from '../pages/chat-page/chat/dialogues';

export enum StoreEvents {
    Updated = 'updated',
}

export interface IState {
    user?: IUserData;
    chats?: IChatCard[];
    chatUsers?: IUserData[];
    currentChat?: string;
    chatUserNames?: string;
    currentMessages?: IMessage[];
}

export type Indexed<T = unknown> = IState | null | string | number | T
