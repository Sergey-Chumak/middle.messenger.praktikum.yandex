import { ChatList } from '../../components/chat-list';
import { Chat } from '../../components/chat';
import { PlugDialog } from '../../components/plug-dialog';
import { IChat } from '../../services/chats/chats.types';

export interface IChatPageProps {
    chats?: IChat[]
    chatList?: ChatList;
    chat?: Chat | PlugDialog;
}

export interface IChatPageChildren {
    chatList: ChatList;
    chat: Chat | PlugDialog;
}
