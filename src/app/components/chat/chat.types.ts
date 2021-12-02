import { Dialogues } from './dialogues';

export interface IChatProps {
    name: string;
    disabled: boolean;
    dialogues?: string;
    value?: string;
}

export interface IChatChildren {
    dialogues: Dialogues
}
