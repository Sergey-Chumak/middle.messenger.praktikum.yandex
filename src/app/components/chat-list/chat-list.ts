import { tmpl } from './chat-list.tmpl';
import Block from '../../services/block';
import { IChatListChildren, IChatListProps } from './chat-list.types';
import { ChatCards, IChatCard } from './chat-cards';

export class ChatList extends Block<IChatListProps, IChatListChildren> {
  chatCards: IChatCard[] = this.props.chatCards;

  constructor(props: IChatListProps) {
    super('div', props);
  }

  componentDidMount() {
    this.children.chatCards = new ChatCards({ chatCards: this.chatCards });
    this.setProps({ chatCards: this.chatCards });
  }

  componentDidUpdate(oldProps: IChatListProps, newProps: IChatListProps): boolean {
    this.children.chatCards?.setProps({ chatCards: newProps.chatCards });
    if (oldProps.chatCards !== newProps.chatCards) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatCards: this.props.chatCards,
      value: this.props.value,
    });
  }
}
