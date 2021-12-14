// @ts-ignore
import { v4 as makeUUID } from 'uuid';
import * as Handlebars from 'handlebars';
import { EventBus } from './event-bus';
import {
  EventsBusEvents, TChildrenBlock, IMeta, TPropsAndChildren,
} from './types';

export default abstract class Block<TProps, TChildren> {
  abstract render (): DocumentFragment;

  protected props: TPropsAndChildren<TProps>;
  protected children: TChildrenBlock<TChildren>;

  private readonly id: string;
  private element: HTMLElement;
  private meta: IMeta | null = null;
  private eventBus: EventBus = new EventBus();

  protected constructor(tagName: string, propsAndChildren: TPropsAndChildren<TProps>) {
    const { children, props } = this.getChildren(propsAndChildren);
    this.id = makeUUID();
    this.children = children;
    this.props = this.makePropsProxy({ ...props, __id: this.id });
    this.meta = {
      tagName,
      props,
    };
    this.registerEvents(this.eventBus);
    this.eventBus.emit(EventsBusEvents.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.attach(EventsBusEvents.INIT, this.init.bind(this));
    eventBus.attach(EventsBusEvents.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.attach(EventsBusEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.attach(EventsBusEvents.FLOW_RENDER, this._render.bind(this));
  }

  private init() {
    this.element = this.createDocumentElement(this.meta?.tagName as string);
    this.eventBus.emit(EventsBusEvents.FLOW_RENDER);
  }

  private createDocumentElement(tag: string): HTMLElement {
    const element = document.createElement(tag);
    if (this.props.settings?.withInternalID) element.setAttribute('data-id', this.id);
    return element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this.element.innerHTML = '';
    this.element.appendChild(block);
    this.addEvents();
  }

  private addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.element.addEventListener(eventName, events[eventName]);
    });
  }

  private removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.element.removeEventListener(eventName, events[eventName]);
    });
  }

  private getChildren(propsAndChildren: TPropsAndChildren<TProps>) {
    const children = {} as TChildrenBlock<TChildren>;
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  protected compile(template: string, props: TPropsAndChildren<TProps>): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${(child as Block<TProps, unknown>).id}"></div>`;
    });

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child: Block<TProps, unknown>) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`) as Element;
      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child: Block<TProps, unknown>) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus.emit(EventsBusEvents.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this.eventBus.emit(EventsBusEvents.FLOW_RENDER);
  }

  componentDidUpdate(oldProps:TProps, newProps: TProps): boolean {
    return true;
  }

  setProps = (
    nextProps: {
      [key in keyof TPropsAndChildren<TProps>]?: TPropsAndChildren<TProps>[keyof TPropsAndChildren<TProps>]
    },
  ) => {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  };

  private makePropsProxy(props) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: TPropsAndChildren<TProps>, prop: string, value) => {
        const oldValue = { ...target };
        target[prop] = value;
        this.eventBus.emit(EventsBusEvents.FLOW_CDU, oldValue, target);
        return true;
      },
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  getContent() {
    return this.element;
  }
}
