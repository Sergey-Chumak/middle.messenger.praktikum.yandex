import { v4 as makeUUID } from 'uuid';
import { tmpl } from './chat.tmpl';
import Block from '../../services/block';
import { Dialogues, IDialog, IMessage } from './dialogues';
import { IChatChildren, IChatProps } from './chat.types';
import { getUserData } from '../../services/server-data';
import { getDateNow, getTimeNow } from '../../utils/date';
import last from '../../utils/last';

export class Chat extends Block<IChatProps, IChatChildren> {
  dialogues: IDialog[] = [];
  currentMessage = '';

  constructor(props: IChatProps) {
    super('div', props);
    this.children.dialogues = new Dialogues({ dialogues: this.dialogues });
  }

  componentDidMount(): void {
    this.initChat();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      dialogues: this.props.dialogues,
      disabled: this.props.disabled,
      name: this.props.name,
      value: this.props.value,
    });
  }

  initFocusEventOnInput(): void {
    document.addEventListener('keydown', () => {
      (document.querySelector('#input-message') as HTMLElement).focus();
    });
  }

  initChat(): void {
    this.setProps({
      disabled: true,
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'send-message-btn' && this.currentMessage) {
            this.sendMessage();
          }
        },
        keydown: (event: KeyboardEvent) => {
          if ((event.target as HTMLElement).id === 'input-message') {
            if ((event.code === 'Enter' || event.code === 'NumpadEnter') && this.currentMessage) {
              this.sendMessage();
            }
          }
        },
        input: (event: Event) => {
          if ((event.target as HTMLInputElement).id === 'input-message') {
            this.currentMessage = (event.target as HTMLInputElement)?.value;
          }
        },
      },
    });

    setTimeout(() => {
      const user = getUserData().find((item) => item.id === last(document.location.href.split('/')));

      this.dialogues = user?.chat.reverse() as IDialog[];

      this.setProps({ disabled: false, name: user!.name });
      this.children.dialogues?.setProps({ dialogues: this.dialogues });
    }, 500);
  }

  sendMessage(): void {
    const id = makeUUID();
    const dialog = this.dialogues.find((item) => item.date === getDateNow());

    if (dialog) {
      dialog.messages.unshift({
        message: this.currentMessage,
        status: 'sending',
        time: getTimeNow(),
        from: 'me',
        id,
      });
    } else {
      this.dialogues.unshift({
        date: getDateNow(),
        messages: [{
          message: this.currentMessage,
          status: 'sending',
          time: getTimeNow(),
          from: 'me',
          id,
        }],
      });
    }
    this.children.dialogues.setProps({ dialogues: this.dialogues });

    this.currentMessage = '';
    this.setProps({ value: '' });
    (document.querySelector('#input-message') as HTMLElement)?.focus();

    this.messageDelivered(id);
  }

  messageDelivered(id: string) {
    setTimeout(() => {
      (this.dialogues[0].messages.find((item) => item.id === id) as IMessage).status = 'sent';
      this.children.dialogues.setProps({ dialogues: this.dialogues });
    }, 1000);
  }
}
