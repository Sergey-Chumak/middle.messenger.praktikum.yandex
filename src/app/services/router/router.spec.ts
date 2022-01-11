import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Router from './router';

const router = new Router('#main');

describe('Router', () => {
  beforeEach(() => {
    (global as any).window = {};
  });

  it('should be singletone', () => {
    // const router = new Router('');
    //
    // expect(new Router('')).to.eq(router);
  });

  describe('.use', () => {
    it('should return Router instance', () => {
      // const router = new Router('#main');
      //
      // const result = router.use('/', class {} as any);
      //
      // expect(result).to.eq(router);
    });
  });

  describe('.start', () => {

  });

  describe('.go', () => {

  });

  describe('.back', () => {

  });

  describe('.forward', () => {

  });
});
