import { IDialog, IMessage } from '../components/dialog/dialogues/message.types';

export function getMessages(): IDialog[] {
  const messages: IMessage[] = [
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
  ];

  const messages2: IMessage[] = [
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
  ];
  const chat: IDialog[] = [
    { date: 'Jule 19', messages: messages.reverse() },
    { date: 'September 24', messages: messages2.reverse() },
  ];
  return chat;
}
