import { tmpl } from './main.tmpl';
import Block from '../../services/block';
import { IChildrenMain, IPropsMain } from './main.types';
import connect from '../../utils/hoc/connect';
import { Modal } from '../../components/ui/modal';
import trim from '../../utils/trim';
import { chatsService } from '../../services/chats/chats.service';
import store from '../../store/store';

class Main extends Block<IPropsMain, IChildrenMain> {
  chatName: string;
  interval;

  constructor(props: IPropsMain) {
    super('div', props);

    this.children.modal = new Modal({
      cancel: 'Cancel',
      message: '',
      confirm: 'Create',
      header: 'Create a new chat?',
      buttonId: 'create-chat-btn',
      isInput: true,
      inputId: 'new-chat-input',
    });

    chatsService.getChats().then(() => {
      setInterval(() => {
        chatsService.getChats();
      }, 10000);
    });
  }

  componentDidMount() {
  }

  // @ts-ignore
  componentDidUpdate(oldProps, newProps): boolean {
    this.children.modal.setProps({
      events: {
        input: (event:Event) => {
          const target = event.target as HTMLInputElement;
          if (target.id === 'new-chat-input') {
            if (!target.value) return;
            this.chatName = trim(target.value);
          }
        },
      },
    });

    if (oldProps.events !== newProps.events) return true;
    return false;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      isMenu: this.props.isMenu,
      phone: this.props.phone,
      avatar: this.props.avatar,
      name: this.props.name,
      modal: this.children.modal,
    });
  }
}

export const MainWrap = connect<IPropsMain, IChildrenMain>((state) => ({
  name: state?.user?.display_name || state?.user?.first_name as string,
  avatar: state?.user?.avatar as string,
  phone: state?.user?.phone as string,
}))(Main as typeof Block);
