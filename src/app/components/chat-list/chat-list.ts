import { tmpl } from './chat-list.tmpl';
import Block from '../../services/block';
import { IChatListChildren, IChatListProps } from './chat-list.types';
import { ChatCards } from './chat-cards';
import { IChatCard } from '../../services/chats/chats.types';

export class ChatList extends Block<IChatListProps, IChatListChildren> {
  chatCards: IChatCard[] = this.props.chatCards;
  searchValue: string = this.props.value || '';

  constructor(props: IChatListProps) {
    super('div', props);

    this.children.chatCards = new ChatCards({ chatCards: this.chatCards });
  }

  componentDidMount() {
    this.initEventsComponent();
  }

  componentDidUpdate(oldProps: IChatListProps, newProps: IChatListProps): boolean {
    this.chatCards = newProps.chatCards;
    const filteredChatCards = this.chatCards?.filter((item) => item.title.toLowerCase()
      .includes(this.searchValue));
    this.children.chatCards.setProps({ chatCards: filteredChatCards });
    if (oldProps.value !== newProps.value) return false;
    // this.children.chatCards?.setProps({ chatCards: newProps.chatCards });
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatCards: this.props.chatCards,
      value: this.props.value,
    });
  }

  initEventsComponent() {
    this.setProps({
      events: {
        input: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'input-search') return;
          this.searchValue = (event.target as HTMLInputElement).value.toLowerCase();
          const filteredChatCards = this.chatCards.filter((item) => item.title.toLowerCase()
            .includes(this.searchValue));
          this.setProps({
            value: this.searchValue,
          });
          this.children.chatCards.setProps({ chatCards: filteredChatCards });
        },
      },
    });
  }
}
