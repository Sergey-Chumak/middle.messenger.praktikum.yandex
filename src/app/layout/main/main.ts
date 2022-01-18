import { tmpl } from './main.tmpl';
import Block from '../../services/block/block';
import { chatsService } from '../../services/chats/chats.service';
import connect from '../../utils/hoc/connect';

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

export const MainWrap = connect<{}, {}>(() => ({
}))(Main as typeof Block);
