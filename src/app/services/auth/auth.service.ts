import { ISigninFormValue } from '../../pages/auth/signin/signin.types';
import AuthServiceApi from './auth.service.api';
import store from '../../store/store';
import { router } from '../../routing/routing';
import { IUserData } from './auth.types';
import { ISignupFormValue } from '../../pages/auth/signup/signup.types';

class AuthService {
  authApi: AuthServiceApi;

  constructor() {
    this.authApi = new AuthServiceApi();
  }

  public registration(data: ISignupFormValue) {
    return this.authApi.registration(data);
  }
  public login(data: ISigninFormValue) {
    return this.authApi.login(data);
  }

  public getUserData() {
    return this.authApi.getUserData()
      .then((data:IUserData) => {
        store.set('user', data);
        // if (document.location.pathname === '/signin' || document.location.pathname === '/signup') {
        //   router.go('/messenger');
        // }
      });
    // .catch((e) => {
    //   if (e.status !== 401) {
    //     this.logout().catch((e) => console.log(e));
    //   }
    //   if (document.location.pathname === '/signup') return;
    //   router.go('/signin');
    // });
  }

  public logout() {
    store.removeState();
    return this.authApi.logout();
  }
}

export const authService = new AuthService();
