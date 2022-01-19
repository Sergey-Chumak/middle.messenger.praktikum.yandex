import Block from '../../../../services/block/block';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { IChildrenNewChatModal } from './new-chat-modal.types';
import { tmpl } from './new-chat-modal.tmpl';

export class NewChatModal extends Block<{ }, IChildrenNewChatModal> {
  constructor(props: { }) {
    super('div', props);
    this.hide();

    this.children.confirmBtn = new Button({
      name: 'Create',
      id: 'create-chat-modal-confirm',
      size: 's',
      color: 'primary',
    });

    this.children.cancelBtn = new Button({
      name: 'Cancel',
      id: 'create-chat-modal-cancel',
      size: 's',
      color: 'primary',
    });

    this.children.input = new Input({
      id: 'create-chat-modal-input',
      type: 'text',
      labelName: 'Title chat',
      value: '',
      class: 'new-chat-modal__input',
    });
  }

  open() {
    this.show();
    document.getElementById('create-chat-modal-input')!.focus();
  }

  close() {
    this.hide();
    this.children.input.setProps({
      value: '',
    });
  }

  componentDidMount() {
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

  render(): DocumentFragment {
    return this.compile(tmpl, {
      confirm: this.children.confirmBtn,
      cancel: this.children.cancelBtn,
      input: this.children.input,
    });
  }
}
