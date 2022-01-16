import Block from '../../../../services/block';
import { tmpl } from './edit-users-modal.tmpl';
import { IChildrenEditUsersModal, IPropsEditUsersModal } from './edit-users-modal.types';
import connect from '../../../../utils/hoc/connect';
import isEqual from '../../../../utils/isEqual';
import { Modal } from '../../../../components/ui/modal';
import store from '../../../../store/store';
import { chatsService } from '../../../../services/chats/chats.service';
import last from '../../../../utils/last';
import { AddUsersModal } from './add-users-modal';

class EditUsersModal extends Block<IPropsEditUsersModal, IChildrenEditUsersModal> {
  deletedUser: string;

  constructor(props: IPropsEditUsersModal) {
    super('div', props);
    this.hide();

    this.children.addUsersModal = new AddUsersModal({});
    this.children.confirmModal = new Modal({
      confirm: '',
      buttonId: '',
      cancel: 'Cancel',
      message: '',
    });
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'add-users-icon') {
            this.children.addUsersModal.open();
          }
          if ((event.target as HTMLElement).id === 'chat-remove-user') {
            this.children.confirmModal.show();
            this.deletedUser = ((event.target as HTMLElement).parentElement as HTMLElement).id;

            const currentUser = store.getState().chatUsers?.find((i) => i.id === +this.deletedUser);
            const currentUserName = `${currentUser?.first_name} ${currentUser?.second_name}`;

            if (+this.deletedUser !== store.getState().user?.id!) {
              this.children.confirmModal.setProps({
                target: currentUserName,
                confirm: 'Delete',
                buttonId: 'delete-user-from-chat',
                message: 'Are you sure you want to delete the user',
              });
            } else {
              this.children.confirmModal.setProps({
                confirm: 'Leave',
                buttonId: 'delete-user-from-chat',
                message: 'Do you really want to leave the chat',
                target: '',
              });
            }
          }
          if ((event.target as HTMLElement).id === 'delete-user-from-chat') {
            chatsService.deleteUser(
              +last(document.location.pathname.split('/')),
              this.deletedUser,
            )
              .then(() => {
                if (+this.deletedUser !== store.getState().user?.id!) {
                  this.children.confirmModal.close();
                } else {
                  this.children.confirmModal.close();
                  this.close();
                  chatsService.getChats();
                }
              });
          }
        },
      },
    });
  }

  componentDidUpdate(oldProps: IPropsEditUsersModal, newProps: IPropsEditUsersModal): boolean {
    if (isEqual(oldProps, newProps)) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatUsers: this.props.chatUsers,
      confirmModal: this.children.confirmModal,
      addUsersModal: this.children.addUsersModal,
    });
  }

  open(): void {
    this.show();
  }

  close(): void {
    this.hide();
  }
}

export const EditUsersModalWrap = connect((state) => ({
  chatUsers: state?.chatUsers,
}))(EditUsersModal as typeof Block);
