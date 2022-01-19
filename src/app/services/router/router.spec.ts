import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { JSDOM } from 'jsdom';
import { router } from './router';
import Block from '../block/block';

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
      class MyBlock extends Block<{}, void> {
        constructor(props: {}) {
          super('div', props);
        }

        render() {
          return this.compile('<div id="test-id"></div>', {});
        }
      }

      router.use('/my-block', MyBlock);

      router.go('/my-block');
    });

    it('should render new block', () => {
      expect(document.getElementById('test-id')).not.to.be.undefined;
    });

    it('should change location pathname', () => {
      expect(document.location.pathname).to.eq('/');
    });
  });

  describe('.back', () => {
    it('should back to last pathname', () => {
      router.use('block-first', class {} as any);
      router.use('block-second', class {} as any);

      router.go('/block-first');
      router.go('/block-second');

      router.back();

      expect(document.location.pathname).to.eq('/block-first');
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
