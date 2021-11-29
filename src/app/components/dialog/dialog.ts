import { tmpl } from './dialog.tmpl';
import Block from '../../services/block';
import { Message } from './message';
import { IDialogContext } from './dialog.types';
import { getMessages } from '../../services/server-data';
import { IMessage } from './message/message.types';

export class Dialog extends Block<IDialogContext> {
  currentMessages: IMessage[] = [];
  currentMessage: string = '';

  constructor(props: IDialogContext) {
    super('div', props);

    this.children.messages = new Message({
      messages: this.currentMessages,
    });
  }

  getTimeNow() {
    const date: Date = new Date(Date.now());
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    return `${hours}:${minutes}`;
  }

  componentDidMount() {
    document.addEventListener('keydown', () => {
      document.querySelector('#input-message').focus();
    });
    this.children.messages.setProps({
      messages: this.currentMessages,
    });

    this.setProps({
      events: {
        click: (event: Event) => {
          if (event.target.id === 'send-message-btn' && this.currentMessage) {
            this.currentMessages.push({
              message: this.currentMessage,
              status: 'sent',
              time: this.getTimeNow(),
              from: 'me',
            });

            this.children.messages.setProps({
              messages: this.currentMessages,
            });

            this.currentMessage = '';
            this.setProps({
              value: this.currentMessage,
            });

            document.querySelector('.messages-wrapper').lastElementChild.scrollIntoView();
          }
        },
        keydown: (event:Event) => {
          document.querySelector('#input-message').focus();
          if (event.target.id === 'input-message') {
            if (event.keyCode === 13 && this.currentMessage) {
              this.currentMessages.push({
                message: this.currentMessage,
                status: 'sent',
                time: this.getTimeNow(),
                from: 'me',
              });

              this.children.messages.setProps({
                messages: this.currentMessages,
              });

              this.currentMessage = '';
              this.setProps({
                value: this.currentMessage,
              });

              document.querySelector('.messages-wrapper').lastElementChild.scrollIntoView();
              document.querySelector('#input-message').focus();
            }
          }
        },
        input: (event) => {
          if (event.target.id === 'input-message') {
            this.currentMessage = event.target.value;
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      messages: this.props.messages,
      name: this.props.name,
      value: this.props.value,
    });
  }
}
