import BaseAPI from '../api/base-api';
import HTTPTransport from '../api/http-transport';
import { IUserDataFormValue, IUserPassFormValue } from '../../pages/profile/profile.types';
import { IUsersSearch } from '../chats/chats.types';
import { IUserData } from '../auth/auth.types';

export class ProfileServiceApi extends BaseAPI {
  private profileApiInstance = new HTTPTransport('/user');

  changeUserData(data: IUserDataFormValue) {
    return this.profileApiInstance.put('/profile', { data });
  }

  changeUserPassword(data: IUserPassFormValue) {
    return this.profileApiInstance.put('/password', { data });
  }

  changeUserAvatar(data: FormData) {
    return this.profileApiInstance.put('/profile/avatar', { data });
  }

  searchUsers(data: IUsersSearch) {
    return this.profileApiInstance.post<IUserData[]>('/search', { data });
  }
}
