import { tmpl } from './chat-page.tmpl';
import Block from '../../services/block';
import { TPropsAndChildren } from '../../services/types';
import { ChatList } from '../../components/chat-list';
import { Chat } from '../../components/dialog';

export class ChatPage extends Block {
  constructor(props: TPropsAndChildren) {
    super('div', props);

    this.children.chatList = new ChatList({
      class: 'chat-page__chat-list',
    });

    this.children.plugDialog = new Chat({});
  }

  componentDidMount() {
    this.children.plugDialog.setProps({
      test: 'test',
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      chatList: this.children.chatList,
      plugDialog: this.children.plugDialog,
    });
  }
}
