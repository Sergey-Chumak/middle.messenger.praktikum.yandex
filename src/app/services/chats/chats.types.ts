export interface IChatCard {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        },
        time: string;
        content: string;
    }
    status?: 'active' | 'passive';
    initials?: string;
}

export interface ITitleChat {
    title: string;
}

export interface IAddUsersData {
    users: number[];
    chatId: number
}

export interface IUsersSearch {
    login: string;
}
