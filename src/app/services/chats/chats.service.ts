import { ChatsServiceApi } from './chats.service.api';
import store from '../../store/store';
import last from '../../utils/last';
import { getDateCustomFormat, getTimeCustomFormat } from '../../utils/date';
import { IUserData } from '../auth/auth.types';
import { router } from '../router/router';

class ChatsService {
  private chatsApi: ChatsServiceApi = new ChatsServiceApi();

  getChats() {
    return this.chatsApi.getChats().then((data) => {
      const copyData = data?.slice().sort((a, b) => {
        if (a.last_message && b.last_message) {
          return a.last_message.time < b.last_message.time ? 1 : -1;
        }
        if (a.last_message && !b.last_message) return -1;
        if (!a.last_message && b.last_message) return 1;
        if (!a.last_message && !b.last_message) return -1;
        return 0;
      })
        .map((item) => {
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

          item.initials = this.getInitials(item.title);

          return item;
        });
      store.set('chats', copyData);
      return copyData;
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
      router.go('/messenger');
      this.getChats();
      return data;
    });
  }

  addUser(chatId: number, userId: string | number) {
    return this.chatsApi.addUsers({ chatId, users: [+userId] }).then((data) => {
      this.getChatUsers(+last(document.location.pathname.split('/')));
      return data;
    });
  }

  deleteUser(chatId: number, userId: string | number) {
    return this.chatsApi.deleteUsers({ chatId, users: [+userId] }).then(() => {
      this.getChatUsers(+last(document.location.pathname.split('/')));
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

  getChatUsers(id: number): Promise<IUserData[]> {
    if (!id) {
      return new Promise((_resolve, reject) => {
        reject('incorrect Id');
      });
    }
    return this.chatsApi.getChatUsers(id).then((data) => {
      const userNames = data.reduce(
        (acc, cur) => `${acc}${cur.first_name}, `,
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

  getInitials(str: string) {
    if (str.trim().includes(' ')) {
      const words = str.split(' ');

      return `${words[0][0] + words[1][0]}`.toUpperCase();
    }

    return str[0].toUpperCase();
  }
}

export const chatsService = new ChatsService();
