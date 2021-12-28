import { Sidebar } from '../../components/sidebar';
import { ChatPage } from '../../pages/chat-page';
import { ClientError } from '../../pages/client-error';
import { ServerError } from '../../pages/server-error';
import { Signin } from '../../pages/auth/signin';
import { Signup } from '../../pages/auth/signup';
import { Profile } from '../../pages/profile';
import { IState } from '../../store/store.types';

export interface IPropsMain {
    isMenu?: boolean;
    sidebar?: Sidebar;
    page?: ChatPage | ClientError | ServerError | Signin | Signup | Profile;
    name?: string;
    phone?: string;
    avatar?: string;
    state?: IState
}

export interface IChildrenMain {
    sidebar: Sidebar;
    page: ChatPage | ClientError | ServerError | Signin | Signup | Profile;
}
