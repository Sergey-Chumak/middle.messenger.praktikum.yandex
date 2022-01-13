import { ChatList } from './chat-list';
import { Chat } from './chat';
import { PlugDialog } from './plug-dialog';
import { IChatCard } from '../../services/chats/chats.types';
import { IMessage } from './chat/dialogues';
import { NewChatModal } from './modals/new-chat-modal';

export interface IChatPageProps {
    chats?: IChatCard[];
    currentMessages?: IMessage[];
    chatList?: ChatList;
    chat?: Chat;
}

export interface IChatPageChildren {
    chatList: ChatList;
    chat: Chat;
    plug: PlugDialog;
    newChatModal: NewChatModal;
}
