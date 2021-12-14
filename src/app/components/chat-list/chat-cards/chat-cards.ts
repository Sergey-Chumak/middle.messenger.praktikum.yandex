import { tmpl } from './chat-cards.tmpl';
import Block from '../../../services/block';
import { IChatCardsProps } from './chat-cards.types';

export class ChatCards extends Block<IChatCardsProps, void> {
  constructor(props: IChatCardsProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatCards: this.props.chatCards,
    });
  }
}
