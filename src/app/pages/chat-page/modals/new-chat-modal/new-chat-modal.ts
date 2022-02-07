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

  open() {
    this.show();
    document.getElementById('create-chat-modal-input')!.focus();
  }

  close() {
    (document.getElementById('create-chat-modal-input') as HTMLInputElement).value = '';
    this.hide();
  }
}
