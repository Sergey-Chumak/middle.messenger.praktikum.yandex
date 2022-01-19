import { EventBus } from '../services/event-bus';
import { Indexed, IState, EStoreEvents } from './store.types';

function set(state: any, path: string, value: Indexed): void {
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
  private state: IState = { };

  public getState(): IState {
    return this.state;
  }

  public removeState(): void {
    this.state = {};
    this.emit(EStoreEvents.Updated);
  }

  public set(path: string, value: Indexed): void {
    set(this.state, path, value);
    this.emit(EStoreEvents.Updated);
  }
}

export default new Store();
