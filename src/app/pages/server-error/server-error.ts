import { tmpl } from './server-error.tmpl';
import Block from '../../services/block';
import { IPropsServerError } from './server-error.types';

export class ServerError extends Block<IPropsServerError, void > {
  constructor(props: IPropsServerError) {
    super('div', props);
    this.setProps({
      error: '500',
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      error: this.props.error,
    });
  }
}
