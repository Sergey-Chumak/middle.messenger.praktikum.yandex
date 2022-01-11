import { ChatList } from '../../components/chat-list';
import { Chat } from '../../components/chat';
import { PlugDialog } from '../../components/plug-dialog';
import { IChatCard } from '../../services/chats/chats.types';

export interface IChatPageProps {
    chats?: IChatCard[]
    chatList?: ChatList;
    chat?: Chat;
}

export interface IChatPageChildren {
    chatList: ChatList;
    chat: Chat;
    plug: PlugDialog;
}
