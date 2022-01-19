import Block from '../block/block';
import isEqual from '../../utils/isEqual';
import { render } from '../../utils/renderDOM';
import { IPropsRoute } from './router.types';
import { router } from './router';

export default class Route {
  private readonly component: any;
  private readonly path: string;

  private block: Block<unknown, unknown> | null;
  private props: IPropsRoute;

  constructor(path: string, component: Function, props: IPropsRoute) {
    this.path = path;
    this.component = component;
    this.block = null;
    this.props = props;
  }

  render(): void {
    if (!this.props.canActivate) {
      if (!this.block) {
        this.block = new this.component({});
        render(this.props.rootQuery, this.block as Block<unknown, unknown>);
        return;
      }

      this.block.show();
    } else {
      this.props.canActivate().then((data) => {
        if (data) {
          if (!this.block) {
            this.block = new this.component({});
            render(this.props.rootQuery, this.block as Block<unknown, unknown>);
            return;
          }

          this.block.show();
        } else if (this.props.redirectTo) router.go(this.props.redirectTo);
      });
    }
  }

  navigate(path: string): void {
    if (this.match(path)) {
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(path: string): boolean {
    if (this.props.withId) {
      return path.includes(this.path);
    }
    return isEqual(path, this.path);
  }
}
