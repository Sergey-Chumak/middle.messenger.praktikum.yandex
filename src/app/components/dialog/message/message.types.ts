export interface IMessagesContext {
    messages: IMessage[]
}

export interface IMessage {
    message: string;
    from: 'me' | 'friend';
    time: string;
    status?: 'sent' | 'sending';
    id?: string;
}
