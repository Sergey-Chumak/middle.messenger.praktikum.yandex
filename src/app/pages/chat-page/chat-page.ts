import { tmpl } from './chat-page.tmpl';
import Block from '../../services/block';
import { ChatList } from '../../components/chat-list';
import { Chat } from '../../components/chat';
import last from '../../utils/last';
import { getUserData } from '../../services/server-data';
import { PlugDialog } from '../../components/plug-dialog';
import { IChatPageChildren, IChatPageProps } from './chat-page.types';
import { IChatCard } from '../../components/chat-list/chat-cards';
import { getElementWithId } from '../../utils/get-element';

export class ChatPage extends Block<IChatPageProps, IChatPageChildren> {
  chatCards: IChatCard[] = getUserData() as IChatCard[];
  constructor(props: IChatPageProps) {
    super('div', props);

    this.children.chatList = new ChatList({
      chatCards: this.chatCards,
    });

    if (getUserData().find((user) => user.id === last(document.location.href.split('/')))) {
      this.children.chat = new Chat({});
    } else {
      this.children.chat = new PlugDialog({});
    }
  }

  componentDidMount() {
    this.chatCards.forEach((item) => {
      item.id === last(document.location.href.split('/'))
        ? item.status = 'active'
        : item.status = 'passive';
    });

    this.children.chat.setProps({
      test: 'test',
    });

    this.setProps({
      events: {
        click: (event: Event) => {
          if (!this.chatCards.find(((item) => item.id === getElementWithId(event.target as HTMLElement)))) return;
          this.chatCards.forEach((item) => {
            item.id === getElementWithId(event.target as HTMLElement)
              ? item.status = 'active'
              : item.status = 'passive';
          });

          const currentId = this.chatCards.find((item) => item.status === 'active')?.id;
          document.location.href = `${document.location.origin}/chat-page/${currentId}`;

          this.children.chatList.setProps({
            chatCards: this.chatCards,
          });

          console.log(this.chatCards);

          this.setProps({
            chatList: this.props.chatList,
          });
        },
        input: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'input-search') return;
          let arr = this.chatCards;
          arr = arr.filter((item) => item.name.toLowerCase()
            .includes((event.target as HTMLInputElement).value.toLowerCase()));
          console.log(arr);
          this.children.chatList.setProps({
            chatCards: arr,
          });
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatList: this.children.chatList,
      chat: this.children.chat,
    });
  }
}
