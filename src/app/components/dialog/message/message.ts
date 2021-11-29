import Block from '../../../services/block';
import { tmpl } from './message.tmpl';
import { IMessagesContext } from './message.types';

export class Message extends Block<IMessagesContext> {
  constructor(props: IMessagesContext) {
    super('div', props);
  }

  componentDidMount() {
    (document.querySelector('.messages-wrapper') as HTMLElement)?.lastElementChild?.scrollIntoView();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      messages: this.props.messages,
    });
  }
}
