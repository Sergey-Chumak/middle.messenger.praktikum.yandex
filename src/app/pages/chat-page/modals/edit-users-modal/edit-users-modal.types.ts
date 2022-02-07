import { IUserData } from '../../../../services/auth/auth.types';
import { CModal } from '../../../../components/c-modal';
import { AddUsersModal } from './add-users-modal';

export interface IPropsEditUsersModal {
    chatUsers?: IUserData[]
}

export interface IChildrenEditUsersModal {
    confirmModal: CModal;
    addUsersModal: AddUsersModal;
}
