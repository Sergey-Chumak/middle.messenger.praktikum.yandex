import Block from '../block';
import isEqual from '../../utils/isEqual';
import { render } from '../../utils/renderDOM';

export default class Route {
  private readonly blockClass: any;
  private readonly pathname: string;

  private block: Block<unknown, unknown> | null;
  private props: any;

  constructor(pathname: string, view: any, props: any) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  render(): void {
    if (!this.block) {
      this.block = new this.blockClass({});
      render(this.props.rootQuery, this.block as Block<unknown, unknown>);
      return;
    }

    this.block.show();
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this.pathname);
  }
}
