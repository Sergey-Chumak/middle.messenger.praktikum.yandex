import { ISigninFormValue } from '../../pages/auth/signin/signin.types';
import AuthServiceApi from './auth.service.api';
import store from '../../store/store';
import { IRegistrationResp, IUserData } from './auth.types';
import { ISignupFormValue } from '../../pages/auth/signup/signup.types';
import { chatsService } from '../chats/chats.service';
import { snackbar } from '../../components/c-snackbar';
import { ucFirstLetter } from '../../utils/ucFirstLetter';

class AuthService {
  authApi: AuthServiceApi = new AuthServiceApi();

  public registration(data: ISignupFormValue): Promise<IRegistrationResp> {
    return this.authApi.registration(data);
  }

  public login(data: ISigninFormValue): Promise<'OK'> {
    return this.authApi.login(data).then((data) => {
      chatsService.getChats()
        .catch((e) => {
          snackbar.open(ucFirstLetter(e.reason || e.error));
        });
      return data;
    });
  }

  public getUserData(): Promise<IUserData> {
    return this.authApi.getUserData()
      .then((data:IUserData) => {
        store.set('user', data);
        store.set('user.avatar', data.avatar);
        return data;
      });
  }

  public logout(): Promise<'OK'> {
    store.removeState();
    return this.authApi.logout();
  }
}

export const authService = new AuthService();
