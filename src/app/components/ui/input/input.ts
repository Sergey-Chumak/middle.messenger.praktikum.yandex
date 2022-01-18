import { tmpl } from './input.tmpl';
import { IPropsInput } from './input.types';
import Block from '../../../services/block/block';

export class Input extends Block<IPropsInput, void> {
  constructor(props: IPropsInput) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
