import { tmpl } from './main.tmpl';
import Block from '../../services/block';
import { Sidebar } from '../../components/sidebar';
import { IChildrenMain, IPropsMain } from './main.types';
import { getElementId } from '../../utils/get-element-id';
import { router } from '../../routing/routing';
import connect from '../../utils/hoc/connect';
import { authService } from '../../services/auth/auth.service';
import { Modal } from '../../components/ui/modal';
import trim from '../../utils/trim';
import { chatsService } from '../../services/chats/chats.service';

class Main extends Block<IPropsMain, IChildrenMain> {
  chatName: string;

  constructor(props: IPropsMain) {
    super('div', props);

    this.children.sidebar = new Sidebar({
      userName: '',
      userPhone: '',
      userAvatar: undefined,
    });

    this.children.modal = new Modal({
      cancel: 'Cancel',
      message: '',
      confirm: 'Create',
      header: 'Create a new chat?',
      buttonId: 'create-chat-btn',
      isInput: true,
      inputId: 'new-chat-input',
    });

    chatsService.getChats();
  }

  componentDidMount() {
    this.initSidebar();
  }

  // @ts-ignore
  componentDidUpdate(oldProps, newProps): boolean {
    this.children.sidebar.setProps({
      userName: this.props.name,
      userPhone: this.props.phone,
      userAvatar: this.props.avatar,
    });

    this.children.modal.setProps({
      events: {
        input: (event:Event) => {
          const target = event.target as HTMLInputElement;
          if (target.id === 'new-chat-input') {
            if (!target.value) return;
            this.chatName = trim(target.value);
          }
        },
      },
    });

    if (oldProps.events !== newProps.events) return true;
    return false;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      sidebar: this.children.sidebar,
      isMenu: this.props.isMenu,
      phone: this.props.phone,
      avatar: this.props.avatar,
      name: this.props.name,
      modal: this.children.modal,
    });
  }

  initSidebar(): void {
    this.initSidebarEvents();

    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'create-chat-btn') {
            chatsService.createChat({ title: this.chatName })
              .then((id) => {
                this.children.modal.close();
                chatsService.getChats().then(() => {
                });
                router.go(`/messenger/${id}`);
              });
          }
        },
      },
    });
  }

  initSidebarEvents() {
    this.children.sidebar.setProps({
      events: {
        click: (event: Event) => {
          if (getElementId(event.target as HTMLElement) === 'profile-sidebar') {
            this.getContent().classList.remove('sidebar_open');
            router.go('/profile');
          }
          if (getElementId(event.target as HTMLElement) === 'chat-list-sidebar') {
            this.getContent().classList.remove('sidebar_open');
            router.go('/messenger');
          }
          if (getElementId(event.target as HTMLElement) === 'logout-sidebar') {
            this.getContent().classList.remove('sidebar_open');
            authService.logout()
              .then(() => router.go('/signin'));
          }
          if ((event.target as HTMLElement).id === 'sidebar-icon-menu') {
            this.getContent().classList.add('sidebar_open');
          }
          if ((event.target as HTMLElement).id === 'sidebar-backdrop') {
            this.getContent().classList.remove('sidebar_open');
          }
          if (getElementId((event.target as HTMLElement)) === 'new-chat-sidebar') {
            this.children.modal.open();
            this.getContent().classList.remove('sidebar_open');
          }
        },
      },
    });
  }
}

export const MainWrap = connect<IPropsMain, IChildrenMain>((state) => ({
  name: state?.user?.display_name || state?.user?.first_name as string,
  avatar: state?.user?.avatar as string,
  phone: state?.user?.phone as string,
}))(Main as typeof Block);
