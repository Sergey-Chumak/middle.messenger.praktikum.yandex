export class EventBus {
  private listeners: {};

  constructor() {
    this.listeners = {};
  }

  attach(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event) {
    this.listeners[event].forEach((listener) => {
      listener();
    });
  }

  // Можно называть detach, как больше нравится
  detach(event, callback) {
  }
}
