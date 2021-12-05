import { tmpl } from './sidebar.tmpl';
import Block from '../../services/block';
import { IPropsSidebar } from './sidebar.types';

export class Sidebar extends Block<IPropsSidebar, void> {
  constructor(props: IPropsSidebar) {
    super('div', props);
  }

  componentDidMount() {
    (document.querySelector('#chat-list-sidebar') as HTMLElement).addEventListener('click', () => {
      document.location.href = '/chat-page';
    });

    (document.querySelector('#profile-sidebar') as HTMLElement).addEventListener('click', () => {
      document.location.href = '/profile';
    });

    (document.querySelector('#logout-sidebar') as HTMLElement).addEventListener('click', () => {
      document.location.href = '/auth';
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: this.props.userName,
      userPhone: this.props.userPhone,
    });
  }
}
