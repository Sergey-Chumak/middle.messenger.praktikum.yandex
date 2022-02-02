import View from '../../../../services/view/view';
import { dialoguesTmpl } from './dialogues.tmpl';
import { IDialoguesProps } from './dialogues.types';
import isEqual from '../../../../utils/isEqual';
import { webSocketApi } from '../../../../services/web-socket/web-socket';

export class Dialogues extends View<IDialoguesProps, void> {
  loadingMessages = false;

  constructor(props: IDialoguesProps) {
    super('div', props);
  }

  componentDidUpdate(oldProps:IDialoguesProps, newProps:IDialoguesProps): boolean {
    this.loadMessagesHandler();
    return !isEqual(newProps, oldProps);
  }

  render(): DocumentFragment {
    return this.compile(dialoguesTmpl);
  }

  loadMessagesHandler(): void {
    setTimeout(() => {
      this.getContent().firstElementChild?.addEventListener('scroll', (event) => {
        if (this.loadingMessages) return;

        const windowRelativeBottom = (event.target as HTMLElement).scrollHeight;
        if (windowRelativeBottom < (event.target as HTMLElement).scrollTop * -1 + 825) {
          this.loadingMessages = true;

          webSocketApi.loadMoreMessages();

          setTimeout(() => {
            this.loadingMessages = false;
          }, 500);
        }
      });
    });
  }
}
