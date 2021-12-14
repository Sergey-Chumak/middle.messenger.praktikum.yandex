import Block from '../../../services/block';
import { tmplDialogues } from './dialogues.tmpl';
import { IDialoguesProps } from './dialogues.types';

export class Dialogues extends Block<IDialoguesProps, void> {
  constructor(props: IDialoguesProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tmplDialogues, {
      dialogues: this.props.dialogues,
    });
  }
}
