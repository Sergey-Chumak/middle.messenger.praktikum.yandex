import { getDateNow } from '../utils/date';
import last from '../utils/last';

const userData = [
  {
    id: '1',
    name: 'Vadim',
    status: 'passive',
    lastMessage: '',
    time: '',
    notifications: '12',
    chat: [
      {
        date: 'November 30',
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
        ].reverse(),
      },
      {
        date: getDateNow(),
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
        ].reverse(), // add sort later
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
      date: 'Jule 30',
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
      ].reverse(),
    }],
  },
  {
    id: '3',
    name: 'Dima',
    status: 'passive',
    lastMessage: '',
    time: '',
    chat: [].reverse(),
  },
  {
    id: '4',
    name: 'Peter',
    status: 'passive',
    lastMessage: '',
    time: '',
    chat: [{
      date: 'December 30',
      messages: [
        {
          id: '3',
          message: 'Hi!',
          time: '15:25',
          from: 'friend',
          status: 'sent',
        },
      ].reverse(),
    }],
  },
];

userData.forEach((user) => {
  const messages = last(user.chat)?.messages;
  const time = last(user.chat)?.date;

  if (messages) {
    messages[0].from === 'me'
      ? user.lastMessage = `Me: ${messages[0].message}`
      : user.lastMessage = messages[0].message;
    if (getDateNow() === time) {
      user.time = messages[0].time;
    } else {
      user.time = time;
    }
  }
});

export function getUserData() {
  return userData;
}
