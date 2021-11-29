import { tmpl } from './button.tmpl';
import { IButtonContext } from './button.types';
import Block from '../../../services/block';

export class Button extends Block {
  constructor(props: IButtonContext) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
