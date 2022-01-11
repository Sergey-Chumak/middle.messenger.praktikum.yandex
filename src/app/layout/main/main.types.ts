import { Sidebar } from '../../components/sidebar';
import { ChatPage } from '../../pages/chat-page';
import { ClientError } from '../../pages/client-error';
import { ServerError } from '../../pages/server-error';
import { Signin } from '../../pages/auth/signin';
import { Signup } from '../../pages/auth/signup';
import { IState } from '../../store/store.types';
import { Profile } from '../../pages/profile';
import { Modal } from '../../components/ui/modal';

export interface IPropsMain {
    isMenu?: boolean;
    sidebar?: Sidebar;
    page?: ChatPage | ClientError | ServerError | Signin | Signup | typeof Profile;
    name?: string;
    phone?: string;
    avatar?: string;
    state?: IState
}

export interface IChildrenMain {
    sidebar: Sidebar;
    modal: Modal;
    page: ChatPage | ClientError | ServerError | Signin | Signup | typeof Profile;
}
