import { tmpl } from './profile.tmpl';
import View from '../../services/view/view';
import { IChildrenProfile, IPropsProfile } from './profile.types';
import store from '../../store/store';
import { IUserData } from '../../services/auth/auth.types';
import { usersService } from '../../services/users/users.service';
import connect from '../../utils/hoc/connect';
import { authService } from '../../services/auth/auth.service';
import isEqual from '../../utils/isEqual';
import { CAvatarModal } from '../../components/c-avatar-modal';
import { router } from '../../services/router/router';
import { ChangeDataModal } from './change-data-modal';
import { ChangePasswordModal } from './change-password-modal';
import { chatsService } from '../../services/chats/chats.service';
import { loader } from '../../components/c-loader';

export class Profile extends View<IPropsProfile, IChildrenProfile> {
  avatar: File | null;
  userData: IUserData = store.getState().user!;

  constructor(props: IPropsProfile) {
    super('div', props);
  }

  componentDidMount() {
    this.setProps({
      userData: this.userData,
    });
    this.initChildren();
    this.initComponentEvents();
    this.initChildrenEvents();
  }

  componentDidUpdate(oldProps: IPropsProfile, newProps: IPropsProfile): boolean {
    if (newProps?.userData) {
      this.children.changeDataModal?.setProps({ userData: newProps.userData });
    }

    if (isEqual(oldProps, newProps)) return false;
    if (!this.props.userData) return true;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl);
  }

  initComponentEvents() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'link-change-data') {
            this.children.changeDataModal.open();
          }

          if ((event.target as HTMLElement).id === 'change-data-modal-close') {
            this.children.changeDataModal.close();
          }

          if ((event.target as HTMLElement).id === 'link-change-pass') {
            this.children.changePasswordModal.open();
          }

          if ((event.target as HTMLElement).id === 'change-password-modal-close') {
            this.children.changePasswordModal.close();
          }

          if ((event.target as HTMLElement).id === 'profile-avatar') {
            this.children.changeAvatarModal.open();
          }

          if ((event.target as HTMLElement).id === 'profile-logout') {
            authService.logout().then(() => {
              router.go('/signin');
            });
          }

          if ((event.target as HTMLElement).id === 'back-to-chats-icon') {
            router.go('/messenger');

            loader.show();
            chatsService.getChats()
              .then(() => {
                loader.hide();
              });
          }
        },
      },
    });
  }

  initChildren() {
    this.children.changeAvatarModal = new CAvatarModal({
      inputId: 'change-user-avatar-modal-input',
      confirmBtnId: 'change-user-avatar-modal-confirm',
    });

    this.children.changeDataModal = new ChangeDataModal({
      userData: this.userData,
    });

    this.children.changePasswordModal = new ChangePasswordModal({
      userData: this.userData,
    });
  }

  initChildrenEvents(): void {
    this.children.changeAvatarModal.setProps({
      events: {
        change: (event:Event) => {
          if ((event.target as HTMLInputElement).id === 'change-user-avatar-modal-input') {
            this.avatar = ((event.target as HTMLInputElement)?.files!)[0] as File;
          }
        },
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'change-user-avatar-modal-confirm') {
            if (!this.avatar) return;
            usersService.changeUserAvatar(this.avatar).then(() => {
              this.avatar = null;
              this.children.changeAvatarModal.close();
              this.setProps({
                avatar: this.props.userData?.avatar,
              });
            });
          }
        },
      },
    });
  }
}

export const ProfileWrap = connect<IPropsProfile, IChildrenProfile>((state) => ({
  userData: state?.user,
}))(Profile as typeof View);
