import Block from '../../../../services/block/block';
import { tmplDialogues } from './dialogues.tmpl';
import { IDialoguesProps } from './dialogues.types';
import isEqual from '../../../../utils/isEqual';
import { webSocketApi } from '../../../../services/web-socket/web-socket';

export class Dialogues extends Block<IDialoguesProps, void> {
  constructor(props: IDialoguesProps) {
    super('div', props);
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event:Event) => {
          if ((event.target as HTMLElement).id === 'load-more-messages') {
            webSocketApi.loadMoreMessages();
          }
        },
      },
    });
  }

  componentDidUpdate(oldProps:IDialoguesProps, newProps:IDialoguesProps): boolean {
    setTimeout(() => {
      this.getContent().firstElementChild?.addEventListener('scroll', (event) => {
        const windowRelativeBottom = (event.target as HTMLElement).scrollHeight;
        if (windowRelativeBottom < (event.target as HTMLElement).scrollTop * -1 + 925) {
          document.getElementById('load-more-messages')?.classList.add('dialogues__more-messages_visible');
        } else {
          document.getElementById('load-more-messages')?.classList.remove('dialogues__more-messages_visible');
        }
      });
    });
    return !isEqual(newProps, oldProps);
  }

  render(): DocumentFragment {
    return this.compile(tmplDialogues, {
      dialogues: this.props.dialogues,
    });
  }
}
