import { tmpl } from './server-error.tmpl';
import Block from '../../services/block';
import { TPropsAndChildren } from '../../services/types';

export class ServerError extends Block {
  constructor(props: TPropsAndChildren) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      error: '500',
    });
  }
}
