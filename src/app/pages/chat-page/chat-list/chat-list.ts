import { tmpl } from './chat-list.tmpl';
import Block from '../../../services/block/block';
import { IChatListChildren, IChatListProps } from './chat-list.types';
import { ChatCards } from './chat-cards';
import { IChatCard } from '../../../services/chats/chats.types';
import { getElementId } from '../../../utils/get-element-id';
import { chatsService } from '../../../services/chats/chats.service';
import last from '../../../utils/last';
import store from '../../../store/store';
import connect from '../../../utils/hoc/connect';
import { webSocketApi } from '../../../services/web-socket/web-socket';
import { loader } from '../../../components/loader';
import isEqual from '../../../utils/isEqual';
import { router } from '../../../services/router/router';
import audioFile from '../../../../assets/audio/new-message.mp3';

class ChatList extends Block<IChatListProps, IChatListChildren> {
  chatCards: IChatCard[];
  searchValue: string = '';

  constructor(props: IChatListProps) {
    super('div', props);

    this.children.chatCards = new ChatCards({ chatCards: this.chatCards });
  }

  componentDidMount() {
    this.saveChatTitle();
    this.initEvents();
  }

  componentDidUpdate(oldProps: IChatListProps, newProps: IChatListProps): boolean {
    const isNewMessages = newProps.chatCards?.some((i, idx) => {
      if (oldProps?.chatCards) {
        const isGotNewMessage = (i.unread_count !== oldProps?.chatCards[idx]?.unread_count) && (i.unread_count !== 0);
        return isGotNewMessage;
      }
      return false;
    });

    if (isNewMessages) {
      const audio = new Audio();
      audio.src = audioFile;

      audio.currentTime = 0;
      audio.play();
    }

    this.chatCards = newProps.chatCards;

    if (!isEqual(newProps.chatCards, oldProps.chatCards)) {
      this.searchValue = '';
    }

    const filteredChatCards = this.chatCards?.filter((item) => item.title.toLowerCase()
      .includes(this.searchValue));
    this.children.chatCards.setProps({ chatCards: filteredChatCards });
    if (isEqual(newProps.chatCards, oldProps.chatCards)) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatCards: this.props.chatCards,
    });
  }

  saveChatTitle() {
    if (document.location.pathname.startsWith('/messenger/') && document.location.pathname !== '/messenger/') {
      const chatId = +last(document.location.pathname.split('/'));
      chatsService.getChatUsers(chatId)
        ?.then(() => {
          const currentChat = this.chatCards?.find((item) => item.status === 'active');
          store.set('currentChat', currentChat?.title);

          const chatId = +last(document.location.pathname.split('/'));
          chatsService.getChatToken(chatId).then((data) => {
            webSocketApi.open(data.token);
          });
        }).catch(() => {
          router.go('/client-error');
        });
    }
  }

  initEvents() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'setting-icon') router.go('/profile');

          if (!this.chatCards?.find(((item) => item.id === +getElementId(event.target as HTMLElement)!))) return;
          if (
            this.chatCards?.find((item) => item.status === 'active')?.id === +getElementId(event.target as HTMLElement)!
          ) return;

          this.chatCards.forEach((item) => {
            if (item.id === +getElementId(event.target as HTMLElement)!) {
              item.status = 'active';
            } else {
              item.status = 'passive';
            }
          });

          const scrollChats = document.querySelector('.chat-list__available-chats')?.scrollTop;
          if (scrollChats || scrollChats === 0) {
            store.set('scrollChats', scrollChats);
          }
          store.set('currentMessages', []);

          document.querySelector('.chat-list__available-chats')?.scrollTo(0, scrollChats as number);
          (document.getElementById('message') as HTMLInputElement).value = '';

          loader.show();

          const currentChat = this.chatCards.find((item) => item.status === 'active');

          chatsService.getChatUsers(currentChat!.id)
            ?.then(() => {
              store.set('currentChat', currentChat!.title);
              document.querySelector('.chat-list__available-chats')?.scrollTo(0, scrollChats as number);

              router.go(`/messenger/${this.chatCards.find((item) => item.status === 'active')?.id}`);

              const chatId = +last(document.location.pathname.split('/'));

              chatsService.getChatToken(chatId).then((data) => {
                webSocketApi.open(data.token);
              });
            });
        },
        input: (event: Event) => {
          if ((event.target as HTMLElement).id !== 'input-search') return;
          this.searchValue = (event.target as HTMLInputElement).value.toLowerCase();
          const filteredChatCards = this.chatCards.filter((item) => item.title.toLowerCase()
            .includes(this.searchValue));
          this.children.chatCards.setProps({ chatCards: filteredChatCards });
        },
      },
    });
  }
}

export const ChatListWrap = connect<IChatListProps, IChatListChildren>((state) => ({
  chatCards: state?.chats,
}))(ChatList as unknown as typeof Block);
