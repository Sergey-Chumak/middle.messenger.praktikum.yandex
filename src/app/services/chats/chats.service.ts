import { ChatsServiceApi } from './chats.service.api';
import { ITitleChat } from './chats.types';
import store from '../../store/store';

class ChatsService {
  private chatsApi: ChatsServiceApi = new ChatsServiceApi();

  getChats() {
    return this.chatsApi.getChats().then((data) => store.set('chats', data));
  }

  createChat(data: ITitleChat) {
    return this.chatsApi.createChat(data);
  }
}

export const chatsService = new ChatsService();
