import BaseAPI from '../api/base-api';
import HTTPTransport from '../api/http-transport';
import { IUserDataFormValue, IUserPassFormValue } from '../../pages/profile/profile.types';

export class ProfileServiceApi extends BaseAPI {
  private profileApiInstance = new HTTPTransport('/user');

  changeUserData(data: IUserDataFormValue) {
    return this.profileApiInstance.put('/profile', { data });
  }

  changeUserPassword(data: IUserPassFormValue) {
    return this.profileApiInstance.put('/password', { data });
  }

  changeUserAvatar(data: File) {
    return this.profileApiInstance.put('/profile/avatar', { data });
  }
}
