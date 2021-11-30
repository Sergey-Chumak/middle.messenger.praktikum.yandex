import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './chat.tmpl';
import { TPropsAndChildren, TCompileTemplate } from '../../services/types';
import { IChatContext } from './chat.types';
import Block from '../../services/block';

export class Chat extends Block {
  constructor(props: TPropsAndChildren) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}
