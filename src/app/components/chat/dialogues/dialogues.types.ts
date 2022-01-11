export interface IDialoguesProps {
    dialogues: IDialog[];
}

export interface IDialog {
    date: string;
    messages: IMessage[];
}

export interface IMessage {
   chat_id: number;
   content: string;
   file: null;
   id: number;
   is_read: boolean;
   time: string;
   type: 'message';
   user_id: number;
}
