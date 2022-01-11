import BaseAPI from '../api/base-api';
import HTTPTransport from '../api/http-transport';
import {
  IAddUsersData, IChatCard, ITitleChat,
} from './chats.types';
import { IUserData } from '../auth/auth.types';

export class ChatsServiceApi extends BaseAPI {
  private chatApiInstance: HTTPTransport = new HTTPTransport('/chats');

  getChats() {
    return this.chatApiInstance.get<IChatCard[]>('');
  }

  createChat(data: ITitleChat) {
    return this.chatApiInstance.post<{id: number}>('', { data });
  }

  deleteChat(id: number) {
    return this.chatApiInstance.delete('', { data: { chatId: id } });
  }

  addUsers(data: IAddUsersData) {
    return this.chatApiInstance.put('/users', { data });
  }

  changeChatAvatar(data: FormData) {
    return this.chatApiInstance.put('/avatar', { data });
  }

  getChatUsers(id: number): Promise<IUserData[]> {
    return this.chatApiInstance.get<IUserData[]>(`/${id}/users`);
  }

  getChatToken(chatId: number) {
    return this.chatApiInstance.post<{token: string}>(`/token/${chatId}`);
  }
}
