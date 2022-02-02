import { chatCardTmpl } from './chat-cards.tmpl';
import View from '../../../../services/view/view';
import { IChatCardsProps } from './chat-cards.types';

export class ChatCards extends View<IChatCardsProps, void> {
  constructor(props: IChatCardsProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(chatCardTmpl);
  }
}
