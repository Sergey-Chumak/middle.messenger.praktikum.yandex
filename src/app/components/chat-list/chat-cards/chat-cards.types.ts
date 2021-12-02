export interface IChatCardsProps {
    chatCards: IChatCard[],
}

export interface IChatCard {
    name: string;
    id: string;
    time?: string;
    lastMessage?: string;
    notifications?: string;
    status?: 'active' | 'passive';
}
