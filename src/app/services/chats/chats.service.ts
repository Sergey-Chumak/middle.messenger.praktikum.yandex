import { ChatsServiceApi } from './chats.service.api';
import store from '../../store/store';
import { profileService } from '../profile/profile.service';
import last from '../../utils/last';
import { getDateCustomFormat, getTimeCustomFormat } from '../../utils/date';
import { IUserData } from '../auth/auth.types';

class ChatsService {
  private chatsApi: ChatsServiceApi = new ChatsServiceApi();

  getChats() {
    return this.chatsApi.getChats().then((data) => {
      data?.sort((a, b) => {
        if (a.last_message && b.last_message) {
          return a.last_message.time < b.last_message.time ? 1 : -1;
        }
        if (a.last_message && !b.last_message) return -1;
        if (!a.last_message && b.last_message) return 1;
        if (!a.last_message && !b.last_message) return -1;
        return 0;
      })
        .forEach((item) => {
          item.id === +last(document.location.pathname.split('/'))!
            ? item.status = 'active'
            : item.status = 'passive';

          if (item.last_message) {
            if (new Date(Date.parse(item.last_message.time)).getDate() === new Date(Date.now()).getDate()) {
              item.last_message.time = getTimeCustomFormat(item.last_message.time);
            } else {
              item.last_message.time = getDateCustomFormat(item.last_message.time);
            }
          }
        });
      store.set('chats', data);
      return data;
    });
  }

  createChat(data: string) {
    return this.chatsApi.createChat({ title: data }).then((data) => {
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

      return this.chatsApi.addUsers({ chatId, users: [user.id] }).then(() => {
        this.getChatUsers(+last(document.location.pathname.split('/')));
      });
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

  getChatUsers(id: number): Promise<IUserData[]> | void {
    if (!id) return;
    return this.chatsApi.getChatUsers(id).then((data) => {
      const userNames = data.reduce(
        (acc, cur) => `${acc + (cur.display_name || `${cur.first_name} ${cur.second_name}`)}, `,
        '',
      ).slice(0, -2);

      store.set('chatUserNames', userNames);
      store.set('chatUsers', data);
      return data;
    });
  }

  getChatToken(chatId: number) {
    return this.chatsApi.getChatToken(chatId);
  }
}

export const chatsService = new ChatsService();
