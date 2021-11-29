import Block from '../../services/block';
import { IPropsAndChildren } from '../../services/types';
import { tmpl } from './client-error.tmpl';

export class ClientError extends Block {
  constructor(props: IPropsAndChildren) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, {});
  }
}
