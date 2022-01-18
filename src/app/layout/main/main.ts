import { tmpl } from './main.tmpl';
import Block from '../../services/block/block';
import { chatsService } from '../../services/chats/chats.service';

export class Main extends Block<{}, {}> {
  constructor(props: {}) {
    super('div', props);
    chatsService.getChats().finally(() => {
      setInterval(() => {
        chatsService.getChats();
      }, 10000);
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {});
  }
}
