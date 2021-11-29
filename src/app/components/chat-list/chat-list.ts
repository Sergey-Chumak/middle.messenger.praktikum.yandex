import { tmpl } from './chat-list.tmpl';
import Block from '../../services/block';
import { IChatListContext } from './chat-list.types';

export class ChatList extends Block {
  constructor(props: IChatListContext) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      class: this.props.class,
    });
  }
}
