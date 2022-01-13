import { tmpl } from './plug-dialog.tmpl';
import Block from '../../../services/block';
import { loader } from '../../../components/loader';

export class PlugDialog extends Block<{}, void> {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    loader.hide();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}
