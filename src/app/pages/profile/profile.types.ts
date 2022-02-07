import { IUserData } from '../../services/auth/auth.types';
import { CAvatarModal } from '../../components/c-avatar-modal';
import { ChangeDataModal } from './change-data-modal';
import { ChangePasswordModal } from './change-password-modal';

export interface IPropsProfile {
    userData?: IUserData;
}

export interface IChildrenProfile {
    changeAvatarModal: CAvatarModal;
    changeDataModal: ChangeDataModal;
    changePasswordModal: ChangePasswordModal;
}
