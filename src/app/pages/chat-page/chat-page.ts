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
import { getElementId } from '../../utils/get-element-id';
import { getDateCustomFormat, getTimeNow } from '../../utils/date';
import { IDialog, IMessage } from '../../components/chat/dialogues';
import { router } from '../../routing/routing';
import { chatsService } from '../../services/chats/chats.service';
import connect from '../../utils/hoc/connect';
import { IChat } from '../../services/chats/chats.types';
import store from '../../store/store';

class ChatPage extends Block<IChatPageProps, IChatPageChildren> {
  searchValue = '';
  chatCards: IChat[] = [];
  dialogues: IDialog[] = [];
  currentMessage = '';

  constructor(props: IChatPageProps) {
    super('div', props);

    this.children.chat = new Chat({
      name: '',
      value: '',
      disabled: true,
    });
    this.children.plug = new PlugDialog({});
    this.children.chatList = new ChatList({ chatCards: this.chatCards });
  }

  componentDidMount() {
    this.children.plug.show();
    this.children.chat.hide();

    this.initComponent();
    this.initChildren();

    chatsService.getChats().then((data) => {
      this.loadUserData(data);
      if (data.find((chat) => chat.id === +last(document.location.href.split('/')))) {
        this.children.plug.hide();
        this.children.chat.show();
      }
    });
  }

  componentDidUpdate(_oldProps:IChatPageProps, newProps: IChatPageProps): boolean {
    this.loadUserData(newProps?.chats!);
    this.children.chatList.setProps({
      chatCards: newProps?.chats
        // .sort((a, b) => {
        //   if (!!a?.last_message?.time && !!b?.last_message?.time) {
        //     return a?.last_message?.time < b?.last_message?.time ? 1 : -1;
        //   }
        //   if (!!a?.last_message?.time && !b?.last_message?.time) return -1;
        //   if (!a?.last_message?.time && !!b?.last_message?.time) return 1;
        //   if (!a?.last_message?.time && !b?.last_message?.time) return 0;
        // })
        ?.map((i) => {
          if (i?.last_message) {
            i.last_message.time = getDateCustomFormat(new Date(Date.parse(i.last_message.time)));
          }
          return i;
        }),
    });
    if (newProps.chats?.find((chat) => chat.id === +last(document.location.href.split('/')))) {
      this.children.plug.hide();
      this.children.chat.show();
    } else {
      this.children.plug.show();
      this.children.chat.hide();
    }
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatList: this.children.chatList,
      chat: this.children.chat,
      plug: this.children.plug,
    });
  }

  initComponent() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if (!this.chatCards?.find(((item) => item.id === +getElementId(event.target as HTMLElement)!))) return;
          this.chatCards.forEach((item) => {
            item.id === +getElementId(event.target as HTMLElement)!
              ? item.status = 'active'
              : item.status = 'passive';
          });

          this.children.plug.hide();
          this.children.chat.show();

          const currentId = this.chatCards.find((item) => item.status === 'active')?.id;
          router.go(`/messenger/${currentId}`);

          this.children.chat.setProps({
            name: this.chatCards?.find(((item) => item.id === currentId))!.title,
          });
          this.children.chatList.setProps({ chatCards: this.chatCards });

          chatsService.getChatToken(+last(document.location.pathname.split('/'))).then((token) => {
            const socket = new WebSocket(
              `wss://ya-praktikum.tech/ws/chats/${store.getState().user!.id}/${chatId}/${token.token}`,
            );

            socket.addEventListener('open', () => {
              console.log('Соединение установлено');

              socket.send(JSON.stringify({
                content: 'Моё первое сообщение миру!',
                type: 'message',
              }));
            });

            socket.addEventListener('close', (event) => {
              if (event.wasClean) {
                console.log('Соединение закрыто чисто');
              } else {
                console.log('Обрыв соединения');
              }

              console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            socket.addEventListener('message', (event) => {
              console.log('Получены данные', event.data);
            });

            socket.addEventListener('error', (event) => {
              console.log('Ошибка', (event as ErrorEvent).message);
            });
          });

          chatsService.getChatUsers(+last(document.location.pathname.split('/')))
            ?.then((users) => {
              const userNames = users.reduce(
                (acc, cur) => `${acc + (cur.display_name || `${cur.first_name} ${cur.second_name}`)}, `,
                '',
              ).slice(0, -2);

              this.children.chat.setProps({
                users: userNames,
              });
            });
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

  loadUserData(data: IChat[]): void {
    if (!data) return;
    const userData = getUsersData();
    const user = userData.find((item) => item.id === last(document.location.href.split('/')));

    this.dialogues = user?.chat as IDialog[];
    this.chatCards = data;

    this.initActiveChat();

    this.children.chatList.setProps({ chatCards: this.chatCards });
    if (data.length) {
      this.children.chat.setProps({
        disabled: false,
        name: data?.find((item) => item.id === +last(document.location.href.split('/')))?.title,
        dialogues: this.dialogues,
      });
    }
  }

  initActiveChat(): void {
    this.chatCards.forEach((item) => {
      item.id === +last(document.location.href.split('/'))
        ? item.status = 'active'
        : item.status = 'passive';
    });
  }
}

export const ChatPageWrap = connect((state) => ({
  chats: state?.chats,
}))(ChatPage as typeof Block);
