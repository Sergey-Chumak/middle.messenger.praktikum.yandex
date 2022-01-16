import { IUserData } from '../../../../services/auth/auth.types';
import { Modal } from '../../../../components/ui/modal';
import { AddUsersModal } from './add-users-modal';

export interface IPropsEditUsersModal {
    chatUsers?: IUserData[]
}

export interface IChildrenEditUsersModal {
    confirmModal: Modal;
    addUsersModal: AddUsersModal;
}
