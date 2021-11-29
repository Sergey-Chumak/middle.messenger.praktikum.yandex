import { tmpl } from './input.tmpl';
import { IInputContext } from './input.types';
import Block from '../../../services/block';

export class Input extends Block {
  constructor(props: IInputContext) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
