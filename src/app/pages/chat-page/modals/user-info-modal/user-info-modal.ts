import View from '../../../../services/view/view';
import { IUserInfoModalProps } from './user-info-modal.types';
import { userInfoModalTmpl } from './user-info-modal.tmpl';

export class UserInfoModal extends View<IUserInfoModalProps, void> {
  constructor(props: IUserInfoModalProps) {
    super('div', props);
    this.hide();
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'user-info-modal-close') {
            this.close();
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(userInfoModalTmpl);
  }

  open(): void {
    this.show();
  }

  close(): void {
    this.hide();
  }
}
