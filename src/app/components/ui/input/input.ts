import { tmpl } from './input.tmpl';
import { IPropsInput } from './input.types';
import Block from '../../../services/block/block';

export class Input extends Block<IPropsInput, void> {
  constructor(props: IPropsInput) {
    super('div', props);
  }

  componentDidMount() {
    this.getContent().classList.add('c-input');

    this.setProps({
      events: {
        click: () => {
          (this.getContent().firstElementChild as HTMLInputElement).focus();
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl);
  }
}
