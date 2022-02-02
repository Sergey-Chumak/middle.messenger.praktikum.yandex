// @ts-ignore
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import { EventBus } from '../event-bus';
import {
  EEventsBusEvents, TChildrenBlock, IMeta, TPropsAndChildren,
} from '../types';
import { IState } from '../../store/store.types';

export default class View<TProps, TChildren> {
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
    this.eventBus.emit(EEventsBusEvents.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.attach(EEventsBusEvents.INIT, this.init.bind(this));
    eventBus.attach(EEventsBusEvents.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.attach(EEventsBusEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.attach(EEventsBusEvents.FLOW_RENDER, this._render.bind(this));
  }

  private init() {
    this.element = this.createDocumentElement(this.meta?.tagName as string);
    this.eventBus.emit(EEventsBusEvents.FLOW_RENDER);
  }

  private createDocumentElement(tag: string): HTMLElement {
    const element = document.createElement(tag);
    if (this.props.settings?.withInternalID) element.setAttribute('data-id', this.id);
    return element;
  }

  private _render() {
    const block = this.render();
    this.removeEvents();
    this.element.innerHTML = '';
    this.element.appendChild(block as unknown as Node);
    this.addEvents();
  }

  render() {}

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
      if (value instanceof View) {
        // @ts-ignore
        children[key] = value;
      } else {
        // @ts-ignore
        props[key] = value;
      }
    });
    return { children, props };
  }

  protected compile(template: string, props: TPropsAndChildren<TProps> = this.props): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      // @ts-ignore
      propsAndStubs[key] = `<div data-id="${(child as View<TProps, unknown>).id}"></div>`;
    });
    const fragment = this.createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child: View<TProps, unknown>) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`) as Element;
      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child: View<TProps, unknown>) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus.emit(EEventsBusEvents.FLOW_CDM);
    if (Object.keys(this.children).length) {
      this.eventBus.emit(EEventsBusEvents.FLOW_RENDER);
    }
  }

  private _componentDidUpdate(oldProps: TPropsAndChildren<TProps>, newProps: TPropsAndChildren<TProps>) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this.eventBus.emit(EEventsBusEvents.FLOW_RENDER);
  }

  componentDidUpdate(_oldProps:TPropsAndChildren<TProps>, _newProps: TPropsAndChildren<TProps>): boolean {
    return true;
  }

  setProps = (
    nextProps: {
      [key in keyof TPropsAndChildren<TProps>]?: TPropsAndChildren<TProps>[keyof TPropsAndChildren<TProps>]
    } | IState,
  ) => {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  };

  private makePropsProxy(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: TPropsAndChildren<TProps>, prop: string, value) => {
        const oldValue = { ...target };
        // @ts-ignore
        target[prop] = value;
        this.eventBus.emit(EEventsBusEvents.FLOW_CDU, oldValue, target);
        return true;
      },
    });
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public hide() {
    this.getContent().style.display = 'none';
  }

  public getContent() {
    return this.element;
  }
}
