import { Dialogues, IDialog } from './dialogues';
import { Modal } from '../ui/modal';

export interface IChatProps {
    name: string;
    disabled: boolean;
    dialogues?: IDialog[];
    value?: string;
    users?: string;
}

export interface IChatChildren {
    dialogues: Dialogues;
    modal: Modal;
}
