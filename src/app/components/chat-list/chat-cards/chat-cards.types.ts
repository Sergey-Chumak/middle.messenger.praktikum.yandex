import { IDialog } from '../../chat/dialogues';

export interface IChatCardsProps {
    chatCards: IChatCard[];
}

export interface IChatCard {
    name: string;
    id: string;
    chat: IDialog[];
    time?: string;
    lastMessage?: string;
    notifications?: string;
    status?: 'active' | 'passive';
}
