import { addUsersModalTmpl } from './add-users-modal.tmpl';
import View from '../../../../../services/view/view';
import { IChildrenAddUsersModal } from './add-users-modal.types';
import { usersService } from '../../../../../services/users/users.service';
import { FoundUsers } from './found-users';
import { CModal } from '../../../../../components/c-modal';
import { IUserData } from '../../../../../services/auth/auth.types';
import { chatsService } from '../../../../../services/chats/chats.service';
import last from '../../../../../utils/last';
import store from '../../../../../store/store';

export class AddUsersModal extends View<{ }, IChildrenAddUsersModal> {
  addedUser: string;
  foundUsers: IUserData[];

  constructor(props: { }) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.initChildren();
    this.initEvents();
  }

  render() {
    return this.compile(addUsersModalTmpl);
  }

  initChildren(): void {
    this.children.foundUserList = new FoundUsers({ foundUsers: [] });
    this.children.confirmModal = new CModal({
      confirm: 'Add',
      buttonId: 'add-user-to-chat',
      message: 'Add user',
      cancel: 'Cancel',
    });
  }

  initEvents(): void {
    this.setProps({
      events: {
        click: this.addUser.bind(this),
        input: this.searchUsers.bind(this),
        keydown: (event: KeyboardEvent) => {
          if (event.code === 'Escape') {
            this.close();
          }
        },
      },
    });
  }

  addUser(event: MouseEvent): void {
    if ((event.target as HTMLElement).id === 'chat-add-user-icon') {
      this.addedUser = ((event.target as HTMLElement).parentElement as HTMLElement).id;
      const currentUser = this.foundUsers?.find((i) => +i.id === +this.addedUser);
      const currentUserName = `${currentUser?.first_name} ${currentUser?.second_name}`;

      this.children.confirmModal.setProps({ target: currentUserName });
      this.children.confirmModal.open();
    }
    if ((event.target as HTMLInputElement).id === 'add-users-modal-close') {
      this.close();
    }
    if ((event.target as HTMLInputElement).id === 'add-user-to-chat') {
      chatsService.addUser(+last(document.location.pathname.split('/')), this.addedUser)
        .then(() => {
          const chatUserIds = store.getState().chatUsers?.map((i) => i.id);
          chatUserIds?.push(+this.addedUser);

          this.children.foundUserList.setProps({
            foundUsers: this.foundUsers.filter((user) => !chatUserIds?.includes(user.id)),
          });
        });
      this.children.confirmModal.close();
    }
  }

  searchUsers(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.id === 'search-users-input') {
      if (target.value) {
        usersService.searchUsers(target.value)
          .then((data) => {
            this.foundUsers = data;

            const chatUserIds = store.getState().chatUsers?.map((i) => i.id);
            this.children.foundUserList.setProps({
              foundUsers: data.filter((user) => !chatUserIds?.includes(user.id)),
            });
          });
      } else {
        this.children.foundUserList.setProps({
          foundUsers: [],
        });
      }
    }
  }

  open(): void {
    this.show();
    this.getContent().focus();
    document.getElementById('search-users-input')?.focus();
  }

  close(): void {
    this.hide();
    (document.getElementById('search-users-input') as HTMLInputElement).value = '';
    this.children.foundUserList.setProps({
      foundUsers: [],
    });
  }
}
