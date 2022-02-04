import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { JSDOM } from 'jsdom';
import { router } from './router';
import View from '../view/view';

describe('Router', () => {
  describe('.use', () => {
    beforeEach(() => {
      const dom = new JSDOM('<!DOCTYPE html><head></head><body><div id="app"></div></body>', {
        url: 'http://localhost:3000',
      });

      (global as any).document = dom.window.document;
      (global as any).window = dom.window;

      (global as any).window = {
        history: {
          pushState() {},
          back() {},
          forward() {},
        },
      };
    });

    it('should return Router instance', () => {
      const result = router.use('/test', class {} as any);

      expect(result).to.eq(router);
    });
  });

  describe('.go', () => {
    beforeEach(() => {
      class MyBlock extends View<{}, void> {
        constructor(props: {}) {
          super('div', props);
        }

        render() {
          return this.compile('<div id="test-id"></div>', {});
        }
      }

      router.use('/my-view', MyBlock);

      router.go('/my-view');
    });

    it('should render new view', () => {
      expect(document.getElementById('test-id')).not.to.be.undefined;
    });

    it('should change location pathname', () => {
      expect(document.location.pathname).to.eq('/');
    });
  });
});
