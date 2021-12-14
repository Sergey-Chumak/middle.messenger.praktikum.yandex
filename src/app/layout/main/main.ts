import { tmpl } from './main.tmpl';
import Block from '../../services/block';
import { Sidebar } from '../../components/sidebar';
import { IChildrenMain, IPropsMain } from './main.types';
import { getUserProfile } from '../../services/users-data';

export class Main extends Block<IPropsMain, IChildrenMain> {
  constructor(props: IPropsMain) {
    super('div', props);
  }

  componentDidMount() {
    this.initSidebar();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      page: this.children.page,
      sidebar: this.children.sidebar,
      isMenu: this.props.isMenu,
    });
  }

  initSidebar(): void {
    if (document.location.pathname.includes('/chat-page')
        || document.location.pathname === '/profile') {
      this.children.sidebar = new Sidebar({
        userName: '',
        userPhone: '',
      });

      this.setProps({
        isMenu: true,
        events: {
          click: (event: Event) => {
            if ((event.target as HTMLElement).id !== 'icon-menu') return;
            this.children.sidebar?.getContent().classList.add('sidebar_open');
          },
        },
      });

      this.children.sidebar?.setProps({
        events: {
          click: (event: Event) => {
            if ((event.target as HTMLElement).id !== 'sidebar-backdrop') return;
            this.children.sidebar?.getContent().classList.remove('sidebar_open');
          },
        },
      });

      this.loadUserData();
    } else {
      this.setProps({
        isMenu: false,
      });
    }
  }

  loadUserData() {
    setTimeout(() => {
      const { name, phone } = getUserProfile();

      this.children.sidebar.setProps({
        userName: name,
        userPhone: phone,
      });
    }, 700);
  }
}
