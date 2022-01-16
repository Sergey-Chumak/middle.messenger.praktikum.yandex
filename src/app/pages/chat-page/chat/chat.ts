import { tmpl } from './chat.tmpl';
import Block from '../../../services/block';
import { Dialogues, IDialog } from './dialogues';
import { IChatChildren, IChatProps } from './chat.types';
import connect from '../../../utils/hoc/connect';
import { webSocketApi } from '../../../services/web-socket/web-socket';
import store from '../../../store/store';
import { getTimeCustomFormat } from '../../../utils/date';
import isEqual from '../../../utils/isEqual';

class Chat extends Block<IChatProps, IChatChildren> {
  dialogues: IDialog[] = this.props.dialogues || [];
  chatAvatar: File | undefined;
  newUserName: string = '';
  socket: WebSocket;
  message: string;

  constructor(props: IChatProps) {
    super('div', { ...props, disabled: true });
    this.children.dialogues = new Dialogues({ dialogues: this.dialogues });
  }

  componentDidMount() {
    this.setProps({
      disabled: true,
      events: {
        input: (event: Event) => {
          if ((event.target as HTMLInputElement).id === 'new-user-name-input') {
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

  componentDidUpdate(oldProps: IChatProps, newProps: IChatProps): boolean {
    this.children.dialogues?.setProps({

      dialogues: [
        {
          messages: newProps?.currentMessages?.map((m) => {
            const user = store.getState()?.chatUsers?.find((user) => user.id === m.user_id);
            m.from = store.getState()?.user?.id !== m.user_id ? 'me' : undefined;
            m.name = user?.display_name || user?.first_name!;
            m.userAvatar = user?.avatar;
            m.timeCustomFormat = getTimeCustomFormat(m.time);
            return m;
          }) || [],
          date: 'June 18',
        },
      ],
    });

    if (isEqual(oldProps, newProps)) return false;
    if (this.message) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      dialogues: this.props.dialogues,
      name: this.props.name,
      value: this.props.value,
      users: this.props.users,
      chatUsers: this.props.chatUsers,
      currentMessages: this.props.currentMessages,
    });
  }
}

export const ChatWrap = connect((state) => ({
  name: state.currentChat,
  users: state.chatUserNames,
  currentMessages: state.currentMessages,
}))(Chat as unknown as typeof Block);
