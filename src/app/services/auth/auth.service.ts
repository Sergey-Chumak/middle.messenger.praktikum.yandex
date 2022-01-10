import { ISigninFormValue } from '../../pages/auth/signin/signin.types';
import AuthServiceApi from './auth.service.api';
import store from '../../store/store';
import { IUserData } from './auth.types';
import { ISignupFormValue } from '../../pages/auth/signup/signup.types';
import { BASE_URL } from '../constants';
import { chatsService } from '../chats/chats.service';

class AuthService {
  authApi: AuthServiceApi = new AuthServiceApi();

  public registration(data: ISignupFormValue) {
    return this.authApi.registration(data);
  }

  public login(data: ISigninFormValue) {
    return this.authApi.login(data).then((data) => {
      chatsService.getChats();
      return data;
    });
  }

  public getUserData() {
    return this.authApi.getUserData()
      .then((data:IUserData) => {
        store.set('user', data);
        store.set('user.avatar', `${BASE_URL}/Resources${data.avatar}`);
      });
  }

  public logout() {
    store.removeState();
    return this.authApi.logout();
  }
}

export const authService = new AuthService();
