import { EventBus } from '../services/event-bus';
import { IState, StoreEvents } from './store.types';

function set(state: any, path: string, value: IState | null): void {
  const keys = path.split('.');
  keys.reduce((acc, key, index) => {
    if (index < keys.length - 1) {
      acc[key] = acc[key] || {};
    } else {
      acc[key] = value;
    }
    return acc[key];
  }, state);
}

class Store extends EventBus {
  private state: IState = {};

  public getState(): IState {
    return this.state;
  }

  public removeState(): void {
    this.state = {};
    this.emit(StoreEvents.Updated);
  }

  public set(path: string, value: IState | null): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
