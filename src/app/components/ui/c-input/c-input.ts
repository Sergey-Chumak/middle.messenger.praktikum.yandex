import { inputTmpl } from './c-input.tmpl';
import { IPropsInput } from './c-input.types';
import Block from '../../../services/block/block';

export class CInput extends Block<IPropsInput, void> {
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
    return this.compile(inputTmpl);
  }
}
