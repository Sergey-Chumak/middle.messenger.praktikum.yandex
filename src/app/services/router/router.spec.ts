import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Router from './router';

describe('Router', () => {
  beforeEach(() => {
    (global as any).window = {};
  });

  it('should be singletone', () => {
    // const router = new Router('');

    console.log(Router);
    expect(2).to.eq(2);
  });

  describe('.use', () => {
    it('should return Router instance', () => {
      // const router = new Router('#main');
      //
      // const result = router.use('/', class {} as any);
      //
      expect('a').to.eq('a');
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
