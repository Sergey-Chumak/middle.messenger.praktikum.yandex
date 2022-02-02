import { buttonTmpl } from './c-button.tmpl';
import { IPropsButton } from './c-button.types';
import View from '../../services/view/view';

export class CButton extends View<IPropsButton, void> {
  constructor(props: IPropsButton) {
    super('div', props);
  }

  componentDidMount() {
    this.getContent().classList.add('c-button');
    if (this.props?.class) this.getContent().classList.add(this.props.class);
    if (this.props?.size) this.getContent().classList.add(`c-button_${this.props.size}`);
    if (this.props?.color) this.getContent().classList.add(`c-button_${this.props.color}`);

    this.initEvents();
  }

  render(): DocumentFragment {
    return this.compile(buttonTmpl);
  }

  initEvents(): void {
    this.setProps({
      events: {
        click: this.pulseAnimation.bind(this),
      },
    });
  }

  pulseAnimation(event: MouseEvent): void {
    const div = document.createElement('div');
    const mValue = Math.max(this.getContent().clientWidth, this.getContent().clientHeight);
    const rect = this.getContent().getBoundingClientRect();

    div.style.width = `${mValue}px`;
    div.style.height = `${mValue}px`;
    div.style.left = `${event.clientX - rect.left - (mValue / 2)}px`;
    div.style.top = `${event.clientY - rect.top - (mValue / 2)}px`;

    div.classList.add('c-button_pulse');
    this.getContent().appendChild(div);

    setTimeout(() => {
      this.getContent().removeChild(div);
    }, 700);
  }
}
