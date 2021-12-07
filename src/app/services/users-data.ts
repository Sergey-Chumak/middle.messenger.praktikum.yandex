import { getDateCustomFormat } from '../utils/date';

const usersData: IUsersData[] = [
  {
    id: '1',
    name: 'Vadim',
    status: 'passive',
    lastMessage: '',
    time: '',
    notifications: '12',
    chat: [
      {
        date: '2021-07-26T13:51:50.417Z',
        messages: [
          {
            id: '1',
            message: 'Hi! How are you?',
            time: '18:37',
            from: 'me',
            status: 'sent',
          },
          {
            id: '2',
            message: 'Good, thanks. You look great! It’s been ages since I last saw you.',
            time: '19:24',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: `${new Date(Date.now())}`,
        messages: [
          {
            id: '3',
            message: 'Three years exactly.',
            time: '20:25',
            from: 'me',
            status: 'sent',
          },
          {
            id: '4',
            message: 'Right.',
            time: '20:26',
            from: 'me',
            status: 'sent',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Maria',
    status: 'passive',
    lastMessage: '',
    time: '',
    notifications: '8',
    chat: [{
      date: '2021-08-30T13:51:50.417Z',
      messages: [
        {
          id: '1',
          message: 'Hi! How’re you?',
          time: '13:00',
          from: 'friend',
          status: 'sent',
        },
        {
          id: '2',
          message: 'I’m good, thanks. Yourself?',
          time: '14:00',
          from: 'me',
          status: 'sent',
        },
        {
          id: '3',
          message: 'I’m also good. Thank you.',
          time: '15:25',
          from: 'friend',
          status: 'sent',
        },
      ],
    }],
  },
  {
    id: '3',
    name: 'Dima',
    status: 'passive',
    lastMessage: '',
    time: '',
    chat: [],
  },
  {
    id: '4',
    name: 'Peter',
    status: 'passive',
    lastMessage: '',
    time: '',
    chat: [
      {
        date: '2021-01-26T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-02-28T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-03-26T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-04-14T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-05-26T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-06-01T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-07-26T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-08-26T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-09-26T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
      {
        date: '2021-10-26T13:51:50.417Z',
        messages: [
          {
            id: '3',
            message: 'Hi!',
            time: '15:25',
            from: 'friend',
            status: 'sent',
          },
        ],
      },
    ],
  },
];

usersData.forEach((user) => {
  user.chat.sort((item, item2) => {
    if (item.date > item2.date) return -1;
    if (item.date < item2.date) return 1;
    return 0;
  });

  user.chat.forEach((dialog) => {
    dialog.messages.sort((item, item2) => {
      if (item.time > item2.time) return -1;
      if (item.time < item2.time) return 1;
      return 0;
    });
  });
});

export function updateUsersData(usersData: IUsersData[]) {
  usersData.forEach((user) => {
    user.chat.forEach((item) => item.date = getDateCustomFormat(new Date(Date.parse(item.date as string))));
    const messages = user.chat[0]?.messages;
    const time = user.chat[0]?.date;

    if (messages) {
      messages[0].from === 'me'
        ? user.lastMessage = `Me: ${messages[0].message}`
        : user.lastMessage = messages[0].message;
      if (getDateCustomFormat() === time) {
        user.time = messages[0].time;
      } else {
        user.time = time as string;
      }
    }
  });
}

updateUsersData(usersData);

export function getUsersData() {
  return usersData;
}

const userProfile = {
  email: 'test@test.ru',
  login: 'Login42',
  name: 'Sergey',
  lastName: 'Chumak',
  nickname: 'Test21',
  phone: '+79526985744',
  password: '123123A',
};

export function getUserProfile(): IUserProfile {
  return userProfile;
}

export interface IUserProfile {
  email: string,
  login: string,
  name: string,
  lastName: string,
  nickname: string,
  phone: string,
  password: string,
}

export interface IUsersData {
  id: string;
  name: string,
  status: string,
  lastMessage: string,
  time: string,
  notifications?: string,
  chat: {
    date: string | Date,
    messages: {
      id: string;
      message: string;
      time: string;
      from: string;
      status: string;
    }[]
  }[]
}
