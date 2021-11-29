import { tmpl } from './plug-dialog.tmpl';
import Block from '../../services/block';

export class PlugDialog extends Block {
  constructor() {
    super('div');
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}
