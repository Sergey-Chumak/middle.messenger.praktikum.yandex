import { ChatCards } from './chat-cards';
import { IChatCard } from '../../../services/chats/chats.types';

export interface IChatListProps {
    chatCards: IChatCard[];
}

export interface IChatListChildren {
    chatCards: ChatCards;
}
