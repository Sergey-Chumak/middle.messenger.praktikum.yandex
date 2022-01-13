import Block from '../../../../services/block';
import { tmplDialogues } from './dialogues.tmpl';
import { IDialoguesProps } from './dialogues.types';
import isEqual from '../../../../utils/isEqual';

export class Dialogues extends Block<IDialoguesProps, void> {
  constructor(props: IDialoguesProps) {
    super('div', props);
  }

  componentDidUpdate(oldProps:IDialoguesProps, newProps:IDialoguesProps): boolean {
    return !isEqual(newProps, oldProps);
  }

  render(): DocumentFragment {
    return this.compile(tmplDialogues, {
      dialogues: this.props.dialogues,
    });
  }
}
