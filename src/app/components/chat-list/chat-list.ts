import { tmpl } from './chat-list.tmpl';
import Block from '../../services/block';
import { IChatListChildren, IChatListProps } from './chat-list.types';
import { ChatCards, IChatCard } from './chat-cards';

export class ChatList extends Block<IChatListProps, IChatListChildren> {
  chatCards = this.props.chatCards as IChatCard[];
  search = this.props.search;
  constructor(props: IChatListProps) {
    super('div', props);
  }

  componentDidMount() {
    this.children.chatCards = new ChatCards({
      chatCards: this.chatCards,
    });

    this.setProps({
      chatCards: this.chatCards,
    });
  }

  componentDidUpdate(oldProps, newProps): boolean {
    this.children.chatCards.setProps({
      chatCards: newProps.chatCards,
    });
    return oldProps.chatCards === newProps.chatCards;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatCards: this.props.chatCards,
      search: this.props.search,
    });
  }
}
