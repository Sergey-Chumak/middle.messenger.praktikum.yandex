import { tmpl } from './sidebar.tmpl';
import Block from '../../services/block';
import { IPropsSidebar } from './sidebar.types';

export class Sidebar extends Block<IPropsSidebar, void> {
  constructor(props: IPropsSidebar) {
    super('div', props);
  }

  // @ts-ignore
  componentDidUpdate(oldProps, newProps): boolean {
    if (!newProps.userName && !newProps.userPhone) {
      this.hide();
      return true;
    }
    this.show();
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      userName: this.props.userName,
      userPhone: this.props.userPhone,
      userAvatar: this.props.userAvatar,
    });
  }
}
