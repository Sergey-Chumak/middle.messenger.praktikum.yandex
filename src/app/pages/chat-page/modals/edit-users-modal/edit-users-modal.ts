import View from '../../../../services/view/view';
import { editUsersModalTmpl } from './edit-users-modal.tmpl';
import { IChildrenEditUsersModal, IPropsEditUsersModal } from './edit-users-modal.types';
import connect from '../../../../utils/hoc/connect';
import isEqual from '../../../../utils/isEqual';
import { CModal } from '../../../../components/c-modal';
import store from '../../../../store/store';
import { chatsService } from '../../../../services/chats/chats.service';
import last from '../../../../utils/last';
import { AddUsersModal } from './add-users-modal';
import { router } from '../../../../services/router/router';

class EditUsersModal extends View<IPropsEditUsersModal, IChildrenEditUsersModal> {
  deletedUser: string;

  constructor(props: IPropsEditUsersModal) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.initChildren();
    this.initEvents();
  }

  componentDidUpdate(oldProps: IPropsEditUsersModal, newProps: IPropsEditUsersModal): boolean {
    if (isEqual(oldProps, newProps)) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(editUsersModalTmpl);
  }

  initChildren(): void {
    this.children.addUsersModal = new AddUsersModal({});
    this.children.confirmModal = new CModal({
      confirm: '',
      buttonId: '',
      cancel: 'Cancel',
      message: '',
    });
  }

  initEvents(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'add-users-icon') {
            this.children.addUsersModal.open();
          }
          if ((event.target as HTMLElement).id === 'chat-remove-user') {
            this.openConfirmModal(event.target as HTMLElement);
          }
          if ((event.target as HTMLElement).id === 'delete-user-from-chat') {
            this.deleteUser();
          }
        },
      },
    });
  }

  openConfirmModal(user: HTMLElement): void {
    this.children.confirmModal.show();
    this.deletedUser = user.parentElement!.id;

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

  deleteUser(): void {
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
          router.go('/messenger');
          chatsService.getChats();
        }
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
}))(EditUsersModal as typeof View);
