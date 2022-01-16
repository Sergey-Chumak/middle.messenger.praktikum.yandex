import { Dialogues, IDialog, IMessage } from './dialogues';
import { Modal } from '../../../components/ui/modal';

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
