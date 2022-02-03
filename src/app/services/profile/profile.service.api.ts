import BaseAPI from '../api/base-api';
import HTTPTransport from '../api/http-transport';
import { IUsersSearch } from '../chats/chats.types';
import { IUserData } from '../auth/auth.types';
import { BASE_URL } from '../constants';

export class ProfileServiceApi extends BaseAPI {
  private profileApiInstance = new HTTPTransport(`${BASE_URL}/user`);

  changeUserData(data: any) {
    return this.profileApiInstance.put('/profile', { data });
  }

  changeUserPassword(data: any) {
    return this.profileApiInstance.put('/password', { data });
  }

  changeUserAvatar(data: FormData) {
    return this.profileApiInstance.put('/profile/avatar', { data });
  }

  searchUsers(data: IUsersSearch) {
    return this.profileApiInstance.post<IUserData[]>('/search', { data });
  }
}
