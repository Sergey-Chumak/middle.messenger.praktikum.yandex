import Block from '../../../services/block/block';
import { tmpl } from './modal.tmpl';
import { IChildrenModal, IPropsModal } from './modal.types';
import { CButton } from '../c-button';

export class Modal extends Block<IPropsModal, IChildrenModal> {
  constructor(props: IPropsModal) {
    super('div', props);
    this.hide();
    this.initChildren();
  }

  componentDidMount(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'modal-cancel') this.close();
        },
      },
    });
  }

  componentDidUpdate(oldProps: IPropsModal, newProps: IPropsModal): boolean {
    if (oldProps.confirm !== newProps.confirm) {
      this.children.confirm.setProps({ name: newProps.confirm });
    }

    if (oldProps.buttonId !== newProps.buttonId) {
      this.children.confirm.setProps({ id: newProps.buttonId });
    }

    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      target: this.props.target,
      message: this.props.message,
      confirm: this.props.confirm,
      cancel: this.props.cancel,
      buttonId: this.props.confirmId,
    });
  }

  initChildren(): void {
    this.children.confirm = new CButton({
      name: this.props.confirm,
      id: this.props.buttonId,
      size: 's',
      color: 'primary',
    });

    this.children.cancel = new CButton({
      name: this.props.cancel,
      id: 'modal-cancel',
      size: 's',
      color: 'primary',
    });
  }

  open(): void {
    this.show();
  }

  close(): void {
    this.hide();
  }
}
