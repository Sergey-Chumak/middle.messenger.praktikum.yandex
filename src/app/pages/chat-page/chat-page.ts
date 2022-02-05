// @ts-ignore
import { v4 as makeUUID } from 'uuid';
import { chatPageTmpl } from './chat-page.tmpl';
import View from '../../services/view/view';
import { ChatList } from './chat-list';
import { Chat } from './chat';
import last from '../../utils/last';
import { PlugDialog } from './plug-dialog';
import { IChatPageChildren, IChatPageProps } from './chat-page.types';
import { chatsService } from '../../services/chats/chats.service';
import connect from '../../utils/hoc/connect';
import { loader } from '../../components/c-loader';
import { NewChatModal } from './modals/new-chat-modal';
import { EditUsersModal } from './modals/edit-users-modal';
import { CAvatarModal } from '../../components/c-avatar-modal';
import { CModal } from '../../components/c-modal';
import store from '../../store/store';
import { webSocketApi } from '../../services/web-socket/web-socket';
import { snackbar } from '../../components/c-snackbar';
import { ucFirstLetter } from '../../utils/ucFirstLetter';
import { router } from '../../services/router/router';
import { usersService } from '../../services/users/users.service';
import { UserInfoModal } from './modals/user-info-modal';
import { getElementId } from '../../utils/getElementId';

class ChatPage extends View<IChatPageProps, IChatPageChildren> {
  newChatName = '';
  scrollChats: number;
  chatAvatar: File | undefined;

  constructor(props: IChatPageProps) {
    super('div', props);
    loader.show();
  }

  componentDidMount() {
    this.initChildren();
    this.children.chat.hide();

    this.initEvents();

    window.addEventListener('resize', (event) => {
      this.initAdaptive(event.target as Window);
    }, false);

    chatsService.getChats().then(() => {
      this.initAdaptive(window);
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

    this.initAdaptive(window);

    if (oldProps.chats !== newProps.chats) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(chatPageTmpl);
  }

  initChildren(): void {
    this.children.chat = new Chat({
      name: '',
      value: '',
      disabled: true,
    });

    this.children.newChatModal = new NewChatModal({ });
    this.children.editUserModal = new EditUsersModal({ });
    this.children.changeAvatarModal = new CAvatarModal({
      inputId: 'change-chat-avatar-modal-input',
      confirmBtnId: 'change-chat-avatar-modal-confirm',
    });

    this.children.modal = new CModal({
      cancel: 'Cancel',
      confirm: '',
      buttonId: '',
      message: '',
    });

    this.children.userInfoModal = new UserInfoModal({});

    this.children.plug = new PlugDialog({});
    this.children.plug.hide();
    this.children.chatList = new ChatList({ chatCards: [] });
  }

  initEvents(): void {
    this.setProps({
      events: {
        change: (event: Event) => {
          if ((event.target as HTMLElement).id === 'change-chat-avatar-modal-input') {
            this.chatAvatar = (event.target as HTMLInputElement).files![0] as File;
          }
        },
        input: (event: Event) => {
          if ((event.target as HTMLElement).id === 'create-chat-modal-input') {
            this.newChatName = (event.target as HTMLInputElement).value.trim();
          }
        },
        keydown: (event: KeyboardEvent) => {
          if ((event.target as HTMLElement).id === 'create-chat-modal-input') {
            if ((event.code === 'Escape')) {
              this.children.newChatModal.close();
            }
          }

          if ((event.target as HTMLElement).id === 'create-chat-modal-input') {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter')) {
              this.createChat();
            }
          }
        },
        click: (event: Event) => {
          const eventTarget = event.target as HTMLElement;

          const messageUsersId = store.getState().currentMessages
            ?.find((i) => i.id === +getElementId(eventTarget)!)?.user_id;

          if (messageUsersId) {
            loader.show();
            usersService.getUser(messageUsersId!).then((data) => {
              loader.hide();
              this.children.userInfoModal.setProps({
                userData: data,
              });
              this.children.userInfoModal.open();
            });
          }

          if ((event.target as HTMLElement).id === 'create-chat-modal-cancel') {
            this.children.newChatModal.close();
          }

          if (eventTarget.id === 'chat-arrow-back') {
            router.go('/messenger');
            this.children.chatList.setProps({
              chats: this.props.chats?.forEach((i) => i.status = 'passive'),
            });
            this.initAdaptive(window);
          }

          if (eventTarget.id === 'chat-edit-users') {
            this.children.editUserModal.open();
          }

          if (eventTarget.id === 'chat-users') {
            this.children.editUserModal.open();
          }

          if (eventTarget.id === 'edit-users-modal-close') {
            this.children.editUserModal.close();
          }

          if (eventTarget.id === 'new-chat-icon') {
            this.children.newChatModal.open();
          }

          if (eventTarget.id === 'create-chat-modal-confirm') {
            this.createChat();
          }

          if (eventTarget.id === 'option-change-avatar') {
            this.children.changeAvatarModal.open();
          }

          if (eventTarget.id === 'change-chat-avatar-modal-confirm') {
            if (this.chatAvatar) {
              chatsService.changeChatAvatar(this.chatAvatar, +last(document.location.pathname.split('/')))
                .then(() => {
                  this.children.changeAvatarModal.close();
                  this.chatAvatar = undefined;
                });
            }
          }

          if (eventTarget.id === 'option-delete-chat') {
            this.children.modal.setProps({
              message: 'Are you sure you want to delete the chat',
              target: store.getState().currentChat,
              confirm: 'Delete',
              cancel: 'Cancel',
              buttonId: 'delete-chat-button',
            });

            this.children.modal.open();
          }

          if (eventTarget.id === 'delete-chat-button') {
            chatsService.deleteChat(+last(document.location.pathname.split('/')))
              .then(() => this.children.modal.close());
          }

          if (eventTarget.id === 'option-leave-chat') {
            this.children.modal.setProps({
              message: 'Do you really want to leave the chat',
              target: undefined,
              confirm: 'Leave',
              cancel: 'Cancel',
              buttonId: 'leave-chat-button',
            });

            this.children.modal.open();
          }

          if (eventTarget.id === 'leave-chat-button') {
            chatsService.deleteUser(+last(document.location.pathname.split('/')), store.getState().user?.id!)
              .then(() => {
                this.children.modal.close();
                router.go('/messenger');
                chatsService.getChats();
              });
          }
        },
      },
    });
  }

  initAdaptive(window: Window): void {
    if (window.innerWidth > 820) {
      this.getContent().firstElementChild?.classList.remove('chat-list-hide');
      document.getElementById('chat-page-content')?.classList.remove('chat-page__content_hide');
      document.getElementById('chat-page')?.classList.remove('chat-list-hide');
      return;
    }

    if (document.location.pathname === '/messenger' || document.location.pathname === '/messenger/') {
      document.getElementById('chat-page')?.classList.remove('chat-list-hide');
      document.getElementById('chat-page-content')?.classList.add('chat-page__content_hide');
    } else {
      document.getElementById('chat-page-content')?.classList.remove('chat-page__content_hide');
      document.getElementById('chat-page')?.classList.add('chat-list-hide');
    }
  }

  createChat(): void {
    if (this.newChatName !== '') {
      chatsService.createChat(this.newChatName)
        .catch((e) => snackbar.open(ucFirstLetter(e.reason || e.error)));
      this.children.newChatModal.close();
    }
  }

  hide() {
    webSocketApi.close();
    super.hide();
  }
}

export const ChatPageWrap = connect((state) => ({
  chats: state?.chats,
}))(ChatPage as typeof View);
