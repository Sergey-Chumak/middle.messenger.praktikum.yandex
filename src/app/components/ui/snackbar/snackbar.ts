import Block from '../../../services/block';
import { tmpl } from './snackbar.tmpl';
import { IPropsSnackbar } from './snackbar.types';

export class Snackbar extends Block<IPropsSnackbar, void> {
  constructor(props: IPropsSnackbar) {
    super('div', props);
    this.hide();
  }

  componentDidUpdate() {
    this.show();

    setTimeout(() => {
      this.hide();
    }, 2000);

    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      text: this.props.text,
      color: this.props.color,
    });
  }
}
