import View from '../../../../services/view/view';
import { CButton } from '../../../../components/c-button';
import { IChildrenNewChatModal } from './new-chat-modal.types';
import { newChatModalTmpl } from './new-chat-modal.tmpl';

export class NewChatModal extends View<{ }, IChildrenNewChatModal> {
  constructor(props: { }) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.initChildren();
    this.initEvents();
  }

  render(): DocumentFragment {
    return this.compile(newChatModalTmpl);
  }

  initChildren(): void {
    this.children.confirmBtn = new CButton({
      name: 'Create',
      id: 'create-chat-modal-confirm',
      size: 's',
    });

    this.children.cancelBtn = new CButton({
      name: 'Cancel',
      id: 'create-chat-modal-cancel',
      size: 's',
    });
  }

  initEvents(): void {
    this.setProps({
      events: {
        keydown: (event: KeyboardEvent) => {
          if ((event.target as HTMLElement).id === 'create-chat-modal-input') {
            if ((event.code === 'Escape')) {
              this.close();
            }
          }
        },
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'create-chat-modal-cancel') {
            this.close();
          }
        },
      },
    });
  }

  open() {
    this.show();
    document.getElementById('create-chat-modal-input')!.focus();
  }

  close() {
    (document.getElementById('create-chat-modal-input') as HTMLInputElement).value = '';
    this.hide();
  }
}
