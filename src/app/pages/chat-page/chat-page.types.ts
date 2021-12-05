import { ChatList } from '../../components/chat-list';
import { Chat } from '../../components/chat';
import { PlugDialog } from '../../components/plug-dialog';

export interface IChatPageProps {
    chatList?: ChatList;
    chat?: Chat | PlugDialog;
}

export interface IChatPageChildren {
    chatList: ChatList;
    chat: Chat | PlugDialog;
}
