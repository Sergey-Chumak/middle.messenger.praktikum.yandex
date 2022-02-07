import HTTPTransport from '../api/http-transport';
import { ISignupFormValue } from '../../pages/auth/signup/signup.types';
import { ISigninFormValue } from '../../pages/auth/signin/signin.types';
import { IRegistrationResp, IUserData } from './auth.types';
import { BASE_URL } from '../constants';

export default class AuthServiceApi {
  private authAPIInstance: HTTPTransport = new HTTPTransport(`${BASE_URL}/auth`);

  public registration(data: ISignupFormValue): Promise<IRegistrationResp> {
    return this.authAPIInstance.post('/signup', { data });
  }

  public login(data: ISigninFormValue): Promise<'OK'> {
    return this.authAPIInstance.post('/signin', { data });
  }

  public getUserData(): Promise<IUserData> {
    return this.authAPIInstance.get('/user');
  }

  public logout(): Promise<'OK'> {
    return this.authAPIInstance.post('/logout');
  }
}
