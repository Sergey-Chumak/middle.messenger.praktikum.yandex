import { Dialogues, IDialog } from './dialogues';

export interface IChatProps {
    name: string;
    disabled: boolean;
    dialogues?: IDialog[];
    value?: string;
}

export interface IChatChildren {
    dialogues: Dialogues;
}
