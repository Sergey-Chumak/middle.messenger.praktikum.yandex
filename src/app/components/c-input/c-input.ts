import { inputTmpl } from './c-input.tmpl';
import { IPropsInput } from './c-input.types';
import View from '../../services/view/view';

export class CInput extends View<IPropsInput, void> {
  constructor(props: IPropsInput) {
    super('div', props);
  }

  componentDidMount() {
    this.getContent().classList.add('c-input');

    if (this.props.class) {
      this.getContent().classList.add(this.props.class);
    }

    this.initEvents();
  }

  render(): DocumentFragment {
    return this.compile(inputTmpl);
  }

  initEvents(): void {
    this.setProps({
      events: {
        click: () => {
          (this.getContent().firstElementChild as HTMLInputElement).focus();
        },
      },
    });
  }
}
