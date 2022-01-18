import HTTPTransport from '../api/http-transport';
import BaseAPI from '../api/base-api';
import { ISignupFormValue } from '../../pages/auth/signup/signup.types';
import { ISigninFormValue } from '../../pages/auth/signin/signin.types';
import { IRegistrationResp, IUserData } from './auth.types';
import { BASE_URL } from '../constants';

export default class AuthServiceApi extends BaseAPI {
  private authAPIInstance: HTTPTransport;

  constructor() {
    super();
    this.authAPIInstance = new HTTPTransport(`${BASE_URL}/auth`);
  }

  registration(data: ISignupFormValue): Promise<IRegistrationResp> {
    return this.authAPIInstance.post('/signup', { data });
  }

  login(data: ISigninFormValue): Promise<'OK'> {
    return this.authAPIInstance.post('/signin', { data });
  }

  getUserData(): Promise<IUserData> {
    return this.authAPIInstance.get('/user');
  }

  logout(): Promise<'OK'> {
    return this.authAPIInstance.post('/logout');
  }
}
