import Block from '../../../../services/block';
import { tmpl } from './change-chat-avatar-modal.tmpl';
import { IChildrenChangeAvatarModal } from './change-chat-avatar-modal.types';
import { Button } from '../../../../components/ui/button';

export class ChangeChatAvatarModal extends Block<{}, IChildrenChangeAvatarModal> {
  constructor(props: {}) {
    super('div', props);
    this.hide();

    this.children.confirmBtn = new Button({
      name: 'Change',
      id: 'change-chat-avatar-modal-confirm',
      size: 's',
      color: 'primary',
    });

    this.children.cancelBtn = new Button({
      name: 'Cancel',
      id: 'change-chat-avatar-modal-cancel',
      size: 's',
      color: 'primary',
    });
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'change-chat-avatar-modal-cancel') {
            this.close();
          }
        },
      },
    });
  }

  render() {
    return this.compile(tmpl, {
      confirmBtn: this.children.confirmBtn,
      cancelBtn: this.children.cancelBtn,
    });
  }
  open() {
    this.show();
  }

  close() {
    this.hide();
    (document.getElementById('change-chat-avatar-modal-input') as HTMLInputElement).value = '';
  }
}
