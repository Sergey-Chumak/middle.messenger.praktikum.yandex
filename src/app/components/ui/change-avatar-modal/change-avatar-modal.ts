import Block from '../../../services/block/block';
import { tmpl } from './change-avatar-modal.tmpl';
import { IChildrenChangeAvatarModal, IPropsChangeAvatarModal } from './change-avatar-modal.types';
import { Button } from '../button';

export class ChangeAvatarModal extends Block<IPropsChangeAvatarModal, IChildrenChangeAvatarModal> {
  constructor(props: IPropsChangeAvatarModal) {
    super('div', props);
    this.hide();

    this.children.confirmBtn = new Button({
      name: 'Change',
      id: this.props.confirmBtnId,
      size: 's',
      color: 'primary',
    });

    this.children.cancelBtn = new Button({
      name: 'Cancel',
      id: 'change-avatar-modal-cancel',
      size: 's',
      color: 'primary',
    });
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'change-avatar-modal-cancel') {
            this.close();
          }
        },
      },
    });
  }

  render() {
    return this.compile(tmpl, {
      inputId: this.props.inputId,
      confirmBtn: this.children.confirmBtn,
      cancelBtn: this.children.cancelBtn,
      confirmBtnId: this.props.confirmBtnId,
    });
  }
  open() {
    this.show();
  }

  close() {
    this.hide();
    (document.getElementById(this.props.inputId) as HTMLInputElement).value = '';
  }
}
