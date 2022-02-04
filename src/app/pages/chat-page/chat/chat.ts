import { chatTmpl } from './chat.tmpl';
import View from '../../../services/view/view';
import { Dialogues, IDialog, IMessage } from './dialogues';
import { IChatChildren, IChatProps } from './chat.types';
import connect from '../../../utils/hoc/connect';
import { webSocketApi } from '../../../services/web-socket/web-socket';
import store from '../../../store/store';
import { getDateCustomFormat, getTimeCustomFormat } from '../../../utils/date';
import isEqual from '../../../utils/isEqual';

class Chat extends View<IChatProps, IChatChildren> {
  dialogues: IDialog[] = this.props.dialogues || [];
  newUserName: string = '';
  message: string;

  constructor(props: IChatProps) {
    super('div', { ...props, disabled: true });
  }

  componentDidMount() {
    this.children.dialogues = new Dialogues({ dialogues: this.dialogues });
    this.initEvents();
  }

  componentDidUpdate(oldProps: IChatProps, newProps: IChatProps): boolean {
    this.changeDataFormat(newProps.currentMessages);

    if (isEqual(oldProps, newProps)) return false;
    if (this.message) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(chatTmpl);
  }

  initEvents(): void {
    this.setProps({
      events: {
        input: (event: Event) => {
          if ((event.target as HTMLInputElement).id === 'new-user-name-c-input') {
            this.newUserName = (event.target as HTMLInputElement).value;
          }
          if ((event.target as HTMLInputElement).id === 'message') {
            this.message = (event.target as HTMLInputElement).value;
          }
        },
        keydown: (event: KeyboardEvent) => {
          if ((event.target as HTMLElement).id === 'message') {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter')) {
              webSocketApi.sendMessage(this.message);
              this.message = '';
            }
          }
        },
        click: (event: Event) => {
          const ctxMenu = document.getElementById('chat-context-menu')!;

          if ((event.target as HTMLElement).id === 'send-message-btn') {
            webSocketApi.sendMessage(this.message);
            this.message = '';
          }

          if ((event.target as HTMLElement).id !== 'context-menu-icon') {
            ctxMenu.classList.remove('chat__context-menu_open');
            return;
          }
          if (ctxMenu.classList.contains('chat__context-menu_open')) {
            ctxMenu.classList.remove('chat__context-menu_open');
          } else {
            ctxMenu.classList.add('chat__context-menu_open');
          }
        },
      },
    });
  }

  changeDataFormat(messages: IMessage[] | undefined): void {
    const dialogues: IDialog[] = [];

    messages?.forEach((message) => {
      const user = store.getState()?.chatUsers?.find((user) => user.id === message.user_id);
      message.from = store.getState()?.user?.id === message.user_id ? 'me' : undefined;
      message.name = user?.first_name!;
      message.userAvatar = user?.avatar;
      message.timeCustomFormat = getTimeCustomFormat(message.time);
      message.initials = `${user?.first_name[0]!}${user?.second_name[0]!}`;

      if (dialogues.find((i) => i.date === getDateCustomFormat(message.time))) {
        dialogues.find((i) => i.date === getDateCustomFormat(message.time))?.messages.push(message);
      } else {
        dialogues.push({
          date: getDateCustomFormat(message.time),
          messages: [],
        });
        dialogues.find((i) => i.date === getDateCustomFormat(message.time))?.messages.push(message);
      }
    });

    this.children.dialogues?.setProps({
      dialogues,
    });
  }
}

export const ChatWrap = connect((state) => ({
  name: state.currentChat,
  users: state.chatUserNames,
  currentMessages: state.currentMessages,
  initials: state.chats?.find((i) => i.status === 'active')?.initials,
  avatar: state.chats?.find((i) => i.status === 'active')?.avatar,
}))(Chat as unknown as typeof View);
