import { tmpl } from './main.tmpl';
import Block from '../../services/block';
import { Sidebar } from '../../components/sidebar';
import { IChildrenMain, IPropsMain } from './main.types';
import { getElementId } from '../../utils/get-element-id';
import { router } from '../../routing/routing';
import connect from '../../utils/hoc/connect';
import { authService } from '../../services/auth/auth.service';

class Main extends Block<IPropsMain, IChildrenMain> {
  constructor(props: IPropsMain) {
    super('div', props);

    this.children.sidebar = new Sidebar({
      userName: '',
      userPhone: '',
      userAvatar: undefined,
    });

    authService.getUserData();
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
    });
  }

  initSidebar(): void {
    this.initSidebarEvents();

    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'icon-menu') return;
          this.children.sidebar?.getContent().classList.add('sidebar_open');
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
              .then(() => router.go('/signin'))
              .catch((e) => console.log(e));
          }
          if ((event.target as HTMLElement).id === 'sidebar-icon-menu') {
            this.getContent().classList.add('sidebar_open');
          }
          if ((event.target as HTMLElement).id === 'sidebar-backdrop') {
            this.getContent().classList.remove('sidebar_open');
          }
        },
      },
    });
  }
}

export const main = connect<IPropsMain, IChildrenMain>((state) => ({
  name: state?.user?.display_name || state?.user?.first_name,
  avatar: state?.user?.avatar,
  phone: state?.user?.phone,
}))(Main as typeof Block);
