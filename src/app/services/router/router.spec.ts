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

  describe('.start', () => {

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

  describe('.back', () => {
    it('should back to last pathname', () => {
      router.use('view-first', class {} as any);
      router.use('view-second', class {} as any);

      router.go('/view-first');
      router.go('/view-second');

      router.back();

      expect(document.location.pathname).to.eq('/view-first');
    });
  });

  describe('.forward', () => {
    it('should go to the next path', () => {
      router.start();
      router.go('/signin');
      router.go('/signup');

      router.back();
      router.forward();

      expect(document.location.pathname).to.eq('/signup ');
    });
  });
});
