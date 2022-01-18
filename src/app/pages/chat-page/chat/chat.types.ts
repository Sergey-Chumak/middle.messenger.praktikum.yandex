import { Dialogues, IDialog, IMessage } from './dialogues';

export interface IChatProps {
    name: string;
    dialogues?: IDialog[];
    value?: string;
    users?: string;
    chatUsers?: string;
    currentMessages?: IMessage[];
}

export interface IChatChildren {
    dialogues: Dialogues;
}
