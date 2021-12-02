import { tmpl } from './plug-dialog.tmpl';
import Block from '../../services/block';

export class PlugDialog extends Block<{ }, void> {
  constructor(props) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}
