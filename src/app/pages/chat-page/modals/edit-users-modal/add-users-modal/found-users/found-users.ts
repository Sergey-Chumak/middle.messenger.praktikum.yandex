import View from '../../../../../../services/view/view';
import { foundUsersTmpl } from './found-users.tmpl';
import { IPropsFoundUsers } from './found-users.types';

export class FoundUsers extends View<IPropsFoundUsers, void> {
  constructor(props: IPropsFoundUsers) {
    super('div', props);

    this.getContent().classList.add('found-users');
  }

  render() {
    return this.compile(foundUsersTmpl);
  }
}
