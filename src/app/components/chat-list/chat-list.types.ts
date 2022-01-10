import { ChatCards } from './chat-cards';
import { IChat } from '../../services/chats/chats.types';

export interface IChatListProps {
    chatCards: IChat[];
    value?: string;
}

export interface IChatListChildren {
    chatCards: ChatCards;
}
