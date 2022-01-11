import { tmpl } from './chat.tmpl';
import Block from '../../services/block';
import { Dialogues, IDialog } from './dialogues';
import { IChatChildren, IChatProps } from './chat.types';
import { Modal } from '../ui/modal';
import { chatsService } from '../../services/chats/chats.service';
import last from '../../utils/last';
import { getTimeCustomFormat } from '../../utils/date';
import store from '../../store/store';
import isEqual from '../../utils/isEqual';

export class Chat extends Block<IChatProps, IChatChildren> {
  dialogues: IDialog[] = this.props.dialogues || [];
  chatAvatar: File | undefined;
  newUserName: string = '';

  constructor(props: IChatProps) {
    super('div', { ...props, disabled: true });
    this.children.dialogues = new Dialogues({ dialogues: this.dialogues });
    this.children.modal = new Modal({
      isInput: false,
      confirm: 'Confirm',
      message: '',
      buttonId: 'chat-confirm-modal',
      cancel: 'Cancel',
      header: '',
      inputId: '',
    });
  }

  componentDidMount() {
    this.setProps({
      disabled: true,
      events: {
        change: (event: Event) => {
          if ((event.target as HTMLElement).id === 'file-download') {
            this.chatAvatar = (event.target as HTMLInputElement).files![0] as File;
          }
        },
        input: (event: Event) => {
          if ((event.target as HTMLInputElement).id === 'new-user-name-input') {
            this.newUserName = (event.target as HTMLInputElement).value;
          }
        },
        click: (event: Event) => {
          const ctxMenu = document.getElementById('chat-context-menu')!;

          if ((event.target as HTMLElement).id === 'option-add-user') {
            this.children.modal.setProps({
              isInput: true,
              message: '',
              confirm: 'Add',
              cancel: 'Cancel',
              header: 'Add user in chat?',
              buttonId: 'add-user-button',
              avatar: false,
              inputId: 'new-user-name-input',
            });

            this.children.modal.open();
          }

          if ((event.target as HTMLElement).id === 'add-user-button') {
            chatsService.addUser(+last(document.location.pathname.split('/')), this.newUserName)
              .then(() => {
                console.log('ok');
              })
              .catch((e) => {
                console.log(e);
              });
          }

          if ((event.target as HTMLElement).id === 'option-change-avatar') {
            this.children.modal.setProps({
              isInput: false,
              message: '',
              confirm: 'Confirm',
              cancel: 'Cancel',
              header: 'Change avatar?',
              buttonId: 'change-avatar-button',
              avatar: true,
            });

            this.children.modal.open();
          }

          if ((event.target as HTMLElement).id === 'change-avatar-button') {
            if (this.chatAvatar) {
              chatsService.changeChatAvatar(this.chatAvatar, +last(document.location.pathname.split('/'))).then(() => {
                this.children.modal.close();
                this.chatAvatar = undefined;
              });
            }
          }

          if ((event.target as HTMLElement).id === 'option-delete-chat') {
            this.children.modal.setProps({
              isInput: false,
              message: '',
              confirm: 'Delete',
              cancel: 'Cancel',
              header: 'Delete chat?',
              buttonId: 'delete-chat-button',
              avatar: false,
            });

            this.children.modal.open();
          }

          if ((event.target as HTMLElement).id === 'delete-chat-button') {
            chatsService.deleteChat(+last(document.location.pathname.split('/')))
              .then(() => {
                this.children.modal.close();
              });
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

    chatsService.getChatUsers(+last(document.location.pathname.split('/')))
      .then((users) => {
        const userNames = users.reduce(
          (acc, cur) => `${acc + (cur.display_name || `${cur.first_name} ${cur.second_name}`)}, `,
          '',
        ).slice(0, -2);

        this.setProps({
          users: userNames,
        });
      });
  }

  componentDidUpdate(oldProps: IChatProps, newProps: IChatProps): boolean {
    console.log(newProps.dialogues);
    this.children.dialogues?.setProps({
      dialogues: [
        {
          messages: newProps?.dialogues?.map((m) => {
            const user = store.getState()?.chatUsers?.find((user) => user.id === m.user_id);
            m.from = store.getState()?.user?.id !== m.user_id ? 'me' : null;
            m.name = user?.display_name || user?.first_name;
            m.userAvatar = user?.avatar;
            m.timeCustomFormat = getTimeCustomFormat(m.time);
            return m;
          }) || [],
          date: 'June 18',
        },
      ],
    });
    if (!isEqual(oldProps.dialogues, newProps.dialogues)) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      dialogues: this.props.dialogues,
      disabled: this.props.disabled,
      name: this.props.name,
      value: this.props.value,
      modal: this.children.modal,
      users: this.props.users,
    });
  }
}
