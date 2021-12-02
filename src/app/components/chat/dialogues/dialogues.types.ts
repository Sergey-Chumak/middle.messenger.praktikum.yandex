export interface IDialoguesProps {
    dialogues: IDialog[];
}

export interface IDialog {
    date: string;
    messages: IMessage[];
}

export interface IMessage {
    message: string;
    from: 'me' | 'friend';
    time: string;
    status?: 'sent' | 'sending';
    id?: string;
}
