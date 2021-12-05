import { tmpl } from './chat.tmpl';
import Block from '../../services/block';
import { Dialogues, IDialog } from './dialogues';
import { IChatChildren, IChatProps } from './chat.types';

export class Chat extends Block<IChatProps, IChatChildren> {
  dialogues: IDialog[] = this.props.dialogues || [];

  constructor(props: IChatProps) {
    super('div', props);
    this.children.dialogues = new Dialogues({ dialogues: this.dialogues });
  }

  componentDidMount() {
    this.setProps({ disabled: true });
  }

  componentDidUpdate(oldProps: IChatProps, newProps: IChatProps): boolean {
    this.children.dialogues?.setProps({ dialogues: newProps.dialogues });
    if (oldProps.dialogues !== newProps.dialogues) return false;
    return true;
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      dialogues: this.props.dialogues,
      disabled: this.props.disabled,
      name: this.props.name,
      value: this.props.value,
    });
  }
}
