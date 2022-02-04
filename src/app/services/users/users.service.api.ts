import HTTPTransport from '../api/http-transport';
import { IUsersSearch } from '../chats/chats.types';
import { IUserData } from '../auth/auth.types';
import { BASE_URL } from '../constants';
import { IChangeDataFormValue } from '../../pages/profile/change-data-modal/change-data-modal.types';
import { IChangePasswordFormValue } from '../../pages/profile/change-password-modal/change-password-modal.types';

export class UsersServiceApi {
  private usersApiInstance = new HTTPTransport(`${BASE_URL}/user`);

  changeUserData(data: IChangeDataFormValue): Promise<IUserData> {
    return this.usersApiInstance.put('/profile', { data });
  }

  getUser(id: number | string): Promise<IUserData> {
    return this.usersApiInstance.get(`/${id}`);
  }

  changeUserPassword(data: IChangePasswordFormValue): Promise<'OK'> {
    return this.usersApiInstance.put('/password', { data });
  }

  changeUserAvatar(data: FormData): Promise<IUserData> {
    return this.usersApiInstance.put('/profile/avatar', { data });
  }

  searchUsers(data: IUsersSearch): Promise<IUserData[]> {
    return this.usersApiInstance.post<IUserData[]>('/search', { data });
  }
}
