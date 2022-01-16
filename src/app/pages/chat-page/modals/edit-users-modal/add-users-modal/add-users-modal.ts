import { tmpl } from './add-users-modal.tmpl';
import Block from '../../../../../services/block';
import { IChildrenAddUsersModal } from './add-users-modal.types';
import { profileService } from '../../../../../services/profile/profile.service';
import { FoundUsers } from './found-users';
import { Modal } from '../../../../../components/ui/modal';
import { IUserData } from '../../../../../services/auth/auth.types';
import { chatsService } from '../../../../../services/chats/chats.service';
import last from '../../../../../utils/last';
import store from '../../../../../store/store';

export class AddUsersModal extends Block<{ }, IChildrenAddUsersModal> {
  addedUser: string;
  foundUsers: IUserData[];

  constructor(props: { }) {
    super('div', props);
    this.hide();

    this.children.foundUserList = new FoundUsers({ foundUsers: [] });
    this.children.confirmModal = new Modal({
      confirm: 'Add',
      buttonId: 'add-user-to-chat',
      message: 'Add user',
      cancel: 'Cancel',
    });
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event: Event) => {
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
        },
        keydown: (event: KeyboardEvent) => {
          if (event.code === 'Escape') {
            this.close();
          }
        },
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.id === 'search-users-input') {
            if (target.value) {
              profileService.searchUsers(target.value)
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
        },
      },
    });
  }

  render() {
    return this.compile(tmpl, {
      foundUserList: this.children.foundUserList,
      confirmModal: this.children.confirmModal,
    });
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
