import { ProfileServiceApi } from './profile.service.api';
import store from '../../store/store';
import { IUserData } from '../auth/auth.types';

class ProfileService {
  private profileApi: ProfileServiceApi = new ProfileServiceApi();

  public changeUserData(data: any) {
    return this.profileApi.changeUserData(data).then((data: IUserData) => {
      store.set('user', data);
      store.set('user.avatar', data.avatar);
    });
  }

  public changeUserPassword(data: any) {
    return this.profileApi.changeUserPassword(data);
  }

  public changeUserAvatar(data: File) {
    const formData = new FormData();
    formData.append('avatar', data);
    return this.profileApi.changeUserAvatar(formData).then((data: IUserData) => {
      store.set('user.avatar', data.avatar);
    });
  }

  searchUsers(login: string) {
    return this.profileApi.searchUsers({ login });
  }
}

export const profileService = new ProfileService();
