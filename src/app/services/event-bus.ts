export class EventBus {
  private readonly listeners: { [key: string]: (() => void)[] };

  constructor() {
    this.listeners = {};
  }

  attach(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args as []);
    });
  }

  detach(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]
      .filter((item: () => void) => item !== callback);
  }
}
