import Block from '../../services/block';
import { TPropsAndChildren } from '../../services/types';
import { tmpl } from './client-error.tmpl';

export class ClientError extends Block {
  constructor(props: TPropsAndChildren) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, {});
  }
}
