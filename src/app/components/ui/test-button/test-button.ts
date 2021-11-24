import Handlebars from 'handlebars/dist/handlebars';
import Block from '../../../services/block';
import { template } from './test-button.tmpl';
import { IProps } from '../../../services/types';

export class Button extends Block {
  constructor(props: IProps) {
    super('button', props);
  }

  render() {
    const { className, child } = this.props;
    return this.compile(template, { className, child });
  }
}
