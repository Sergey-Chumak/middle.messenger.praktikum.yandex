import {
  describe, it, before, after,
} from 'mocha';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import HTTPTransport from './http-transport';

const express = require('express');
const cors = require('cors');

describe('Http transport', () => {
  let server: any;

  before(async () => {
    (global as any).XMLHttpRequest = new JSDOM().window.XMLHttpRequest;
    (global as any).FormData = new JSDOM().window.FormData;

    const app = express();
    app.use(cors());

    server = await app.listen(1234);

    app.get('', (_req: any, res: any) => res.json({ value: 'Success' }));
    app.post('', (_req: any, res: any) => res.json({ value: 'Success' }));
    app.put('', (_req: any, res: any) => res.json({ value: 'Success' }));
    app.delete('', (_req: any, res: any) => res.json({ value: 'Success' }));
  });

  after(() => {
    server.close();
  });

  describe('.get', () => {
    it('should be successful', async () => {
      const http = new HTTPTransport('http://localhost:1234', false);

      const result: {value: string} = await http.get('');

      expect(result.value).to.be.eq('Success');
    });
  });

  describe('.post', () => {
    it('should be successful', async () => {
      const http = new HTTPTransport('http://localhost:1234', false);

      const result: {value: string} = await http.post('');

      expect(result.value).to.be.eq('Success');
    });
  });

  describe('.put', () => {
    it('should be successful', async () => {
      const http = new HTTPTransport('http://localhost:1234', false);

      const result: {value: string} = await http.put('');

      expect(result.value).to.be.eq('Success');
    });
  });

  describe('.delete', () => {
    it('should be successful', async () => {
      const http = new HTTPTransport('http://localhost:1234', false);

      const result: {value: string} = await http.delete('');

      expect(result.value).to.be.eq('Success');
    });
  });
});
