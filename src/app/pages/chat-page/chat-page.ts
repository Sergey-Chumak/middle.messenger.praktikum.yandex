import { tmpl } from './chat-page.tmpl';
import Block from '../../services/block';
import { IPropsAndChildren } from '../../services/types';
import { ChatList } from '../../components/chat-list';
import { Dialog } from '../../components/dialog';

export class ChatPage extends Block {
  constructor(props: IPropsAndChildren) {
    super('div', props);

    this.children.chatList = new ChatList({
      class: 'chat__chat-list',
    });

    this.children.plugDialog = new Dialog({});
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
