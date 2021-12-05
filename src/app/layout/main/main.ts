import { tmpl } from './main.tmpl';
import Block from '../../services/block';
import { Auth } from '../../pages/auth';
import { Registration } from '../../pages/registration';
import { ClientError } from '../../pages/client-error';
import { ServerError } from '../../pages/server-error';
import { Profile } from '../../pages/profile';
import { ChatPage } from '../../pages/chat-page';
import { Sidebar } from '../../components/sidebar';
import { IChildrenMain, IPropsMain } from './main.types';
import { getUserProfile } from '../../services/users-data';

export class Main extends Block<IPropsMain, IChildrenMain> {
  constructor(props: IPropsMain) {
    super('div', props);
    this.children.page = this.initPage();
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

  initPage() {
    const isAuth = document.location.href === `${document.location.origin}/auth`
        || document.location.href === `${document.location.origin}/`;

    if (isAuth) return new Auth({});
    if (document.location.href === `${document.location.origin}/registration`) return new Registration({});
    if (document.location.href === `${document.location.origin}/server-error`) return new ServerError({});
    if (document.location.href === `${document.location.origin}/profile`) return new Profile({});
    if (document.location.href.includes(`${document.location.origin}/chat-page`)) return new ChatPage({});
    return new ClientError({});
  }

  initSidebar(): void {
    if (document.location.href.includes(`${document.location.origin}/chat-page`)
        || document.location.href === `${document.location.origin}/profile`) {
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
