import { Sidebar } from '../../components/sidebar';
import { ChatPage } from '../../pages/chat-page';
import { ClientError } from '../../pages/client-error';
import { ServerError } from '../../pages/server-error';
import { Auth } from '../../pages/auth';
import { Registration } from '../../pages/registration';
import { Profile } from '../../pages/profile';

export interface IPropsMain {
    isMenu?: boolean;
    sidebar?: Sidebar;
    page?: ChatPage | ClientError | ServerError | Auth | Registration | Profile
}

export interface IChildrenMain {
    sidebar?: Sidebar;
    page?: ChatPage | ClientError | ServerError | Auth | Registration | Profile
}
