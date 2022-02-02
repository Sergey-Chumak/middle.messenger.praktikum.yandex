import View from '../../services/view/view';
import { modalTmpl } from './c-modal.tmpl';
import { IChildrenModal, IPropsModal } from './c-modal.types';
import { CButton } from '../c-button';

export class CModal extends View<IPropsModal, IChildrenModal> {
  constructor(props: IPropsModal) {
    super('div', props);
    this.hide();
  }

  componentDidMount(): void {
    this.initChildren();
    this.initEvents();
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
    return this.compile(modalTmpl);
  }

  initChildren(): void {
    this.children.confirm = new CButton({
      name: this.props.confirm,
      id: this.props.buttonId,
      size: 's',
    });

    this.children.cancel = new CButton({
      name: this.props.cancel,
      id: 'c-modal-cancel',
      size: 's',
    });
  }

  initEvents(): void {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'c-modal-cancel') this.close();
        },
      },
    });
  }

  open(): void {
    this.show();
  }

  close(): void {
    this.hide();
  }
}
