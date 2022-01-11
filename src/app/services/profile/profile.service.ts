import { ProfileServiceApi } from './profile.service.api';
import { IUserDataFormValue, IUserPassFormValue } from '../../pages/profile/profile.types';
import store from '../../store/store';
import { IUserData } from '../auth/auth.types';
import { BASE_URL } from '../constants';

class ProfileService {
  private profileApi: ProfileServiceApi = new ProfileServiceApi();

  public changeUserData(data: IUserDataFormValue) {
    return this.profileApi.changeUserData(data).then((data: IUserData) => {
      store.set('user', data);
      store.set('user.avatar', `${BASE_URL}/Resources${data.avatar}`);
    });
  }

  public changeUserPassword(data: IUserPassFormValue) {
    return this.profileApi.changeUserPassword(data);
  }

  public changeUserAvatar(data: File) {
    const formData = new FormData();
    formData.append('avatar', data);
    return this.profileApi.changeUserAvatar(formData).then((data: IUserData) => {
      store.set('user.avatar', `${BASE_URL}/Resources${data.avatar}`);
    });
  }

  searchUsers(login: string) {
    return this.profileApi.searchUsers({ login });
  }
}

export const profileService = new ProfileService();
