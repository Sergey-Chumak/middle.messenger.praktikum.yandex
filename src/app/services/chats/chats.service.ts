import { ChatsServiceApi } from './chats.service.api';
import { ITitleChat } from './chats.types';
import store from '../../store/store';
import { profileService } from '../profile/profile.service';

class ChatsService {
  private chatsApi: ChatsServiceApi = new ChatsServiceApi();

  getChats() {
    return this.chatsApi.getChats().then((data) => {
      store.set('chats', data);
      return data;
    });
  }

  createChat(data: ITitleChat) {
    return this.chatsApi.createChat(data).then((data) => {
      this.getChats();
      return data.id;
    });
  }

  deleteChat(id: number) {
    return this.chatsApi.deleteChat(id).then((data) => {
      this.getChats();
      return data;
    });
  }

  addUser(chatId: number, login: string) {
    return profileService.searchUsers(login).then((users) => {
      const user = users.find((user) => user.login === login);

      if (!user) {
        throw Error('User not found');
      }

      return this.chatsApi.addUsers({ chatId, users: [user.id] });
    });
  }

  changeChatAvatar(data: File, chatId: number) {
    const formData = new FormData();
    formData.append('avatar', data);
    formData.append('chatId', `${chatId}`);
    return this.chatsApi.changeChatAvatar(formData).then((data) => {
      this.getChats();
      return data;
    });
  }

  getChatUsers(id: number) {
    if (!id) return;
    return this.chatsApi.getChatUsers(id);
  }

  getChatToken(chatId: number) {
    return this.chatsApi.getChatToken(chatId);
  }
}

export const chatsService = new ChatsService();
