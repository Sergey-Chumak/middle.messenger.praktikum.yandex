import { tmpl } from './sidebar.tmpl';
import Block from '../../services/block';
import { IPropsSidebar } from './sidebar.types';
import { getElementWithId } from '../../utils/get-element';

export class Sidebar extends Block<IPropsSidebar, void> {
  constructor(props: IPropsSidebar) {
    super('div', props);
  }

  componentDidMount() {
    this.initComponentEvents();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: this.props.userName,
      userPhone: this.props.userPhone,
    });
  }

  initComponentEvents() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if (getElementWithId(event.target as HTMLElement) === 'profile-sidebar') {
            document.location.href = '/profile';
          }
          if (getElementWithId(event.target as HTMLElement) === 'chat-list-sidebar') {
            document.location.href = '/chat-page';
          }
          if (getElementWithId(event.target as HTMLElement) === 'logout-sidebar') {
            document.location.href = '/auth';
          }
        },
      },
    });
  }
}
