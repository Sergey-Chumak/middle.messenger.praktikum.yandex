import View from '../../services/view/view';
import { loaderTmpl } from './c-loader.tmpl';
import { render } from '../../utils/renderDOM';

class CLoader extends View<{ }, { } > {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    this.getContent().classList.add('c-loader-wrapper');
    this.hide();
  }

  render(): DocumentFragment {
    return this.compile(loaderTmpl);
  }
}

export const loader = new CLoader({});

render('#app', loader);
