import { tmpl } from './sidebar.tmpl';
import { IPropsAndChildren } from '../../services/types';
import Block from '../../services/block';

export class Sidebar extends Block {
  constructor(props: IPropsAndChildren) {
    super('div', props);
  }

  componentDidMount() {
    (document.querySelector('#chat-list-sidebar') as HTMLElement).addEventListener('click', () => {
      document.location.href = 'chat-page';
    });

    (document.querySelector('#profile-sidebar') as HTMLElement).addEventListener('click', () => {
      document.location.href = 'profile';
    });

    (document.querySelector('#logout-sidebar') as HTMLElement).addEventListener('click', () => {
      document.location.href = 'auth';
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: this.props.userName,
      userPhone: this.props.userPhone,
    });
  }
}
