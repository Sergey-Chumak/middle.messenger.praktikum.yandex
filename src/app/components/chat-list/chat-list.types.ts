import { ChatCards, IChatCard } from './chat-cards';

export interface IChatListProps {
    chatCards?: IChatCard[];
    value?: string;
}

export interface IChatListChildren {
    chatCards: ChatCards;
}
