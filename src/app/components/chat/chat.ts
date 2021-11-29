import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './chat.tmpl';
import { IPropsAndChildren, TCompileTemplate } from '../../services/types';
import { IChatContext } from './chat.types';
import Block from '../../services/block';

export class Chat extends Block {
  constructor(props: IPropsAndChildren) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}
