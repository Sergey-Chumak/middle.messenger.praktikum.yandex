import { mainTmpl } from './main.tmpl';
import View from '../../services/view/view';
import { chatsService } from '../../services/chats/chats.service';
import connect from '../../utils/hoc/connect';

export class Main extends View<{}, {}> {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    this.initUpdateChats();
  }

  render(): DocumentFragment {
    return this.compile(mainTmpl);
  }

  initUpdateChats(): void {
    chatsService.getChats()
      .catch((e) => {
        console.log(e.error);
      })
      .finally(() => {
        setInterval(() => {
          chatsService.getChats()
            .catch((e) => {
              console.log(e.error);
            });
        }, 10000);
      });
  }
}

export const MainWrap = connect<{}, {}>(() => ({
}))(Main as typeof View);
