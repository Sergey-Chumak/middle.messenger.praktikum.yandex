import { plugDialogTmpl } from './plug-dialog.tmpl';
import View from '../../../services/view/view';
import { loader } from '../../../components/c-loader';

export class PlugDialog extends View<{}, void> {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    loader.hide();
  }

  render(): DocumentFragment {
    return this.compile(plugDialogTmpl);
  }
}
