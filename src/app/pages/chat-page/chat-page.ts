// @ts-ignore
import { v4 as makeUUID } from 'uuid';
import { tmpl } from './chat-page.tmpl';
import Block from '../../services/block';
import { ChatList } from '../../components/chat-list';
import { Chat } from '../../components/chat';
import last from '../../utils/last';
import { getUsersData, IUsersData, updateUsersData } from '../../services/users-data';
import { PlugDialog } from '../../components/plug-dialog';
import { IChatPageChildren, IChatPageProps } from './chat-page.types';
import { IChatCard } from '../../components/chat-list/chat-cards';
import { getElementId } from '../../utils/get-element-id';
import { getDateCustomFormat, getTimeNow } from '../../utils/date';
import { IDialog, IMessage } from '../../components/chat/dialogues';
import { router } from '../../routing/routing';
import { chatsService } from '../../services/chats/chats.service';
import connect from '../../utils/hoc/connect';

class ChatPage extends Block<IChatPageProps, IChatPageChildren> {
  searchValue = '';
  chatCards: IChatCard[] = [];
  dialogues: IDialog[] = [];
  currentMessage = '';

  constructor(props: IChatPageProps) {
    super('div', props);
    if (getUsersData().find((user) => user.id === last(document.location.href.split('/')))) {
      this.children.chat = new Chat({
        name: '',
        value: '',
        disabled: true,
        dialogues: this.dialogues,
      });
    } else {
      this.children.chat = new PlugDialog({});
    }
    this.children.chatList = new ChatList({ chatCards: this.chatCards });
  }

  componentDidMount() {
    this.initComponent();
    this.initChildren();
    this.loadUserData();

    chatsService.getChats();
  }

  componentDidUpdate(oldProps, newProps): boolean {
    this.chatCards = this.props.chat;
    this.children.chatList.setProps({
      chatCards: this.chatCards,
    });
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatList: this.children.chatList,
      chat: this.children.chat,
    });
  }

  initComponent() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if (!this.chatCards?.find(((item) => item.id === getElementId(event.target as HTMLElement)))) return;
          this.chatCards.forEach((item) => {
            item.id === getElementId(event.target as HTMLElement)
              ? item.status = 'active'
              : item.status = 'passive';
          });

          const currentId = this.chatCards.find((item) => item.status === 'active')?.id;
          router.go(`/messenger/${currentId}`);

          this.children.chatList.setProps({ chatCards: this.chatCards });
        },
        input: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'input-search') return;
          this.searchValue = (event.target as HTMLInputElement).value.toLowerCase();
          const filteredChatCards = this.chatCards.filter((item) => item.name.toLowerCase()
            .includes(this.searchValue));
          this.children.chatList.setProps({ chatCards: filteredChatCards });
        },
      },
    });
  }

  initChildren(): void {
    this.children.chat.setProps({
      dialogues: this.dialogues,
      disabled: false,
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'send-message-btn' && this.currentMessage) {
            this.sendMessage();
          }
        },
        keydown: (event: KeyboardEvent) => {
          if ((event.target as HTMLElement).id === 'message') {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter') && this.currentMessage) {
              this.sendMessage();
            }
          }
        },
        input: (event: Event) => {
          if ((event.target as HTMLInputElement).id === 'message') {
            this.currentMessage = (event.target as HTMLInputElement)?.value;
          }
        },
      },
    });
  }

  sendMessage(): void {
    const id = makeUUID();
    const dialog = this.dialogues.find((item) => item.date === getDateCustomFormat());

    if (dialog) {
      dialog.messages.unshift({
        message: this.currentMessage,
        status: 'sending',
        time: getTimeNow(),
        from: 'me',
        id,
      });
    } else {
      this.dialogues.unshift({
        date: getDateCustomFormat(),
        messages: [{
          message: this.currentMessage,
          status: 'sending',
          time: getTimeNow(),
          from: 'me',
          id,
        }],
      });
    }

    updateUsersData(this.chatCards as IUsersData[]); // Временный тип

    this.currentMessage = '';
    const filteredChatCards = this.chatCards.filter((item) => item.name.toLowerCase()
      .includes(this.searchValue));
    this.children.chatList.setProps({ chatCards: filteredChatCards, value: this.searchValue });
    this.children.chat.setProps({ value: '', dialogues: [...this.dialogues] });
    (document.querySelector('#message') as HTMLElement)?.focus();

    this.messageDelivered(id);
  }

  messageDelivered(id: string) {
    setTimeout(() => {
      (this.dialogues[0].messages.find((item) => item.id === id) as IMessage).status = 'sent';
      this.children.chat.setProps({ dialogues: [...this.dialogues] });
    }, 1000);
  }

  loadUserData(): void {
    // setTimeout(() => {
    //   const userData = getUsersData();
    //   const user = userData.find((item) => item.id === last(document.location.href.split('/')));
    //
    //   this.dialogues = user?.chat as IDialog[];
    //   this.chatCards = userData as IChatCard[];
    //
    //   this.initActiveChat();
    //
    //   this.children.chatList.setProps({ chatCards: this.chatCards });
    //   this.children.chat.setProps({
    //     disabled: false,
    //     name: user?.name,
    //     dialogues: this.dialogues,
    //   });
    // }, 700);
  }

  initActiveChat(): void {
    this.chatCards.forEach((item) => {
      item.id === last(document.location.href.split('/'))
        ? item.status = 'active'
        : item.status = 'passive';
    });
  }
}

export const ChatPageWrap = connect((state) => ({
  chats: state?.chats,
}))(ChatPage as typeof Block);
