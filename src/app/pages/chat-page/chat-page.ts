import { v4 as makeUUID } from 'uuid';
import { tmpl } from './chat-page.tmpl';
import Block from '../../services/block';
import { ChatList } from '../../components/chat-list';
import { Chat } from '../../components/chat';
import last from '../../utils/last';
import { getUsersData, updateUserData } from '../../services/server-data';
import { PlugDialog } from '../../components/plug-dialog';
import { IChatPageChildren, IChatPageProps } from './chat-page.types';
import { IChatCard } from '../../components/chat-list/chat-cards';
import { getElementWithId } from '../../utils/get-element';
import { getDateCustomFormat, getTimeNow } from '../../utils/date';
import { IDialog, IMessage } from '../../components/chat/dialogues';

export class ChatPage extends Block<IChatPageProps, IChatPageChildren> {
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
          if (!this.chatCards.find(((item) => item.id === getElementWithId(event.target as HTMLElement)))) return;
          this.chatCards.forEach((item) => {
            item.id === getElementWithId(event.target as HTMLElement)
              ? item.status = 'active'
              : item.status = 'passive';
          });

          const currentId = this.chatCards.find((item) => item.status === 'active')?.id;
          document.location.href = `${document.location.origin}/chat-page/${currentId}`;

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
          if ((event.target as HTMLElement).id === 'input-message') {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter') && this.currentMessage) {
              this.sendMessage();
            }
          }
        },
        input: (event: Event) => {
          if ((event.target as HTMLInputElement).id === 'input-message') {
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

    console.log(this.dialogues[0].messages.find((item) => item.id === id));

    updateUserData(this.chatCards);

    this.currentMessage = '';
    const filteredChatCards = this.chatCards.filter((item) => item.name.toLowerCase()
      .includes(this.searchValue));
    this.children.chatList.setProps({ chatCards: filteredChatCards, value: this.searchValue });
    this.children.chat.setProps({ value: '', dialogues: [...this.dialogues] });
    (document.querySelector('#input-message') as HTMLElement)?.focus();

    this.messageDelivered(id);
  }

  messageDelivered(id: string) {
    setTimeout(() => {
      (this.dialogues[0].messages.find((item) => item.id === id) as IMessage).status = 'sent';
      this.children.chat.setProps({ dialogues: [...this.dialogues] });
    }, 1000);
  }

  loadUserData(): void {
    setTimeout(() => {
      const userData = getUsersData();
      const user = userData.find((item) => item.id === last(document.location.href.split('/')));

      this.dialogues = user?.chat as IDialog[];
      this.chatCards = userData as IChatCard[];

      this.initActiveChat();

      this.children.chatList.setProps({ chatCards: this.chatCards });
      this.children.chat.setProps({
        disabled: false,
        name: user?.name,
        dialogues: this.dialogues,
      });
    }, 700);
  }

  initActiveChat(): void {
    this.chatCards.forEach((item) => {
      item.id === last(document.location.href.split('/'))
        ? item.status = 'active'
        : item.status = 'passive';
    });
  }
}
