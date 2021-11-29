import { tmpl } from './server-error.tmpl';
import Block from '../../services/block';
import { IPropsAndChildren } from '../../services/types';

export class ServerError extends Block {
  constructor(props: IPropsAndChildren) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      error: '500',
    });
  }
}
