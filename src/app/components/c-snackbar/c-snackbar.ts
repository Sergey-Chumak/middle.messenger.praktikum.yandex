import View from '../../services/view/view';
import { snackbarTmpl } from './c-snackbar.tmpl';
import { IPropsSnackbar } from './c-snackbar.types';
import { render } from '../../utils/renderDOM';

class CSnackbar extends View<IPropsSnackbar, { }> {
  isOpen: boolean;

  constructor(props: IPropsSnackbar) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.getContent().classList.add('c-snackbar');
  }

  componentDidUpdate(): boolean {
    const leftMargin = (document.documentElement.clientWidth - this.getContent().getBoundingClientRect().width) / 2;
    this.getContent().style.left = `${leftMargin}px`;

    if (this.props.color) {
      this.getContent().classList.remove('c-snackbar_error');
      this.getContent().classList.remove('c-snackbar_success');

      this.getContent().classList.add(`c-snackbar_${this.props.color}`);
    }

    this.getContent().classList.add('c-snackbar_open');

    this.show();
    setTimeout(() => {
      this.hide();
      this.isOpen = false;
      this.getContent().classList.remove('c-snackbar_open');
    }, 2500);

    return true;
  }

  render(): DocumentFragment {
    return this.compile(snackbarTmpl);
  }

  open(message: string, color: 'error' | 'success' = 'error'): void {
    if (this.isOpen) return;

    this.setProps({ text: message || '', color });
    this.isOpen = true;
  }
}

export const snackbar = new CSnackbar({});

render('#app', snackbar);
