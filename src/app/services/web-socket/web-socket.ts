import store from '../../store/store';
import last from '../../utils/last';
import { cloneDeep } from '../../utils/cloneDeep';
import { IMessage } from '../../pages/chat-page/chat/dialogues';
import { chatsService } from '../chats/chats.service';
import { loader } from '../../components/loader';

class WebSocketApi {
  socket: WebSocket;
  interval;

  open(token: string) {
    if (this.socket) this.close();
    const currentChatId = last(document.location.pathname.split('/'));
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${store.getState().user!.id}/${currentChatId}/${token}`,
    );

    this.initEventOpen();
    this.initEventMessage();
    this.initEventClose();
    this.initEventError();
  }

  close() {
    this.socket.close();
    clearInterval(this.interval);
  }

  private initEventOpen() {
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    this.interval = setInterval(() => {
      this.socket.send('ping');
      chatsService.getChats();
    }, 10000);
  }

  private initEventMessage() {
    this.socket.addEventListener('message', (event) => {
      if (JSON.parse(event.data).type === 'message' || Array.isArray(JSON.parse(event.data))) {
        chatsService.getChats();

        let currentMessages: IMessage[] = [];
        if (Array.isArray(JSON.parse(event.data))) {
          currentMessages = [...JSON.parse(event.data)];
        } else {
          currentMessages = cloneDeep(store.getState().currentMessages || currentMessages) as IMessage[];
          currentMessages.unshift(JSON.parse(event.data));
        }

        const scrollDialogues = (document.querySelector('#dialogues') as HTMLElement).scrollTop;

        store.set('currentMessages', currentMessages);

        if (store.getState().user?.id === (JSON.parse(event.data).user_id)) {
          (document.querySelector('#message') as HTMLElement)?.focus();
        } else {
          const dialoguesEl = document.querySelector('#dialogues') as HTMLElement;
          const heightMessage = dialoguesEl.firstElementChild?.getBoundingClientRect().height || 0;
          const margin = 10;
          if (scrollDialogues !== 0) {
            dialoguesEl.scrollTo(0, scrollDialogues - heightMessage - margin);
          }
        }

        loader.hide();

        if (JSON.parse(event.data).type === 'message') {
          chatsService.getChats();
        }
      }
    });
  }

  private initEventClose() {
    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
    });
  }

  private initEventError() {
    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as ErrorEvent).message);
    });
  }

  sendMessage(message: string) {
    if (!message.trim()) return;
    this.socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }
}

export const webSocketApi = new WebSocketApi();
