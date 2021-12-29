import { ProfileServiceApi } from './profile.service.api';
import { IUserDataFormValue, IUserPassFormValue } from '../../pages/profile/profile.types';
import store from '../../store/store';
import { IUserData } from '../auth/auth.types';
import { BASE_URL } from '../constants';

class ProfileService {
  private profileApi: ProfileServiceApi = new ProfileServiceApi();

  public changeUserData(data: IUserDataFormValue) {
    return this.profileApi.changeUserData(data).then((data: IUserData) => store.set('user', data));
  }

  public changeUserPassword(data: IUserPassFormValue) {
    return this.profileApi.changeUserPassword(data);
  }

  public changeUserAvatar(data: File) {
    return this.profileApi.changeUserAvatar(data).then((data: IUserData) => {
      store.set('user.avatar', `${BASE_URL}/Resources${data.avatar}`);
    });
  }
}

export const profileService = new ProfileService();
