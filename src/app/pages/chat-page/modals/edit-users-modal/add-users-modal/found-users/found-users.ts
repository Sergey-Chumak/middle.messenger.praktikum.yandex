import Block from '../../../../../../services/block/block';
import { tmpl } from './found-users.tmpl';
import { IPropsFoundUsers } from './found-users.types';

export class FoundUsers extends Block<IPropsFoundUsers, void> {
  constructor(props: IPropsFoundUsers) {
    super('div', props);

    this.getContent().classList.add('found-users');
  }

  render() {
    return this.compile(tmpl, {
      foundUsers: this.props.foundUsers,
    });
  }
}
