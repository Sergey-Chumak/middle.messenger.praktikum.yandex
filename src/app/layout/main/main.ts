import { tmpl } from './main.tmpl';
import Block from '../../services/block';
import { TPropsAndChildren } from '../../services/types';
import { Auth } from '../../pages/auth';
import { Registration } from '../../pages/registration';
import { ClientError } from '../../pages/client-error';
import { ServerError } from '../../pages/server-error';
import { Profile } from '../../pages/profile';
import { ChatPage } from '../../pages/chat-page';
import { Sidebar } from '../../components/sidebar';

const auth = new Auth({});
const registration = new Registration({});
const clientError = new ClientError({});
const serverError = new ServerError({});
const profile = new Profile({});
const chatPage = new ChatPage({});

auth.setProps({ test: 'test' });
registration.setProps({ test: 'test' });
clientError.setProps({ test: 'test' });
serverError.setProps({ test: 'test' });
serverError.setProps({ test: 'test' });
profile.setProps({ test: 'test' });
chatPage.setProps({ test: 'test' });

export class Main extends Block {
  constructor(props: TPropsAndChildren) {
    super('div', props);

    this.children.page = this.initPage();
    this.children.sidebar = new Sidebar({
      userName: 'Sergey',
      userPhone: '+7895478475',
    });
  }

  componentDidMount() {
    if (document.location.href.includes(`${document.location.origin}/chat-page`)
        || document.location.href === `${document.location.origin}/profile`) {
      this.setProps({
        isMenu: true,
      });
    } else {
      this.setProps({
        isMenu: false,
      });
    }

    this.children.sidebar.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'sidebar-backdrop') return;
          this.children.sidebar.getContent().classList.remove('sidebar_open');
        },
      },
    });
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'icon-menu') return;
          this.children.sidebar.getContent().classList.add('sidebar_open');
        },
      },
    });
  }

  initPage(): Block {
    if (
      document.location.href === `${document.location.origin}/auth`
        || document.location.href === `${document.location.origin}/`
    ) return auth;
    if (document.location.href === `${document.location.origin}/registration`) return registration;
    if (document.location.href === `${document.location.origin}/server-error`) return serverError;
    if (document.location.href === `${document.location.origin}/profile`) return profile;
    if (document.location.href.includes(`${document.location.origin}/chat-page`)) return chatPage;
    return clientError;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      page: this.children.page,
      sidebar: this.children.sidebar,
      isMenu: this.props.isMenu,
    });
  }
}
