// @ts-ignore
import { v4 as makeUUID } from 'uuid';
import { tmpl } from './chat-page.tmpl';
import Block from '../../services/block/block';
import { ChatList } from './chat-list';
import { Chat } from './chat';
import last from '../../utils/last';
import { PlugDialog } from './plug-dialog';
import { IChatPageChildren, IChatPageProps } from './chat-page.types';
import { chatsService } from '../../services/chats/chats.service';
import connect from '../../utils/hoc/connect';
import { loader } from '../../components/loader';
import { NewChatModal } from './modals/new-chat-modal';
import { EditUsersModal } from './modals/edit-users-modal';
import { ChangeAvatarModal } from '../../components/ui/change-avatar-modal';
import { Modal } from '../../components/ui/modal';
import store from '../../store/store';
import { router } from '../../services/router/router';
import { webSocketApi } from '../../services/web-socket/web-socket';

class ChatPage extends Block<IChatPageProps, IChatPageChildren> {
  newChatName = '';
  scrollChats: number;
  chatAvatar: File | undefined;

  constructor(props: IChatPageProps) {
    super('div', props);
    loader.show();

    this.children.chat = new Chat({
      name: '',
      value: '',
      disabled: true,
    });

    this.children.newChatModal = new NewChatModal({ });
    this.children.editUserModal = new EditUsersModal({ });
    this.children.changeAvatarModal = new ChangeAvatarModal({
      inputId: 'change-chat-avatar-modal-input',
      confirmBtnId: 'change-chat-avatar-modal-confirm',
    });
    this.children.modal = new Modal({
      cancel: 'Cancel',
      confirm: '',
      buttonId: '',
      message: '',
    });

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
    })
      .catch(() => {
        router.go('client-error');
      });

    this.setProps({
      events: {
        change: (event: Event) => {
          if ((event.target as HTMLElement).id === 'change-chat-avatar-modal-input') {
            this.chatAvatar = (event.target as HTMLInputElement).files![0] as File;
          }
        },
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
          const eventTarget = event.target as HTMLElement;

          if (eventTarget.id === 'chat-edit-users') {
            this.children.editUserModal.open();
          }
          if (eventTarget.id === 'edit-users-modal-close') {
            this.children.editUserModal.close();
          }
          if (eventTarget.id === 'new-chat-icon') {
            this.children.newChatModal.open();
          }
          if (eventTarget.id === 'create-chat-modal-confirm') {
            chatsService.createChat(this.newChatName);
            this.children.newChatModal.close();
          }
          if (eventTarget.id === 'option-change-avatar') {
            this.children.changeAvatarModal.open();
          }
          if (eventTarget.id === 'change-chat-avatar-modal-confirm') {
            if (this.chatAvatar) {
              chatsService.changeChatAvatar(this.chatAvatar, +last(document.location.pathname.split('/'))).then(() => {
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
              .then(() => {
                this.children.modal.close();
              });
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
                chatsService.getChats();
              });
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
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatList: this.children.chatList,
      chat: this.children.chat,
      plug: this.children.plug,
      newChatModal: this.children.newChatModal,
      editUserModal: this.children.editUserModal,
      changeAvatarModal: this.children.changeAvatarModal,
      modal: this.children.modal,
    });
  }

  hide() {
    webSocketApi.close();
    super.hide();
  }
}

export const ChatPageWrap = connect((state) => ({
  chats: state?.chats,
}))(ChatPage as typeof Block);
