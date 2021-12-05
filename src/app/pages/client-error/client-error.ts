import Block from '../../services/block';
import { tmpl } from './client-error.tmpl';

export class ClientError extends Block<{}, void> {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, {});
  }
}
