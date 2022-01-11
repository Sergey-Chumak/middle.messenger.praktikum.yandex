import { ChatCards } from './chat-cards';
import { IChatCard } from '../../services/chats/chats.types';

export interface IChatListProps {
    chatCards: IChatCard[];
    value?: string;
}

export interface IChatListChildren {
    chatCards: ChatCards;
}
