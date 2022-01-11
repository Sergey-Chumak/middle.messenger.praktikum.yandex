import { Dialogues, IMessage } from './dialogues';
import { Modal } from '../ui/modal';

export interface IChatProps {
    name: string;
    disabled: boolean;
    dialogues?: IMessage[];
    value?: string;
    users?: string;
}

export interface IChatChildren {
    dialogues: Dialogues;
    modal: Modal;
}
