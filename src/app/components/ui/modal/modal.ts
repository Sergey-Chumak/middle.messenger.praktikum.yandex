import Block from '../../../services/block';
import { tmpl } from './modal.tmpl';
import { IChildrenModal, IPropsModal } from './modal.types';
import { Button } from '../button';
import { Input } from '../input';

export class Modal extends Block<IPropsModal, IChildrenModal> {
  constructor(props: IPropsModal) {
    super('div', props);
    this.hide();

    this.children.confirm = new Button({
      name: this.props.confirm,
      id: this.props.buttonId,
      size: 's',
      color: 'primary',
    });

    this.children.cancel = new Button({
      name: this.props.cancel,
      id: 'modal-cancel',
      size: 's',
      color: 'primary',
    });

    this.children.input = new Input({
      id: '',
      type: 'text',
      labelName: 'Name',
      value: '',
      class: 'modal__input',
    });
  }

  open() {
    this.show();
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
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'modal-cancel') {
            this.close();
          }
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

    if (oldProps.inputId !== newProps.inputId) {
      this.children.input.setProps({ id: newProps.inputId });
    }

    if (newProps.isInput) {
      this.children.input.show();
    } else {
      this.children.input.hide();
    }
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      header: this.props.header,
      message: this.props.message,
      confirm: this.props.confirm,
      cancel: this.props.cancel,
      buttonId: this.props.confirmId,
      avatar: this.props.avatar,
      isInput: this.props.isInput,
      input: this.children.input,
    });
  }
}
