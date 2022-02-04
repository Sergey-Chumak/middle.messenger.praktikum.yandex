import HTTPTransport from '../api/http-transport';
import {
  IAddUsersData, IChatCard, ITitleChat,
} from './chats.types';
import { IUserData } from '../auth/auth.types';
import { BASE_URL } from '../constants';

export class ChatsServiceApi {
  private chatApiInstance: HTTPTransport = new HTTPTransport(`${BASE_URL}/chats`);

  getChats() {
    return this.chatApiInstance.get<IChatCard[]>('', { data: { limit: 999 } });
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

  deleteUsers(data: IAddUsersData) {
    return this.chatApiInstance.delete('/users', { data });
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
