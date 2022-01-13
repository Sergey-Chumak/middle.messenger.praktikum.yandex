import Block from '../../services/block';
import { tmpl } from './loader.tmpl';
import { render } from '../../utils/renderDOM';

class Loader extends Block<{ }, void > {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    this.getContent().classList.add('loader-wrapper');
    this.hide();
  }

  render() {
    return this.compile(tmpl, {});
  }
}

export const loader = new Loader({});

render('#app', loader);
