import BaseAPI from '../api/base-api';
import HTTPTransport from '../api/http-transport';
import { IChat, ITitleChat } from './chats.types';

export class ChatsServiceApi extends BaseAPI {
  private chatApiInstance: HTTPTransport = new HTTPTransport('/chats');

  getChats() {
    return this.chatApiInstance.get<IChat[]>('');
  }

  createChat(data: ITitleChat) {
    return this.chatApiInstance.post<'OK'>('', { data });
  }
}
