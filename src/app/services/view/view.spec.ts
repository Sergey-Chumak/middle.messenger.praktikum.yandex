import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import View from './view';

class Component extends View<{id: string}, void> {
  constructor(props: {id: string}) {
    super('div', props);
  }

  render() {
    return this.compile('<div id="{{ id }}"></div>', {
      id: this.props.id,
    });
  }
}

describe('View', () => {
  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><head></head><body><div id="app"></div></body>', {
      url: 'http://localhost:3000',
    });

    (global as any).document = dom.window.document;
    (global as any).window = dom.window;
  });

  it('should be a wrapper element', () => {
    const component = new Component({ id: 'test-id' });

    expect(component.getContent().tagName).to.eq('DIV');
  });

  it('should be passed props', () => {
    const component = new Component({ id: 'test-id' });

    expect(component.getContent().firstElementChild!.id).to.eq('test-id');
  });

  describe('.setProps', () => {
    it('should be change props', () => {
      const component = new Component({
        id: 'test-id',
      });

      component.setProps({
        id: 'change-test-id',
      });

      expect(component.getContent().firstElementChild!.id).to.eq('change-test-id');
    });
  });

  describe('.show', () => {
    it('should be visible', () => {
      const component = new Component({
        id: 'test-id',
      });

      component.hide();
      component.show();

      expect(component.getContent().style.display).to.eq('block');
    });
  });

  describe('.hide', () => {
    it('should be hidden', () => {
      const component = new Component({
        id: 'test-id',
      });

      component.hide();

      expect(component.getContent().style.display).to.eq('none');
    });
  });
});
