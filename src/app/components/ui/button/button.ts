import { tmpl } from './button.tmpl';
import { IPropsButton } from './button.types';
import Block from '../../../services/block';

export class Button extends Block<IPropsButton, void> {
  constructor(props: IPropsButton) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
