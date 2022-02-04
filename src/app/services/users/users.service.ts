import { UsersServiceApi } from './users.service.api';
import store from '../../store/store';
import { IUserData } from '../auth/auth.types';
import { IChangeDataFormValue } from '../../pages/profile/change-data-modal/change-data-modal.types';
import { IChangePasswordFormValue } from '../../pages/profile/change-password-modal/change-password-modal.types';

class UsersService {
  private usersApi: UsersServiceApi = new UsersServiceApi();

  public changeUserData(data: IChangeDataFormValue): Promise<void> {
    return this.usersApi.changeUserData(data).then((data: IUserData) => {
      store.set('user', data);
      store.set('user.avatar', data.avatar);
    });
  }

  public changeUserPassword(data: IChangePasswordFormValue): Promise<'OK'> {
    return this.usersApi.changeUserPassword(data);
  }

  public changeUserAvatar(data: File): Promise<void> {
    const formData = new FormData();
    formData.append('avatar', data);
    return this.usersApi.changeUserAvatar(formData).then((data: IUserData) => {
      store.set('user.avatar', data.avatar);
    });
  }

  getUser(id: number | string): Promise<IUserData> {
    return this.usersApi.getUser(id);
  }

  searchUsers(login: string): Promise<IUserData[]> {
    return this.usersApi.searchUsers({ login });
  }
}

export const usersService = new UsersService();
