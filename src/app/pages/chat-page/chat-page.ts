// @ts-ignore
import { v4 as makeUUID } from 'uuid';
import { tmpl } from './chat-page.tmpl';
import Block from '../../services/block';
import { ChatList } from './chat-list';
import { Chat } from './chat';
import last from '../../utils/last';
import { PlugDialog } from './plug-dialog';
import { IChatPageChildren, IChatPageProps } from './chat-page.types';
import { chatsService } from '../../services/chats/chats.service';
import connect from '../../utils/hoc/connect';
import { loader } from '../../components/loader';
import { NewChatModal } from './modals/new-chat-modal';

class ChatPage extends Block<IChatPageProps, IChatPageChildren> {
  newChatName = '';
  scrollChats: number;

  constructor(props: IChatPageProps) {
    super('div', props);
    loader.show();

    this.children.chat = new Chat({
      name: '',
      value: '',
      disabled: true,
    });

    this.children.newChatModal = new NewChatModal({ });

    this.children.plug = new PlugDialog({});
    this.children.plug.hide();
    this.children.chatList = new ChatList({ chatCards: [] });

    this.children.chat.hide();
  }

  componentDidMount() {
    chatsService.getChats().then((data) => {
      if (data.find((chat) => chat.id === +last(document.location.href.split('/')))) {
        this.children.plug.hide();
        this.children.chat.show();
      }
    });

    this.setProps({
      events: {
        input: (event: Event) => {
          if ((event.target as HTMLElement).id === 'create-chat-modal-input') {
            this.newChatName = (event.target as HTMLInputElement).value;
          }
        },
        keydown: (event: KeyboardEvent) => {
          if ((event.target as HTMLElement).id === 'create-chat-modal-input') {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter')) {
              chatsService.createChat(this.newChatName);
              this.children.newChatModal.close();
            }
          }
        },
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'new-chat-icon') {
            this.children.newChatModal.open();
          }
          if ((event.target as HTMLElement).id === 'create-chat-modal-confirm') {
            chatsService.createChat(this.newChatName);
            this.children.newChatModal.close();
          }
        },
      },
    });
  }

  componentDidUpdate(oldProps:IChatPageProps, newProps: IChatPageProps): boolean {
    if (newProps.chats?.find((chat) => chat.id === +last(document.location.href.split('/')))) {
      this.children.plug.hide();
      this.children.chat.show();
    } else {
      this.children.plug.show();
      this.children.chat.hide();
    }
    if (oldProps.chats !== newProps.chats) return false;
    console.log('render');
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatList: this.children.chatList,
      chat: this.children.chat,
      plug: this.children.plug,
      newChatModal: this.children.newChatModal,
    });
  }
}

export const ChatPageWrap = connect((state) => ({
  chats: state?.chats,
}))(ChatPage as typeof Block);
